import Elysia, { t } from "elysia";
import get from "./get";

export const cost = new Elysia({ name: "cost" })
  .get("/cost/:bytes", ({ params: { bytes } }) => get({ bytes: BigInt(bytes) }), { params: t.Object({ bytes: t.String() }) })