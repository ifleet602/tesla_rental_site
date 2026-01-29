import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("vehicles router", () => {
  it("should list vehicles (returns array)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.vehicles.list();
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("territories router", () => {
  it("should list territories (returns array)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.territories.list();
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("bookings router", () => {
  it("should create a booking with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.bookings.create({
      vehicleId: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "6025551234",
      startDate: "2026-02-01",
      endDate: "2026-02-05",
      totalPrice: "596",
      notes: "Test booking",
    });
    
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");
  });
});

describe("franchise router", () => {
  it("should submit a franchise application with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.franchise.submit({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "6025559876",
      city: "Phoenix",
      state: "Arizona",
      investmentCapital: "$200,000 - $250,000",
      businessExperience: "10 years in automotive industry",
      whyInterested: "Excited about EV market growth",
    });
    
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");
  });

  it("should submit a minimal franchise application", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.franchise.submit({
      firstName: "Bob",
      lastName: "Jones",
      email: "bob@example.com",
      phone: "6025551111",
    });
    
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("id");
  });
});

describe("auth router", () => {
  it("should return null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.auth.me();
    
    expect(result).toBeNull();
  });

  it("should return user for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.auth.me();
    
    expect(result).not.toBeNull();
    expect(result?.email).toBe("test@example.com");
  });
});
