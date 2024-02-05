import { bundlers, data } from "./schema";

export type Bundler = typeof bundlers.$inferSelect;
export type Data = typeof data.$inferSelect;
export type InsertData = typeof data.$inferInsert;
