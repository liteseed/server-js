import Elysia, { t } from "elysia";
import get from "./get";
import post from "./post";

export const data = new Elysia({ name: "data" })
  .get("/data/:id", ({ params: { id } }) => get({ id }), { params: t.Object({ id: t.String() }) })
  .post("/data", ({ body: { file } }) => post({ file }), { body: t.Object({ file: t.File() }) })