import { arweave } from "../services";
import { estimateCost } from "./estimateCost"

// A simplified implementation
export async function verifyTransaction({ transactionId, size }: { transactionId: string, size: bigint }): Promise<boolean> {
  const estimatedCost = await estimateCost(size);
  const transaction = await arweave.getTransaction(transactionId);
  const amountTransferred = BigInt(transaction.quantity?.winston ?? "0");
  return amountTransferred > estimatedCost;
}