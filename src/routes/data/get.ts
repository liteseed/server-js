import { database } from "../../services";
import { Data } from "../../types";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";

export default async function get({ id }: { id: string; }): Promise<Response> {
  let result: Data | undefined;
  try {
    result = await database.query.data.findFirst({ with: { id } });
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
  if (!result) {
    return NOT_FOUND;
  }
  return parseJSON(result);
}