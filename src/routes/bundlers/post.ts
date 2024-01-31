import { bundlers } from "../../schema";
import { database } from "../../services";
import { generateRandomString } from "../../services/crypto";
import { INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function post({ transactionId, name, website }: { transactionId: string; name: string | undefined; website: string | undefined; }): Promise<Response> {
  const id = generateRandomString();
  try {
    await database.insert(bundlers).values({ id, transactionId, name, website });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  return parseJSON({ id, transactionId, name, website })
}