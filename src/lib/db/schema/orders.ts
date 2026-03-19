import { pgTable, text, integer, timestamp, json } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { packages } from "./packages";

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  packageId: text("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  status: text("status", {
    enum: ["pending", "confirmed", "cancelled", "completed"],
  })
    .notNull()
    .default("pending"),
  
  // Traveler counts
  adults: integer("adults").notNull().default(1),
  children: integer("children").notNull().default(0),
  
  // Contact information
  contactFirstName: text("contact_first_name").notNull(),
  contactLastName: text("contact_last_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  
  // Travel details
  travelDate: timestamp("travel_date").notNull(),
  specialRequests: text("special_requests"),
  
  // Pricing
  basePrice: integer("base_price").notNull(),
  totalPrice: integer("total_price").notNull(),
  priceBreakdown: json("price_breakdown").$type<{
    adults: number;
    children: number;
    adultPrice: number;
    childPrice: number;
    subtotal: number;
    taxes: number;
    total: number;
  }>(),
  
  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type exports
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderStatus = "pending" | "confirmed" | "cancelled" | "completed";
