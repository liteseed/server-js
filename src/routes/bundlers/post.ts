import { generateRandomString } from "../../functions";
import { bundlers } from "../../schema";
import { ao, database } from "../../services";
import { INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function post({ transactionId, name, website }: { transactionId: string; name: string | undefined; website: string | undefined; }): Promise<Response> {
  const id = generateRandomString();
  try {
    await database.insert(bundlers).values({ id, transactionId, name, website });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }

  try {
    
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  return parseJSON({ id, transactionId, name, website })
}