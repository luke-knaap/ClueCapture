import { PicsumService } from "@server/services/PicsumService";
import type { Context } from "hono";

export class PicsumController {
  private picsumService: PicsumService;

  constructor() {
    this.picsumService = new PicsumService();
  }

  public async getPics(c: Context) {
    try {
      const pics = await this.picsumService.getPicsumPNGs();
      return c.json(pics!);
    } catch (error) {
      console.error(error);
    }
  }
}
