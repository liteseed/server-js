import { InternalServerError, ParseError,  } from "elysia";

import { selectRandomStaker } from "../../functions";
import { bundlerResponseSchema, dataSchema } from "../../schema";
import { database, lambda } from "../../services";
import { parseJSON } from "../../utils/response";
import type { Tags } from "../../types";

type UploadDataParams = {
  file: File;
  tags: string;
};

const MAX_SIZE = 1024 * 500;

export default async function uploadData({
  file,
  tags: tagsJson,
}: UploadDataParams): Promise<Response> {
  if (file.size > MAX_SIZE) {
    throw new ParseError(`file size too large: ${file.size}`)
  }

  const tags: Tags = await JSON.parse(tagsJson);
  const staker = await selectRandomStaker();
  if (!staker) {
    throw new InternalServerError();
  }
  tags.push({name: "content-type", value: file.type})
  const bundlerResponse = await lambda.processFile({ file, url: staker.url, tags: tags });
  const result = await database
    .insert(dataSchema)
    .values({ status: "queued", bundlerId: staker.id, arweaveId: bundlerResponse.id })
    .returning();

  await database.insert(bundlerResponseSchema).values(bundlerResponse);
  return parseJSON({ ...result[0] });
}
