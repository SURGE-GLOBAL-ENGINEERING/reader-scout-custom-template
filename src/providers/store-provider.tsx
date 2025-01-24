import { type ReactNode } from "react";
// import { useStore } from "@/store";

export function StoreProvider({ children }: { children: ReactNode }) {
  // Initialize store here if needed
  return <>{children}</>;
}
