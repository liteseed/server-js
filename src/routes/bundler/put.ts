import { eq } from "drizzle-orm";
import { getStakers } from "../../functions";
import { bundlersSchema } from "../../schema";
import { database } from "../../services";
import { notFound, parseJSON } from "../../utils/response";

type PutParams = { process: string; name: string; url: string };

export default async function put({ process, name, url }: PutParams): Promise<Response> {
  const stakers = await getStakers();
  const exists = stakers.find((staker) => staker.process === process && staker.amount >= 100);
  if (!exists) {
    return notFound(`Process ${process} does not exist`);
  }
  await database.update(bundlersSchema).set({  name, url }).where(eq(bundlersSchema.process, process));
  return parseJSON({ process, name, url });
}
