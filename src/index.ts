import { Elysia } from "elysia";
import { bundlers } from "./routes/bundler";
import { cost } from "./routes/cost";
import { data } from "./routes/data";
import { parseJSON } from "./utils/response";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(cost)
  .use(data)
  .use(bundlers)
  .get("/", () => parseJSON({ version: "0.0.1", name: "Liteseed API" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
