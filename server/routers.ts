import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getVehicles, getVehicleById, getBookings, createBooking, getTerritories, getTerritoryById, createFranchiseApplication, getBookedDates } from "./db";

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
        return await createBooking({
          ...input,
          userId: ctx.user?.id,
        });
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
        return await createFranchiseApplication(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
