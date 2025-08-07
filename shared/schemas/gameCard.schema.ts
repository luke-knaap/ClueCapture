import { z } from "zod";

export const GameCardItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.url(),
});

export type GameCardItemType = z.infer<typeof GameCardItemSchema>;
