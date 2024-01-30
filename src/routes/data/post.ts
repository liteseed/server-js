import { INTERNAL_SERVER_ERROR } from "../../utils/response";


export default async function post({ data }: { data: File; }): Promise<Response> {
  return INTERNAL_SERVER_ERROR;
}