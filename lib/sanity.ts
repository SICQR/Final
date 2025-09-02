import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: true
});

const builder = imageUrlBuilder(sanity);
export function urlFor(src:any) { return builder.image(src); }

export async function getMembersHero() {
  return sanity.fetch(`*[_type=="membersHero"][0]{
    headline, subhead,
    "imgMob": imageMobile,
    "imgDesk": imageDesktop,
    ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref
  }`);
}

export function updateLookbookSlide(slide: any) {
  // TODO: Implement lookbook slide update logic
  return Promise.resolve();
}

export async function getLookbookSlides() {
  return await sanity.fetch(
    `*[_type == "lookbookSlide"] | order(_createdAt asc){
      "imageUrl": image.asset->url,
      title, subtitle, font, color, overlay, video
    }`
  );
}