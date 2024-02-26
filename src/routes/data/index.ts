import Elysia, { t } from "elysia";
import get from "./get";
import post from "./post";
import status from "./status";

export const data = new Elysia({ name: "data" })
  .get("/data/:id", ({ params: { id } }) => get({ id }), { params: t.Object({ id: t.String() }) })
  .post("/data", ({ body: { file } }) => post({ file }), { body: t.Object({ file: t.File() }) })
  .post("/data/:id/status", ({ params: { id } }) => status({ id }), {
    params: t.Object({ id: t.String() }),
  });
