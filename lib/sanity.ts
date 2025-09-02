import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true
});

const builder = imageUrlBuilder(sanity);
export function urlFor(src:any) { return builder.image(src); }

export async function getMembersHero() {
  try {
    if (projectId === 'placeholder') {
      return {
        headline: "Welcome to HOTMESS",
        subhead: "Configure Sanity to see real content",
        ctaPrimaryLabel: "Join",
        ctaPrimaryHref: "/members",
        ctaSecondaryLabel: "Listen",
        ctaSecondaryHref: "/radio"
      };
    }
    return sanity.fetch(`*[_type=="membersHero"][0]{
      headline, subhead,
      "imgMob": imageMobile,
      "imgDesk": imageDesktop,
      ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref
    }`);
  } catch (error) {
    console.warn("Sanity fetch error:", error);
    return null;
  }
}

export function updateLookbookSlide(slide: any) {
  // TODO: Implement lookbook slide update logic
  return Promise.resolve();
}

export async function getLookbookSlides() {
  try {
    if (projectId === 'placeholder') {
      return [];
    }
    return await sanity.fetch(
      `*[_type == "lookbookSlide"] | order(_createdAt asc){
        "imageUrl": image.asset->url,
        title, subtitle, font, color, overlay, video
      }`
    );
  } catch (error) {
    console.warn("Sanity fetch error:", error);
    return [];
  }
}