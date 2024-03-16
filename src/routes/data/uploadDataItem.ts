import { InternalServerError } from "elysia";

import { selectRandomStaker } from "../../functions";
import { bundlerResponseSchema, dataSchema } from "../../schema";
import { database } from "../../services";
import { badRequest, parseJSON } from "../../utils/response";

type UploadDataParams = {
  data: Buffer;
};

const MAX_SIZE = 1024 * 500;

export default async function item({ data }: UploadDataParams): Promise<Response> {
  if (data.byteLength > MAX_SIZE) {
    return badRequest(`file size too large: ${data.byteLength}`);
  }
  const staker = await selectRandomStaker();
  if (!staker) {
    throw new InternalServerError();
  }
  const bundlerResponse = await fetch("POST", { body: data });
  const response = await bundlerResponse.json()
  const result = await database
    .insert(dataSchema)
    .values({ status: "queued", bundlerId: staker.id, dataId: response.id })
    .returning();

  await database.insert(bundlerResponseSchema).values(response);
  return parseJSON({ ...result[0] });
}
