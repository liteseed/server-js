import { data } from "../../schema";
import { database } from "../../services";
import { generateRandomString } from "../../services/crypto";
import { INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function post({ file, transactionId }: { file: File, transactionId: string }): Promise<Response> {
  const id = generateRandomString();
  try {
    await database.insert(data).values({ id });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  console.log(file, transactionId);
  return parseJSON({ id })
}