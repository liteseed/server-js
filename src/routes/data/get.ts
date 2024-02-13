import { database } from "../../services";
import { DataSelect } from "../../types";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, parseJSON } from "../../utils/response";

type DataGetParam = { id: string };
export default async function get({ id }: DataGetParam): Promise<Response> {
  let result: DataSelect | undefined;
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
