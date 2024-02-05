import {fetchStakers} from "./fetchStakers";
import crypto from "crypto";

export async function selectBundler() {
  const stakers = await fetchStakers();
  const randomIndex = crypto.randomInt(stakers.length);
  return stakers[randomIndex];
}
