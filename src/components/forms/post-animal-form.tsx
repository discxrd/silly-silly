import Button from "../ui/button";
import FileInput from "../ui/file-input";
import Input from "../ui/input";

export const PostAnimalForm = () => {
  return (
    <>
      <form className="p-4 flex flex-col space-y-4 w-[400px]">
        <Input placeholder="Поле 1" />
        <FileInput />
        <Button>privet</Button>
      </form>
    </>
  );
};
