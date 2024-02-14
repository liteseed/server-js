import crypto from "crypto";
import { eq } from "drizzle-orm";
import { database } from "../services";
import { bundlers } from "../schema";
import { BundlerSelect } from "../types";
import { getStakers } from "./getStakers";

type SelectRandomStakerResponse = Promise<BundlerSelect | undefined>;

export async function selectRandomStaker(): SelectRandomStakerResponse {
  console.log(`SELECT RANDOM STAKER`);
  const stakers = await database.query.bundlers.findMany();
  const randomIndex = crypto.randomInt(stakers.length);
  return stakers[randomIndex];
}
