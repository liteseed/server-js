import Elysia, { t } from "elysia";
import get from "./get";
import getAll from "./getAll";
import post from "./post";
import put from "./put";

export const bundlers = new Elysia({ name: "bundlers" })
  .get("/bundlers", () => getAll())
  .get("/bundler/:process", ({ params: { process } }) => get({ process }), {
    params: t.Object({ process: t.String() }),
  })
  .post("/bundler", ({ body: { process, name, url } }) => post({ process, name, url }), {
    body: t.Object({ process: t.String(), name: t.String(), url: t.String() }),
  })
  .put(
    "/bundle/:process",
    ({ params: { process }, body: { name, url } }) => put({ process, name, url }),
    {
      params: t.Object({ process: t.String() }),
      body: t.Object({ name: t.String(), url: t.String() }),
    },
  );
