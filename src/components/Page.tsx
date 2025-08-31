import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Page({ children }: Props) {
  return (
    <div className="w-dvw h-dvh flex overflow-hidden">{children}</div>
  );
}
