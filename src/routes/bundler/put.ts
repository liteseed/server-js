import { eq } from "drizzle-orm";
import { getStakers } from "../../functions";
import { bundlers } from "../../schema";
import { database } from "../../services";
import { NOT_FOUND, parseJSON } from "../../utils/response";

type PutParams = { process: string; name: string; url: string };

export default async function put({ process, name, url }: PutParams): Promise<Response> {
  const stakers = await getStakers();
  const exists = stakers.find((staker) => staker.process === process && staker.amount >= 100);
  if (!exists) {
    return NOT_FOUND;
  }
  await database.update(bundlers).set({  name, url }).where(eq(bundlers.process, process));
  return parseJSON({ process, name, url });
}
