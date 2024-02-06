import { database } from "../services";
import {fetchStakers} from "./fetchStakers";
import crypto from "crypto";

export async function selectBundler() {
  const stakers = await fetchStakers();
  const randomIndex = crypto.randomInt(stakers.length);
  const bundlerId = stakers[randomIndex];
  return await database.query.bundlers.findFirst({ with: { stakerId: bundlerId }});
}
