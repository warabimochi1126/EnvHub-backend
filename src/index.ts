import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hono!");
});

export default app;
