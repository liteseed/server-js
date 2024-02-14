import { eq } from "drizzle-orm";
import { postData, selectRandomStaker, verifyTransaction } from "../../functions";
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
    const staker = await selectRandomStaker();
    if (!staker) {
      return NOT_FOUND;
    }
    const result = await database.insert(data).values({ status: "initiated" }).returning();
    const response = await postData({ file, url: staker.url });
    await database.update(data).set({ status: "queued" }).where(eq(data.id, result[0].id));
    return parseJSON({ id: result[0].id });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
}
