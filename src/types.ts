import { bundlersSchema, dataSchema } from "./schema";

export type BundlerSelect = typeof bundlersSchema.$inferSelect;
export type DataSelect = typeof dataSchema.$inferSelect;
export type InsertData = typeof dataSchema.$inferInsert;

export type Data = string;
export type Tag = { name: string; value: string };
export type Tags = [Tag];

export type BundlerResponse = {
  id: string;
  owner: string;
  dataCaches: string[];
  fastFinalityIndexes: string[];
  deadlineHeight: bigint;
  timestamp: string;
  version: string;
  signature: string;
  public: string;
};

export type StatusResponse = {
  id: string;
};
