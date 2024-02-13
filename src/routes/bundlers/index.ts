import Elysia, { t } from "elysia";
import get from "./get";
import getAll from "./getAll";
import post from "./post";

export const bundlers = new Elysia({ name: "bundlers" })
  .get("/bundlers", () => getAll())
  .get("/bundler/:id", ({ params: { id } }) => get({ id }), {
    params: t.Object({ id: t.String() }),
  })
  .post("/bundler", ({ body: { process, name, url } }) => post({ process, name, url }), {
    body: t.Object({ process: t.String(), name: t.String(), url: t.String() }),
  });
