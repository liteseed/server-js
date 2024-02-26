import { eq } from "drizzle-orm";
import { bundlersSchema, dataSchema } from "../../schema";
import { database } from "../../services";
import { NO_CONTENT, notFound, parseJSON } from "../../utils/response";

type DataItemStatus = {
  status: string;
  info: string;
};

async function checkStatus(id: string, url: string): Promise<DataItemStatus> {
  const response = await fetch(`${url}/${id}/status`);
  return await response.json();
}

export default async function status({id}:{id: string}): Promise<Response> {
  const data = await database.query.dataSchema.findFirst({ where: eq(dataSchema.id, id) });
  if (!data) {
    return notFound(`data:id-${id}`);
  }
  if (!data.dataId) {
    return notFound(`data:data_id-${data.dataId}`);
  }
  const bundler = await database.query.bundlersSchema.findFirst({
    where: eq(bundlersSchema.id, data?.bundlerId),
  });
  if (!bundler) {
    return notFound(`bundler: ${data.bundlerId}`);
  }
  const bundlerStatus = await checkStatus(data.dataId, bundler.url);
  if (bundlerStatus.info === "permanent") {
    await database.update(dataSchema).set({ status: "success" }).where(eq(dataSchema.id, id));
  }
  return NO_CONTENT;
}
