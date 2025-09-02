import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;
  
  async function setConsent() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set("hm_age_consent", "yes", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      path: "/",
      httpOnly: false,
    });
    redirect(resolvedSearchParams.next || "/");
  }

  return (
    <form action={setConsent} className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="max-w-md w-full p-8 rounded-xl border border-white/20 bg-neutral-900 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">18+ Consent Required</h1>
        <p className="mb-6">You must confirm you are 18+ to access this content.</p>
        <button type="submit" className="rounded-lg bg-white px-6 py-3 text-black font-semibold">I am 18+</button>
      </div>
    </form>
  );
}
