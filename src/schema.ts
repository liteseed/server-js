import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  uuid
} from "drizzle-orm/pg-core";

export const bundlersSchema = pgTable("bundlers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  process: text("process").notNull(),
  url: text("url").notNull(),
});

export const statusEnum = pgEnum("status", ["failed", "initiated", "queued", "success"]);

export const dataSchema = pgTable("data", {
  id: uuid("id").primaryKey().defaultRandom(),
  bundlerId: integer("bundler_id").notNull(),
  dataId: text("data_id"),
  status: statusEnum("status").notNull(),
});

export const bundlerResponseSchema = pgTable("bundler_response", {
  id: text("id").primaryKey(),
  owner: text("owner").notNull(),
  deadlineHeight: bigint("deadline_height", { mode: "bigint" }).notNull(),
  timestamp: text("timestamp").notNull(),
  version: text("version"),
  signature: text("signature"),
  public: text("public"),
});
