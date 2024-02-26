import { InternalServerError } from "elysia";

import { selectRandomStaker } from "../../functions";
import { bundlerResponseSchema, dataSchema } from "../../schema";
import { database, lambda } from "../../services";
import { parseJSON } from "../../utils/response";

type DataPostParams = {
  file: File;
};

export default async function post({ file }: DataPostParams): Promise<Response> {
  const staker = await selectRandomStaker();
  if (!staker) {
    throw new InternalServerError();
  }
  const bundlerResponse = await lambda.processFile({ file, url: staker.url });
  const result = await database
    .insert(dataSchema)
    .values({ status: "queued", bundlerId: staker.id, dataId: bundlerResponse.id })
    .returning();

  await database.insert(bundlerResponseSchema).values(bundlerResponse);
  return parseJSON({ ...result[0] });
}
