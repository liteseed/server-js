import { eq } from "drizzle-orm";
import { bundlers } from "../../schema";
import { database } from "../../services";
import { NOT_FOUND, parseJSON } from "../../utils/response";

type GetParam = { process: string };
export default async function get({ process }: GetParam): Promise<Response> {
  const result = await database.query.bundlers.findFirst({
    where: eq(bundlers.process, process),
  });
  if (!result) {
    return NOT_FOUND;
  }
  return parseJSON(result);
}
