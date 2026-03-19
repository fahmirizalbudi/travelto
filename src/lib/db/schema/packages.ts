import { pgTable, text, integer, real, timestamp, json } from "drizzle-orm/pg-core";

export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  price: integer("price").notNull(),
  rating: real("rating").notNull().default(0),
  reviews: integer("reviews").notNull().default(0),
  duration: text("duration").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  highlights: json("highlights").$type<string[]>().notNull().default([]),
  itinerary: json("itinerary")
    .$type<{ day: number; title: string; description: string }[]>()
    .notNull()
    .default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type exports
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
