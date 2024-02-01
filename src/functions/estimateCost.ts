import { getFees } from "../services/arweave/getFees";

export async function estimateCost(size: bigint): Promise<bigint> {
  return getFees(size)
}