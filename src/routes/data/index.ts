import Elysia, { t } from "elysia";
import status from "./status";
import uploadData from "./uploadData";
import decode from "./decode";

export const data = new Elysia({ name: "data" })
  .get("/data/:id", ({ params: { id } }) => decode({ id }), {
    params: t.Object({ id: t.String() }),
    detail: {
      summary: "Get uploaded data by ID",
      description: "Get the data binary",
      tags: ["Data"],
    },
  })
  .get("/data/status/:id", ({ params: { id } }) => status({ id }), {
    params: t.Object({ id: t.String() }),
    response: t.Object({
      id: t.String(),
      bundlerId: t.Integer(),
      arweaveId: t.Nullable(t.String()),
      status: t.String(),
    }),
    detail: {
      summary: "Get the status uploaded data by ID",
      description: "Get the status uploaded data by ID",
      tags: ["Data"],
    },
  })
  .post("/data", ({ body: { file, tags } }) => uploadData({ file, tags: tags ?? "[]" }), {
    body: t.Object({
      file: t.File(),
      tags: t.Optional(t.String()),
    }),
    detail: {
      summary: "Upload a file",
      description: "Upload the data to a random staked bundler within the network",
      tags: ["Data"],
    },
  });
