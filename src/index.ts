import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { bundlers } from "./routes/bundler";
import { cost } from "./routes/cost";
import { data } from "./routes/data";
import { sentry } from "./services";
import { parseJSON } from "./utils/response";

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
  .use(
    swagger({
      documentation: {
        info: {
          title: "Liteseed Network API Documentation",
          version: "0.0.2",
        },
        tags: [
          { name: "App", description: "Server status" },
          { name: "Arweave", description: "Information about Arweave Network" },
          { name: "Data", description: "Endpoint for uploading data and getting status information about upload data on Arweave" },
          { name: "Bundlers", description: "Endpoints for registering and managing bundlers on AO" },
        ],
      },
      exclude: [
        "/data/{id}/status"
      ]
    }),
  )
  .use(cors())
  .use(cost)
  .use(data)
  .use(bundlers)
  .get("/", () => parseJSON({ version: "0.0.2", name: "Liteseed API" }), {
    detail: { summary: "Get the current status of the server", tags: ["App"] },
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
