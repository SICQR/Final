import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 min-h-[60vh] text-center">
      <h1 className="font-heading text-6xl text-hotpink mb-4">404</h1>
      <p className="mb-8">Page not found.</p>
      <Link href="/" className="btn bg-hotpink text-white">Back to Home</Link>
    </div>
  );
}