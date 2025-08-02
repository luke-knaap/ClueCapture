import { Hono } from "hono";
import { testconnection } from "./db";
import museumRoute from "@server/routes/Museum.route";

const app = new Hono();

await testconnection();

app.route("/museum", museumRoute);

export default app;
