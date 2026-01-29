/**
 * Stripe Service Module
 * 
 * Handles checkout session creation and payment processing.
 */

import Stripe from "stripe";
import { ENV } from "../_core/env";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export interface CreateCheckoutSessionParams {
  bookingId: number;
  customerEmail: string;
  customerName: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  totalAmountCents: number;
  depositCents: number;
  origin: string;
}

/**
 * Create a Stripe Checkout Session for a rental booking
 */
export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<{ url: string; sessionId: string }> {
  const {
    bookingId,
    customerEmail,
    customerName,
    vehicleModel,
    startDate,
    endDate,
    totalAmountCents,
    depositCents,
    origin,
  } = params;

  // Create line items for the rental
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: `${vehicleModel} Rental`,
          description: `Rental period: ${startDate} to ${endDate}`,
        },
        unit_amount: totalAmountCents - depositCents,
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Security Deposit",
          description: "Refundable security deposit - returned after rental",
        },
        unit_amount: depositCents,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
    cancel_url: `${origin}/book?cancelled=true`,
    customer_email: customerEmail,
    client_reference_id: bookingId.toString(),
    metadata: {
      booking_id: bookingId.toString(),
      customer_email: customerEmail,
      customer_name: customerName,
      vehicle_model: vehicleModel,
      start_date: startDate,
      end_date: endDate,
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session URL");
  }

  return {
    url: session.url,
    sessionId: session.id,
  };
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId);
}

/**
 * Verify webhook signature and construct event
 */
export function constructWebhookEvent(
  payload: Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export { stripe };
