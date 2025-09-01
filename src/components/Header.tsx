import { routes } from "@/services/navigation";
import Button from "./ui/button";
import Label from "./ui/label";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0">
      <div className="border-2 p-2 flex justify-between w-dvw">
        <Label>Cats</Label>
        <div>
          {routes.map((route) => (
            <Button onClick={() => navigate(route.path)} key={route.path}>
              {route.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
