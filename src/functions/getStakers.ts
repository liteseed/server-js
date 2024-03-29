import { lambda } from "../services";

type GetStakers = { process: string; amount: number; stakedAt: number }[];

export async function getStakers(): Promise<GetStakers> {
  const message = await lambda.sendMessage({ tags: [{ name: "Action", value: "Stakers" }] });
  const { Messages } = await lambda.readResult({ message });
  const data = JSON.parse(Messages[0].Data ?? "");
  return Object.keys(data).map((key) => ({ process: key, ...data[key] }));
}
