import { bundlersSchema } from "../../schema";
import { database } from "../../services";
import { parseJSON } from "../../utils/response";

export default async function getAll(): Promise<Response> {
  return parseJSON(
    await database
      .select({ name: bundlersSchema.name, url: bundlersSchema.url })
      .from(bundlersSchema),
  );
}
