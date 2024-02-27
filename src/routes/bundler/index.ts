import Elysia, { t } from "elysia";
import get from "./get";
import getAll from "./getAll";
import post from "./post";
import put from "./put";

export const bundlers = new Elysia({ name: "bundlers" })
  .get("/bundlers", () => getAll(), {
    detail: {
      summary: "Get bundlers list",
      description: "Get list of currently staked bundler",
      tags: ["Bundlers"],
    },
  })
  .get("/bundler/:process", ({ params: { process } }) => get({ process }), {
    params: t.Object({ process: t.String() }),
    detail: {
      summary: "Get your bundler",
      description: "Get your bundler by its AO Process ID",
      tags: ["Bundlers"],
    },
  })
  .post("/bundler", ({ body: { process, name, url } }) => post({ process, name, url }), {
    body: t.Object({ process: t.String(), name: t.String(), url: t.String() }),
    detail: {
      summary: "Register your bundler",
      description: "Register your bundler by a AO Process ID",
      tags: ["Bundlers"],
    },
  })
  .put(
    "/bundler/:process",
    ({ params: { process }, body: { name, url } }) => put({ process, name, url }),
    {
      params: t.Object({ process: t.String() }),
      body: t.Object({ name: t.String(), url: t.String() }),

      detail: {
        summary: "Update your bundler information",
        description: "Update your bundler by your AO Process ID",
        tags: ["Bundlers"],
      },
    },
  );
