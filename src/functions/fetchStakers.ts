import { ao } from "../services";

type FetchStakersResponse = { process: string; amount: number; stakedAt: number }[];

export async function fetchStakers(): Promise<FetchStakersResponse> {
  const message = await ao.sendMessage({ tags: [{ name: "Action", value: "Stakers" }] });
  const { Messages } = await ao.readResult({ message });
  const data = JSON.parse(Messages[0].Data ?? "");
  return Object.keys(data).map((key) => ({ process: key, ...data[key] }));
}
