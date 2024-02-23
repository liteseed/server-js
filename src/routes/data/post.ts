import { eq } from "drizzle-orm";
import { selectRandomStaker } from "../../functions";
import { data } from "../../schema";
import { database, lambda } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, parseJSON } from "../../utils/response";


type DataPostParams = {
  file: File;
};

export default async function post({ file }: DataPostParams): Promise<Response> {
  try {
    const staker = await selectRandomStaker();
    if (!staker) {
      return NOT_FOUND;
    }
    const result = await database.insert(data).values({ status: "initiated" }).returning()
    const response = await lambda.processFile({ file, url: staker.url })
    await database.update(data).set({ status: "queued" }).where(eq(data.id, result[0].id))

    return (await response.json());
  } catch (e) {
    console.log(e)
    return INTERNAL_SERVER_ERROR;
  }
}
