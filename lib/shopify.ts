export async function createDiscountCode(userId: string, amount: number) {
  // Use Shopify Admin API to generate a code (scaffold)
  // For demo, just return a dummy code
  return `XXX9FOR9-${userId.slice(0, 6)}`.toUpperCase();
}