import { database } from "../../services";
import { parseJSON } from "../../utils/response";


export default async function getAll(): Promise<Response> {
  return parseJSON( await database.query.bundlers.findMany());
}
