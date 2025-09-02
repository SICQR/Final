import { ReactNode } from "react";

export default function MembersLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </main>
  );
}
