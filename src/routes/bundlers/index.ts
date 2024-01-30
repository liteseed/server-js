import Elysia, { t } from "elysia";
import get from "./get";
import getAll from "./getAll";

export const bundlers = new Elysia({ name: "bundlers" })
  .get("/", () => getAll())
  .get("/:id", ({ params: { id } }) => get({ id }), { params: t.Object({ id: t.String() }) })