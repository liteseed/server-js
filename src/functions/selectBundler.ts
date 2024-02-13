import crypto from "crypto";
import { eq } from "drizzle-orm";
import { database } from "../services";
import { fetchStakers } from "./fetchStakers";
import { bundlers } from "../schema";

export async function selectBundler() {
  const stakers = await fetchStakers();
  const randomIndex = crypto.randomInt(stakers.length);
  const process = stakers[randomIndex];
  return await database.query.bundlers.findFirst({ where: eq(bundlers.process, process) });
}
