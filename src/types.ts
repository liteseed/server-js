import { bundlers, data } from "./schema";

export type BundlerSelect = typeof bundlers.$inferSelect;
export type DataSelect = typeof data.$inferSelect;
export type InsertData = typeof data.$inferInsert;

export type Data = string;
export type Tag = { name: string; value: string };
export type Tags = [Tag];
