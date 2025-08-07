import { PicsumController } from "@server/controllers/PicsumController";
import { Hono } from "hono";

const picsumRoute = new Hono();
const picsumController = new PicsumController();

picsumRoute.get("/", async (c) => picsumController.getPics(c));

export default picsumRoute;
