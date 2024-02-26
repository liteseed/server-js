import { getStakers } from "../../functions";
import { bundlersSchema } from "../../schema";
import { database } from "../../services";
import { notFound, parseJSON } from "../../utils/response";

type PostParams = { process: string; name: string; url: string };

export default async function post({ process, name, url }: PostParams): Promise<Response> {
  const stakers = await getStakers();
  const exists = stakers.find((staker) => staker.process === process && staker.amount >= 100);
  if (!exists) {
    return notFound(`Process ${process} does not exist`);
  }
  await database.insert(bundlersSchema).values({ process, name, url });
  return parseJSON({ process, name, url });
}
