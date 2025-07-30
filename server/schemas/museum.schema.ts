import z from "zod";

export const MuseumSchema = z.object({
  objectID: z.number().nullable(),
  title: z.string(),
  primaryImageSmall: z.url().nullable(),
});

export type MuseumType = z.infer<typeof MuseumSchema>;
