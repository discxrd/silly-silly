import z from "zod";

export const postAnimalSchema = z.object({
  name: z.string({ error: "Name is required" }).min(2, { error: "Too short!" }),
  image: z.instanceof(File, { error: "Image is required" }),
});

export type PostAnimalSchema = z.infer<typeof postAnimalSchema>;
