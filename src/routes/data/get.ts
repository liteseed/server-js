import { eq } from "drizzle-orm";
import { database } from "../../services";
import { notFound, parseJSON } from "../../utils/response";
import { dataSchema } from "../../schema";

type DataGetParam = { id: string };
export default async function get({ id }: DataGetParam): Promise<Response> {
  const result = await database.query.dataSchema.findFirst({ where: eq(dataSchema.id, id) });
  if (!result) {
    return notFound(`data/${id}`);
  }
  return parseJSON(result);
}
