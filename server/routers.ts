import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getVehicles, getVehicleById, getBookings, createBooking, getTerritories, getTerritoryById, createFranchiseApplication, getBookedDates, getBookingById, updateBookingPayment, checkVehicleAvailability } from "./db";
import { createCheckoutSession, getCheckoutSession } from "./stripe/stripe";
import { sendBookingNotificationToOwner, sendFranchiseApplicationNotification } from "./email/email";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Vehicle routes
  vehicles: router({
    list: publicProcedure.query(async () => {
      return await getVehicles();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getVehicleById(input.id);
      }),
  }),

  // Booking routes
  bookings: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getBookings(ctx.user.id);
    }),
    
    getBookedDates: publicProcedure
      .input(z.object({ vehicleId: z.number() }))
      .query(async ({ input }) => {
        return await getBookedDates(input.vehicleId);
      }),
    
    create: publicProcedure
      .input(z.object({
        vehicleId: z.number(),
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(10),
        startDate: z.string(),
        endDate: z.string(),
        totalPrice: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await createBooking({
          ...input,
          userId: ctx.user?.id,
        });
        
        // Get vehicle details for notification
        const vehicle = await getVehicleById(input.vehicleId);
        
        // Send notification to owner (async, don't block)
        sendBookingNotificationToOwner({
          bookingId: result.id,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          vehicleModel: vehicle?.model || "Tesla",
          startDate: input.startDate,
          endDate: input.endDate,
          totalPrice: input.totalPrice,
        }).catch(err => console.error("Failed to send booking notification:", err));
        
        return result;
      }),
    
    checkAvailability: publicProcedure
      .input(z.object({
        vehicleId: z.number(),
        startDate: z.string(),
        endDate: z.string(),
      }))
      .query(async ({ input }) => {
        const isAvailable = await checkVehicleAvailability(
          input.vehicleId,
          new Date(input.startDate),
          new Date(input.endDate)
        );
        return { available: isAvailable };
      }),
    
    createCheckout: publicProcedure
      .input(z.object({
        bookingId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const booking = await getBookingById(input.bookingId);
        if (!booking) {
          throw new Error("Booking not found");
        }
        
        const vehicle = await getVehicleById(booking.vehicleId);
        if (!vehicle) {
          throw new Error("Vehicle not found");
        }
        
        const origin = ctx.req.headers.origin || "http://localhost:3000";
        
        const { url, sessionId } = await createCheckoutSession({
          bookingId: booking.id,
          customerEmail: booking.customerEmail,
          customerName: booking.customerName,
          vehicleModel: vehicle.model,
          startDate: booking.startDate.toISOString().split('T')[0],
          endDate: booking.endDate.toISOString().split('T')[0],
          totalAmountCents: Math.round(parseFloat(booking.totalPrice) * 100),
          depositCents: 25000, // $250 security deposit
          origin,
        });
        
        // Update booking with checkout session ID
        await updateBookingPayment(booking.id, {
          stripeCheckoutSessionId: sessionId,
          paymentStatus: "pending",
        });
        
        return { checkoutUrl: url, sessionId };
      }),
    
    getPaymentStatus: publicProcedure
      .input(z.object({ bookingId: z.number() }))
      .query(async ({ input }) => {
        const booking = await getBookingById(input.bookingId);
        if (!booking) {
          return { status: "not_found" };
        }
        return {
          status: booking.paymentStatus,
          bookingStatus: booking.status,
        };
      }),
  }),

  // Territory routes
  territories: router({
    list: publicProcedure.query(async () => {
      return await getTerritories();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getTerritoryById(input.id);
      }),
  }),

  // Franchise application routes
  franchise: router({
    submit: publicProcedure
      .input(z.object({
        territoryId: z.number().optional(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        city: z.string().optional(),
        state: z.string().optional(),
        investmentCapital: z.string().optional(),
        businessExperience: z.string().optional(),
        whyInterested: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createFranchiseApplication(input);
        
        // Send notification to owner (async, don't block)
        sendFranchiseApplicationNotification({
          applicationId: result.id,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          city: input.city,
          state: input.state,
          investmentCapital: input.investmentCapital,
          businessExperience: input.businessExperience,
          whyInterested: input.whyInterested,
        }).catch(err => console.error("Failed to send franchise notification:", err));
        
        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
