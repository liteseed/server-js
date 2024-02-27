import Elysia, { t } from "elysia";
import get from "./get";

export const cost = new Elysia({ name: "cost" }).get(
  "/cost/:bytes",
  ({ params: { bytes } }) => get({ bytes: BigInt(bytes) }),
  {
    params: t.Object({ bytes: t.String() }),
    detail: {
      summary: "Cost of upload",
      description: "Get the cost to upload data to Arweave",
      tags: ["Arweave"],
    },
  },
);
