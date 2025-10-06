import { createClient } from '@sanity/client';

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('Missing SANITY_PROJECT_ID environment variable');
}

if (!process.env.SANITY_DATASET) {
  throw new Error('Missing SANITY_DATASET environment variable');
}

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
});

// Query helpers
export const queries = {
  products: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    description,
    image,
    category,
    inStock
  }`,
  
  productBySlug: (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    price,
    description,
    image,
    category,
    inStock
  }`,
  
  pages: `*[_type == "page"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    content
  }`,
  
  pageBySlug: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    content
  }`
};