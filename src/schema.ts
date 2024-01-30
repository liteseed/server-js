import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';

export const bundlers = pgTable("bundlers", {
  id: text("id").primaryKey(),
  name: text("name"),
  website: text("website"),
});

export const bundlerDataRelation = relations(bundlers, ({ many }) => ({ data: many(data) }));

export const statusEnum = pgEnum('status', ['failed', 'initiated', 'queued', 'success']);

export const data = pgTable("data", {
  id: text("id").primaryKey(),
  status: statusEnum('status'),
});
