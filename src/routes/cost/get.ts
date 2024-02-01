import { getFees } from "../../services/arweave/getFees";
import { INTERNAL_SERVER_ERROR, parseJSON } from "../../utils/response";

export default async function get({ bytes }: { bytes: bigint }): Promise<Response> {
  try {
    return parseJSON((await getFees(bytes)).toString());
  } catch (e) {
    return INTERNAL_SERVER_ERROR;
  }
}