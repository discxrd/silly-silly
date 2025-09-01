import { PostAnimalForm } from "@/components/forms/post-animal-form";
import Card from "@/components/ui/card";

const PostAnimalPage = () => {
  return (
    <div className="flex justify-center w-full items-center">
      <Card>
        <PostAnimalForm />
      </Card>
    </div>
  );
};

export default PostAnimalPage;
