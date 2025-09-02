const DOMAIN = process.env.SHOPIFY_DOMAIN!;
const TOKEN  = process.env.SHOPIFY_STOREFRONT_TOKEN!;

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!DOMAIN || !TOKEN) throw new Error("Shopify env missing");
  const res = await fetch(`https://${DOMAIN}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60, tags: ["shopify"] },
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}`);
  return res.json() as any;
}

export async function getLatestProducts(count = 3) {
  const query = /* GraphQL */ `
    query LatestProducts($count: Int!) {
      products(first: $count, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            handle
            title
            availableForSale
            onlineStoreUrl
            featuredImage { url altText width height }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch<{ data: { products: { edges: any[] } } }>(query, { count });
  return (data?.products?.edges || []).map(e => e.node);
}
export async function createDiscountCode(userId: string, amount: number) {
  // Use Shopify Admin API to generate a code (scaffold)
  // For demo, just return a dummy code
  return `XXX9FOR9-${userId.slice(0, 6)}`.toUpperCase();
}