import crypto from "crypto";
import { database } from "../services";
import { BundlerSelect } from "../types";

type SelectRandomStakerResponse = Promise<BundlerSelect | undefined>;

export async function selectRandomStaker(): SelectRandomStakerResponse {
  const stakers = await database.query.bundlers.findMany();
  const randomIndex = crypto.randomInt(stakers.length);
  return stakers[randomIndex];
}
