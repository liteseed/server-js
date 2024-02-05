import { fetchStakers, generateRandomString } from "../../functions";
import { bundlers } from "../../schema";
import { ao, database } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";

export default async function post({ stakerId, name, url }: { stakerId: string; name: string | undefined; url: string; }): Promise<Response> {
  let stakers: string[];
  try {
    stakers = await fetchStakers(); 
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  const exists = stakers.find((v) => v === stakerId);
  if (!exists) {
    return NOT_FOUND;
  }
  try {
    await database.insert(bundlers).values({ stakerId, name, url });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  return parseJSON({ stakerId, name, url })
}
