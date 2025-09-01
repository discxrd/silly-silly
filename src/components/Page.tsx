import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Page() {
  return (
    <div className="w-dvw h-dvh flex overflow-hidden">
      <Header />
      <img
        src="/img/background.webp"
        className="absolute -z-10 opacity-30 object-cover h-full w-full"
      />
      <Outlet />
    </div>
  );
}
