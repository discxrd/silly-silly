import z from "zod";

export const postAnimalSchema = z.object({
  name: z.string(),
  image: z.instanceof(File),
});

export type PostAnimalSchema = z.infer<typeof postAnimalSchema>;
