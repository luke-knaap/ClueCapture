import museumRoute from "@server/routes/Museum.route";
import { Hono } from "hono";
import { testconnection } from "./db";
import picsumRoute from "@server/routes/Picsum.route";

const app = new Hono();

await testconnection();

app.route("/museum", museumRoute);
app.route("/picsum", picsumRoute);

export default app;
