import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const bundlers = pgTable("bundlers", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  process: text("process").notNull(),
});

export const bundlerDataRelation = relations(bundlers, ({ many }) => ({ data: many(data) }));

export const statusEnum = pgEnum("status", ["failed", "initiated", "queued", "success"]);

export const data = pgTable("data", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: statusEnum("status"),
});
