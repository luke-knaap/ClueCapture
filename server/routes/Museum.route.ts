import { MuseumController } from "@server/controllers/MuseumController";
import { Hono } from "hono";

const museumRoute = new Hono();
const museumController = new MuseumController();

museumRoute.get("/artworks", async (c) => museumController.getArtworks(c));

export default museumRoute;
