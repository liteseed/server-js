import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { bundlers } from "./routes/bundler";
import { cost } from "./routes/cost";
import { data } from "./routes/data";
import { sentry } from "./services";
import { parseJSON } from "./utils/response";
import { rateLimit } from "elysia-rate-limit";

const app = new Elysia()
  .use(rateLimit())
  .onError(({ code, error }) => {
    if (code === "INTERNAL_SERVER_ERROR" || code === "UNKNOWN") {
      sentry.captureException(error);
    }
  })
  .use(
    logger({
      level: process.env.Environment === "production" ? "silent" : "debug",
    }),
  )
  .use(cors())

  .use(cost)
  .use(data)
  .use(bundlers)
  .get("/", () => parseJSON({ version: "0.0.1", name: "Liteseed API" }))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
