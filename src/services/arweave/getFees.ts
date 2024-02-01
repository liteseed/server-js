export async function getFees(bytes: bigint) {
  const response = await fetch(`https://arweave.net/price/${bytes.toString()}`, {
    method: "GET"
  });

  const body = await response.json();
  return BigInt(body.toString())
}