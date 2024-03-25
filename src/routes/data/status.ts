import { eq } from "drizzle-orm";
import { database } from "../../services";
import { notFound, parseJSON } from "../../utils/response";
import { dataSchema } from "../../schema";
import { NotFoundError } from "elysia";

type DataGetParam = { id: string };
type DataStatusResponse = {
  id: string;
  status: "initiated" | "queued" | "success" | "failed";
  bundlerId: number;
  arweaveId: string;
};
export default async function status({ id }: DataGetParam): Promise<DataStatusResponse> {
  const result = await database.query.dataSchema.findFirst({ where: eq(dataSchema.id, id) });
  if (!result) {
    throw new NotFoundError(`/data/${id}`)
  }
  return result;
}
