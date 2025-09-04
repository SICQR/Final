import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function getClient(preview = false) {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-10-10",
    useCdn: !preview,
    // read token can be supplied for preview if needed
    token: preview ? process.env.SANITY_READ_TOKEN || undefined : undefined,
  });
}

export const sanityClient = getClient(false);

export const urlFor = (source: any, preview = false) => imageUrlBuilder(getClient(preview)).image(source);

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}) {
  return sanityClient.fetch<T>(query, params);
}

export async function getMembersHero(preview = false) {
  const client = getClient(preview);
  try {
    const doc = await client.fetch(`*[_type == \"membersHero\"] | order(_updatedAt desc)[0]`);
    return doc || null;
  } catch (err) {
    return null;
  }
}
