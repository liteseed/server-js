import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => ({ version: "0.0.1", name: "api", })).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
