import { eq } from "drizzle-orm";
import { bundlersSchema } from "../../schema";
import { database } from "../../services";
import { notFound, parseJSON } from "../../utils/response";

type GetParam = { process: string };
export default async function get({ process }: GetParam): Promise<Response> {
  const result = await database.query.bundlers.findFirst({
    where: eq(bundlersSchema.process, process),
  });
  if (!result) {
    return notFound(`Process ${process} does not exist`);
  }
  return parseJSON(result);
}
