"use client";

import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  // Any client-only logic can go here (e.g., theme, context, etc.)
  return <>{children}</>;
}
