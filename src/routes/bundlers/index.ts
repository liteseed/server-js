import Elysia, { t } from "elysia";
import get from "./get";
import getAll from "./getAll";
import post from "./post";

export const bundlers = new Elysia({ name: "bundlers" })
  .get("/bundlers", () => getAll())
  .get("/bundlers/:id", ({ params: { id } }) => get({ id }), { params: t.Object({ id: t.String() }) })
  .post("/bundlers", ({ body: { transactionId, name, website } }) => post({ transactionId, name, website }), { body: t.Object({ transactionId: t.String(), name: t.Optional(t.String()), website: t.Optional(t.String()) }) })