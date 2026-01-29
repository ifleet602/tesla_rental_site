/**
 * Stripe Products Configuration
 * 
 * Defines rental products and pricing for Tesla vehicles.
 * Prices are in cents (USD).
 */

export interface RentalProduct {
  id: string;
  name: string;
  description: string;
  dailyPriceCents: number;
  weeklyPriceCents: number;
  depositCents: number;
  vehicleModel: string;
}

export const RENTAL_PRODUCTS: Record<string, RentalProduct> = {
  model_3: {
    id: "model_3",
    name: "Tesla Model 3 Rental",
    description: "Premium Tesla Model 3 rental - Long Range AWD",
    dailyPriceCents: 14900, // $149/day
    weeklyPriceCents: 89900, // $899/week
    depositCents: 25000, // $250 security deposit
    vehicleModel: "Model 3",
  },
  model_y: {
    id: "model_y",
    name: "Tesla Model Y Rental",
    description: "Premium Tesla Model Y rental - Long Range AWD",
    dailyPriceCents: 17900, // $179/day
    weeklyPriceCents: 109900, // $1,099/week
    depositCents: 25000, // $250 security deposit
    vehicleModel: "Model Y",
  },
};

/**
 * Calculate total rental price based on dates and vehicle
 */
export function calculateRentalPrice(
  productId: string,
  startDate: Date,
  endDate: Date
): { subtotalCents: number; depositCents: number; totalCents: number; days: number } {
  const product = RENTAL_PRODUCTS[productId];
  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay);
  
  if (days < 1) {
    throw new Error("Rental must be at least 1 day");
  }

  // Calculate based on weekly vs daily rates
  const weeks = Math.floor(days / 7);
  const extraDays = days % 7;
  
  const subtotalCents = (weeks * product.weeklyPriceCents) + (extraDays * product.dailyPriceCents);
  const depositCents = product.depositCents;
  const totalCents = subtotalCents + depositCents;

  return { subtotalCents, depositCents, totalCents, days };
}

/**
 * Format cents to USD string
 */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
