import Elysia, { t } from "elysia";

export const authentication = new Elysia({ name: "authentication" })
  .post("/authenticate", () => {})
  .post("/verify", () => {});
