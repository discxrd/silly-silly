import Button from "../ui/button";
import { useForm } from "react-hook-form";
import FileInput from "../ui/file-input";
import Input from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { postAnimalSchema, type PostAnimalSchema } from "./schema";
import Label from "../ui/label";

export const PostAnimalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postAnimalSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: PostAnimalSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    console.debug("hi");
  };

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col space-y-2 w-[400px]"
      >
        <div>
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <Label>Name is required</Label>}
        </div>
        <div>
          <FileInput {...register("image")} />
          {errors.image && <Label>Image is required</Label>}
        </div>
        <Button type="submit">Post</Button>
      </form>
    </>
  );
};
