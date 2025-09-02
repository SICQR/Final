import { redirect } from "next/navigation";

export default async function Page({ params }: any) {
  redirect(`/api/utm/append?short=${params.short}`);
  return null;
}
