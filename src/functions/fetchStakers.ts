import { ao } from "../services";
import { LITESEED_CONTRACT_PROCESS_ID } from "../utils/constants";

export async function fetchStakers(): Promise<string[]> {
  const response = await ao.sendMessage({ processId: LITESEED_CONTRACT_PROCESS_ID, data: "Stakers" });
  return JSON.parse(response.toString());
}
