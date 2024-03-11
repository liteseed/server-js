type GetFeesParams = { bytes: bigint };
type GetFeesResponse = Promise<bigint>;

export async function getFees({ bytes }: GetFeesParams): GetFeesResponse {
  const response = await fetch(`https://arweave.net/price/${bytes.toString()}`, {
    method: "GET",
  });
  const body = await response.text();
  return BigInt(body);
}
