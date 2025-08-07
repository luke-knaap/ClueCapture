import { MuseumService } from "@server/services/MuseumService";
import type { Context } from "hono";

export class MuseumController {
  private museumService: MuseumService;

  constructor() {
    this.museumService = new MuseumService();
  }

  public async getArtworks(c: Context) {
    try {
      const category = c.req.query("category") || "stone";
      const artworks = await this.museumService.getArtwork(16, category);
      return c.json(artworks);
    } catch (error) {
      console.error(error);
    }
  }
}
