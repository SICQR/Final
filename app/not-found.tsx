import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold mb-4 text-hotpink">
          Lost, daddy?
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          This page ghosted
        </p>
        <Link href="/">
          <Button variant="neon" size="lg">
            Take me home
          </Button>
        </Link>
      </div>
    </div>
  );
}