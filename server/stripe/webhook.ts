/**
 * Stripe Webhook Handler
 * 
 * Handles incoming Stripe webhook events for payment processing.
 */

import { Router, raw } from "express";
import { constructWebhookEvent, getCheckoutSession } from "./stripe";
import { updateBookingPayment, getBookingById, getVehicleById } from "../db";
import { sendPaymentConfirmationToOwner } from "../email/email";

const webhookRouter = Router();

// IMPORTANT: Use raw body parser for webhook signature verification
webhookRouter.post(
  "/api/stripe/webhook",
  raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    
    if (!signature || typeof signature !== "string") {
      console.error("[Webhook] Missing stripe-signature header");
      return res.status(400).json({ error: "Missing signature" });
    }

    let event;
    try {
      event = constructWebhookEvent(req.body, signature);
    } catch (err) {
      console.error("[Webhook] Signature verification failed:", err);
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Handle test events for webhook verification
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const bookingId = session.client_reference_id
            ? parseInt(session.client_reference_id, 10)
            : null;

          if (bookingId) {
            // Update booking payment status
            await updateBookingPayment(bookingId, {
              stripePaymentIntentId: session.payment_intent as string,
              paymentStatus: "paid",
              status: "confirmed",
            });

            // Fetch booking details for notification
            const booking = await getBookingById(bookingId);
            if (booking) {
              // Get vehicle details
              const vehicle = await getVehicleById(booking.vehicleId);
              
              // Send payment confirmation to owner
              await sendPaymentConfirmationToOwner({
                bookingId: bookingId,
                customerName: booking.customerName,
                customerEmail: booking.customerEmail,
                customerPhone: booking.customerPhone,
                vehicleModel: vehicle?.model || "Tesla",
                startDate: booking.startDate.toISOString().split('T')[0],
                endDate: booking.endDate.toISOString().split('T')[0],
                totalPrice: booking.totalPrice,
              });
            }

            console.log(`[Webhook] Booking ${bookingId} confirmed with payment`);
          }
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          console.log(`[Webhook] Payment succeeded: ${paymentIntent.id}`);
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object;
          console.log(`[Webhook] Payment failed: ${paymentIntent.id}`);
          // Could update booking status to reflect failed payment
          break;
        }

        default:
          console.log(`[Webhook] Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("[Webhook] Error processing event:", err);
      res.status(500).json({ error: "Webhook handler failed" });
    }
  }
);

export { webhookRouter };
