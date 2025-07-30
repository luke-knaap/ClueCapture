import { Hono } from "hono";
import { MetMuseumService } from "@/services/metMuseumService";

const museumRoute = new Hono();
const service = new MetMuseumService();

museumRoute.get("/api/museum", async (c) => {
  try {
    const artworks = await service.getArtwork(16);
    return c.json(artworks);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Fout" }, 500);
  }
});

export default museumRoute;
