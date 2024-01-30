import { INTERNAL_SERVER_ERROR } from "../../utils/response";


export default async function get({ id }: { id: string }): Promise<Response> {
  return INTERNAL_SERVER_ERROR;
}