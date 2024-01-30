import Elysia, { t } from "elysia";
import post from "./post";


export const data = new Elysia({ name: "data" })
  .post("/", ({ body: { data } }) => post({ data }), { body: t.Object({ data: t.Any() }) })