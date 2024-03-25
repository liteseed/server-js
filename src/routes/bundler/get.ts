import { eq } from "drizzle-orm";
import { bundlersSchema } from "../../schema";
import { database } from "../../services";
import { parseJSON } from "../../utils/response";
import { NotFoundError } from "elysia";

type GetParam = { process: string };
export default async function get({ process }: GetParam): Promise<Response> {
  const result = await database.query.bundlersSchema.findFirst({
    where: eq(bundlersSchema.process, process),
  });
  if (!result) {
    throw new NotFoundError(`Process ${process} does not exist`);
  }
  return parseJSON(result);
}
