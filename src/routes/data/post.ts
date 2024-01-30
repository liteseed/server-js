import { INTERNAL_SERVER_ERROR } from "../../utils/response";


export default async function post({ file }: { file: File }): Promise<Response> {
  return INTERNAL_SERVER_ERROR;
}