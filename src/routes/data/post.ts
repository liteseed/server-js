import { InternalServerError } from "elysia";

import { selectRandomStaker } from "../../functions";
import { bundlerResponseSchema, dataSchema } from "../../schema";
import { database, lambda } from "../../services";
import { badRequest, parseJSON } from "../../utils/response";

type DataPostParams = {
  file: File;
};

const MAX_SIZE = 1024 * 500;

export default async function post({ file }: DataPostParams): Promise<Response> {
  if (file.size > MAX_SIZE) {
    return badRequest(`file size too large: ${file.size}`);
  }
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
