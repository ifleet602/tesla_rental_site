import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tesla vehicles available for rental
 */
export const vehicles = mysqlTable("vehicles", {
  id: int("id").autoincrement().primaryKey(),
  model: varchar("model", { length: 100 }).notNull(),
  year: int("year").notNull(),
  color: varchar("color", { length: 50 }),
  range: int("range"), // miles
  acceleration: varchar("acceleration", { length: 20 }), // e.g., "3.1s 0-60"
  topSpeed: int("topSpeed"), // mph
  dailyRate: decimal("dailyRate", { precision: 10, scale: 2 }).notNull(),
  weeklyRate: decimal("weeklyRate", { precision: 10, scale: 2 }),
  imageUrl: text("imageUrl"),
  description: text("description"),
  features: text("features"), // JSON string of features
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = typeof vehicles.$inferInsert;

/**
 * Rental bookings
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  vehicleId: int("vehicleId").references(() => vehicles.id).notNull(),
  customerName: varchar("customerName", { length: 200 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Franchise territories
 */
export const territories = mysqlTable("territories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zipCodes: text("zipCodes"), // JSON array of zip codes
  population: int("population"),
  status: mysqlEnum("status", ["available", "pending", "sold"]).default("available").notNull(),
  investmentMin: decimal("investmentMin", { precision: 12, scale: 2 }),
  investmentMax: decimal("investmentMax", { precision: 12, scale: 2 }),
  projectedRevenue: decimal("projectedRevenue", { precision: 12, scale: 2 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Territory = typeof territories.$inferSelect;
export type InsertTerritory = typeof territories.$inferInsert;

/**
 * Franchise applications
 */
export const franchiseApplications = mysqlTable("franchiseApplications", {
  id: int("id").autoincrement().primaryKey(),
  territoryId: int("territoryId").references(() => territories.id),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  investmentCapital: text("investmentCapital"),
  businessExperience: text("businessExperience"),
  whyInterested: text("whyInterested"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "approved", "rejected"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FranchiseApplication = typeof franchiseApplications.$inferSelect;
export type InsertFranchiseApplication = typeof franchiseApplications.$inferInsert;
