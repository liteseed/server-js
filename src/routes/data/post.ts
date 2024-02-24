import { eq } from "drizzle-orm";
import { selectRandomStaker } from "../../functions";
import { data } from "../../schema";
import { database, lambda } from "../../services";
import { NOT_FOUND } from "../../utils/response";


type DataPostParams = {
  file: File;
};

export default async function post({ file }: DataPostParams): Promise<Response> {
  const staker = await selectRandomStaker();
  if (!staker) {
    return NOT_FOUND("staker not found");
  }
  const result = await database.insert(data).values({ status: "initiated" }).returning()
  const response = await lambda.processFile({ file, url: staker.url })
  await database.update(data).set({ status: "queued" }).where(eq(data.id, result[0].id))
  return (await response.json());
}
