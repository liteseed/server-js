import { postData, selectBundler, verifyTransaction } from "../../functions";
import { data } from "../../schema";
import { database } from "../../services";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";

type DataPostParams = {
  file: File;
  transactionId: string;
};

export default async function post({ file, transactionId }: DataPostParams): Promise<Response> {
  try {
    const verify = await verifyTransaction({ transactionId, bytes: BigInt(file.size) });
    if (!verify) {
      return BAD_REQUEST;
    }
    const bundler = await selectBundler();
    if (!bundler) {
      return NOT_FOUND;
    }
    await postData({ file, url: bundler.url });
    const result = await database.insert(data).values({ status: "initiated" }).returning();
    return parseJSON({ id: result[0].id });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
}
