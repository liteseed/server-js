import { getStakers } from "../../functions";
import { bundlers } from "../../schema";
import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";

type PostParams = { process: string; name: string; url: string };

export default async function post({ process, name, url }: PostParams): Promise<Response> {
  try {
    const stakers = await getStakers();
    const exists = stakers.find((staker) => staker.process === process && staker.amount >= 100);
    if (!exists) {
      return NOT_FOUND;
    }
    await database.insert(bundlers).values({ process, name, url });
    return parseJSON({ process, name, url });
  } catch (e) {
    console.log(e);
    return INTERNAL_SERVER_ERROR;
  }
}
