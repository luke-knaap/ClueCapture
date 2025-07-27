import { Hono } from "hono";
const app = new Hono();

app.get("api/test", (c) => {
  return c.json({ message: "test" });
});

export default app;
