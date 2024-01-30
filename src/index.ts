import { Elysia } from "elysia";
import { data } from "./routes/data";
import { bundlers } from "./routes/bundlers";
import { parseJSON } from "./utils/response";

const app = new Elysia()
  .use(data)
  .use(bundlers)
  .get("/", () => parseJSON({ version: "0.0.1", name: "Liteseed API", }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
