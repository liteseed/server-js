import { database } from "../../services";
import { INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";


export default async function getAll(): Promise<Response> {
  try {
    const response = await database.query.bundlers.findMany();
    return parseJSON(response);
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
}
