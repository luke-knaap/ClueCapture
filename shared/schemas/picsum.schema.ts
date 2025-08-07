import z from "zod";

export const PicsumSchema = z.object({
  id: z.string(),
  author: z.string(),
  download_url: z.url(),
});

export type PicsumType = z.infer<typeof PicsumSchema>;
