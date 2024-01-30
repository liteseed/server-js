import { INTERNAL_SERVER_ERROR } from "../../utils/response";

export default async function post({ transactionId, name, website }: { transactionId: string; name: string | undefined; website: string | undefined; }): Promise<Response> {
  return INTERNAL_SERVER_ERROR;
}