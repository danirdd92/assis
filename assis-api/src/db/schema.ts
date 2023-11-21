import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  decimal,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
export const unitEnum = pgEnum("unit", ["kg", "unit"]);

export const users = pgTable("users", {
  id: uuid("user_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  password: varchar("password").notNull(),
  address: varchar("address", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 50 }),
});

export const categories = pgTable("categories", {
  id: uuid("category_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const products = pgTable("products", {
  id: uuid("product_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  image: varchar("image").notNull(),
  unit: unitEnum("unit").notNull().default("kg"),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("order_id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  date: timestamp("order_date", {
    mode: "string",
    withTimezone: false,
  })
    .defaultNow()
    .notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("order_item_id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type OrderInsert = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type OrderItemInsert = typeof orderItems.$inferInsert;
