import { Hono } from "hono";
import { testconnection } from "./db";
import museumRoute from "@/routes/metMueseumRoute";

const app = new Hono();

await testconnection();

app.route("/", museumRoute);

export default app;
