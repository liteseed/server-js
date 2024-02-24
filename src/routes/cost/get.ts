import { getFees } from "../../services/arweave/getFees";
import { parseJSON } from "../../utils/response";

export default async function get({ bytes }: { bytes: bigint }): Promise<Response> {
  return parseJSON((await getFees({ bytes })).toString());
}