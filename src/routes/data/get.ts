import { database } from "../../services";
import { NOT_FOUND, parseJSON } from "../../utils/response";

type DataGetParam = { id: string };
export default async function get({ id }: DataGetParam): Promise<Response> {
  const result = await database.query.data.findFirst({ with: { id } });
  if (!result) {
    return NOT_FOUND(`data/${id} not found`);
  }
  return parseJSON(result);
}
