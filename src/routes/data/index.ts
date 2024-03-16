import Elysia, { t } from "elysia";
import get from "./get";
import uploadData from "./uploadData";
import status from "./status";

export const data = new Elysia({ name: "data" })
  .get("/data/:id", ({ params: { id } }) => get({ id }), {
    params: t.Object({ id: t.String() }),
    detail: {
      summary: "Get uploaded data by ID",
      description: "Get information about the status of the uploaded data by it's ID",
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
  })
  .post("/data/:id/status", ({ params: { id } }) => status({ id }), {
    params: t.Object({ id: t.String() }),
  });
