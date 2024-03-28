import { eq } from "drizzle-orm";
import { InternalServerError, NotFoundError } from "elysia";
import { bundlerResponseSchema, dataSchema } from "../../schema";
import { database } from "../../services";

type DataGetParam = { id: string };
export default async function decode({ id }: DataGetParam): Promise<Response> {
  const result = await database.query.dataSchema.findFirst({ where: eq(dataSchema.id, id) });
  if (!result) {
    throw new NotFoundError(`/data/${id}`);
  }

  const response = await fetch(`https://arweave.net/${result.arweaveId}`);
  if (response.status !== 200) {
    throw new InternalServerError();
  }

  const text = await response.text();
  const buffer = Buffer.from(text, "base64url");
  return new Response(buffer);
}
