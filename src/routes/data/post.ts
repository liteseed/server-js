import { generateRandomString, verifyTransaction } from "../../functions";
import { data } from "../../schema";
import { database } from "../../services";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function post({ file, transactionId }: { file: File, transactionId: string }): Promise<Response> {
  const id = generateRandomString();
  const verify = await verifyTransaction({ transactionId, bytes: BigInt(file.size) });
  if (!verify) {
    return BAD_REQUEST;
  }
  try {
    await database.insert(data).values({ id });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  console.log(file, transactionId);
  return parseJSON({ id })
}