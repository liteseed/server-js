import { arweave } from "../services";

// A simplified implementation
export async function verifyTransaction({ transactionId, bytes }: { transactionId: string, bytes: bigint }): Promise<boolean> {
  const estimatedCost = await arweave.getFees(bytes);
  const transaction = await arweave.getTransaction(transactionId);
  const amountTransferred = BigInt(transaction.quantity?.winston ?? "0");
  return amountTransferred > estimatedCost;
}