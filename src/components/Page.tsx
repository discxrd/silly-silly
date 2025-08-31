import { Outlet } from "react-router-dom";

export function Page() {
  return (
    <div className="w-dvw h-dvh flex overflow-hidden">
      <Outlet />
    </div>
  );
}
