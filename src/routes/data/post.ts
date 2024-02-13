import { selectBundler, verifyTransaction } from "../../functions";
import { data } from "../../schema";
import { database } from "../../services";
import { BundlerSelect, InsertData } from "../../types";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function post({
  file,
  transactionId,
}: {
  file: File;
  transactionId: string;
}): Promise<Response> {
  let bundler: BundlerSelect, id: string, result: InsertData[], verify: boolean;

  try {
    verify = await verifyTransaction({ transactionId, bytes: BigInt(file.size) });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  if (!verify) {
    return BAD_REQUEST;
  }
  try {
    bundler = await selectBundler();
  } catch (e) {}
  try {
    result = await database.insert(data).values({ status: "initiated" }).returning();
    id = result[0].id!;
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  return parseJSON({ id });
}
