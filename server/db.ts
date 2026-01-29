import { eq, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  vehicles, Vehicle, InsertVehicle,
  bookings, Booking, InsertBooking,
  territories, Territory, InsertTerritory,
  franchiseApplications, FranchiseApplication, InsertFranchiseApplication
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER QUERIES ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ VEHICLE QUERIES ============

export async function getVehicles(): Promise<Vehicle[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(vehicles).where(eq(vehicles.available, true));
  return result;
}

export async function getVehicleById(id: number): Promise<Vehicle | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createVehicle(vehicle: InsertVehicle): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(vehicles).values(vehicle);
  return { id: Number(result[0].insertId) };
}

// ============ BOOKING QUERIES ============

export async function getBookings(userId?: number): Promise<Booking[]> {
  const db = await getDb();
  if (!db) return [];
  
  if (userId) {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }
  return await db.select().from(bookings);
}

export async function getBookedDates(vehicleId: number): Promise<{ startDate: string; endDate: string }[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    startDate: bookings.startDate,
    endDate: bookings.endDate,
  }).from(bookings).where(
    and(
      eq(bookings.vehicleId, vehicleId),
      eq(bookings.status, "confirmed")
    )
  );
  
  return result.map(r => ({
    startDate: r.startDate.toISOString().split('T')[0],
    endDate: r.endDate.toISOString().split('T')[0],
  }));
}

export async function createBooking(booking: {
  vehicleId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  notes?: string;
  userId?: number;
}): Promise<{ id: number; success: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(bookings).values({
    vehicleId: booking.vehicleId,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhone: booking.customerPhone,
    startDate: new Date(booking.startDate),
    endDate: new Date(booking.endDate),
    totalPrice: booking.totalPrice,
    notes: booking.notes,
    userId: booking.userId,
    status: "pending",
  });
  
  return { id: Number(result[0].insertId), success: true };
}

// ============ TERRITORY QUERIES ============

export async function getTerritories(): Promise<Territory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(territories);
}

export async function getTerritoryById(id: number): Promise<Territory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(territories).where(eq(territories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAvailableTerritories(): Promise<Territory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(territories).where(eq(territories.status, "available"));
}

// ============ FRANCHISE APPLICATION QUERIES ============

export async function createFranchiseApplication(application: {
  territoryId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  investmentCapital?: string;
  businessExperience?: string;
  whyInterested?: string;
}): Promise<{ id: number; success: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(franchiseApplications).values({
    territoryId: application.territoryId,
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    phone: application.phone,
    city: application.city,
    state: application.state,
    investmentCapital: application.investmentCapital,
    businessExperience: application.businessExperience,
    whyInterested: application.whyInterested,
    status: "new",
  });
  
  return { id: Number(result[0].insertId), success: true };
}

export async function getFranchiseApplications(): Promise<FranchiseApplication[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(franchiseApplications);
}


// ============ BOOKING PAYMENT QUERIES ============

export async function getBookingById(id: number): Promise<Booking | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateBookingPayment(
  bookingId: number,
  data: {
    stripeCheckoutSessionId?: string;
    stripePaymentIntentId?: string;
    paymentStatus?: "unpaid" | "pending" | "paid" | "refunded";
    status?: "pending" | "confirmed" | "cancelled" | "completed";
  }
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(bookings).set(data).where(eq(bookings.id, bookingId));
}

export async function checkVehicleAvailability(
  vehicleId: number,
  startDate: Date,
  endDate: Date
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  // Check for overlapping confirmed bookings
  const overlapping = await db.select({ id: bookings.id })
    .from(bookings)
    .where(
      and(
        eq(bookings.vehicleId, vehicleId),
        eq(bookings.status, "confirmed"),
        // Overlapping date check: existing booking overlaps if:
        // existing.start <= new.end AND existing.end >= new.start
        lte(bookings.startDate, endDate),
        gte(bookings.endDate, startDate)
      )
    )
    .limit(1);
  
  return overlapping.length === 0;
}
