import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-10",
  useCdn: true,
});

export const urlFor = (source: any) => imageUrlBuilder(sanityClient).image(source);

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}) {
  return sanityClient.fetch<T>(query, params);
}
