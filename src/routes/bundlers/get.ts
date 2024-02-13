import { eq } from "drizzle-orm";
import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";
import { bundlers } from "../../schema";

type GetParam = { id: string };
export default async function get({ id }: GetParam): Promise<Response> {
  try {
    const result = await database.query.bundlers.findFirst({ where: eq(bundlers.stakerId, id) });
    if (!result) {
      return NOT_FOUND;
    }
    return parseJSON(result);
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
}
