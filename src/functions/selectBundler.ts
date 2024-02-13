import crypto from "crypto";
import { eq } from "drizzle-orm";
import { database } from "../services";
import { bundlers } from "../schema";
import { BundlerSelect } from "../types";
import { getStakers } from "./getStakers";

type SelectBundlerResponse = Promise<BundlerSelect | undefined>;

export async function selectBundler(): SelectBundlerResponse {
  const stakers = await getStakers();
  const randomIndex = crypto.randomInt(stakers.length);
  const { process } = stakers[randomIndex];
  return await database.query.bundlers.findFirst({ where: eq(bundlers.process, process) });
}
