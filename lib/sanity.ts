import { createClient } from "next-sanity";
export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2023-11-01"
});
export async function getLookbookSlides() {
  return await sanity.fetch(
    `*[_type == "lookbookSlide"] | order(_createdAt asc){
      "imageUrl": image.asset->url,
      title, subtitle, font, color, overlay, video
    }`
  );
}