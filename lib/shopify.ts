/**
 * Shopify Automation Module for HOTMESS business suite
 * Handles SKU management, product bundles, age-gate compliance, and inventory sync
 */

interface ShopifyConfig {
  storeDomain: string;
  accessToken: string;
  webhookSecret: string;
  apiVersion: string;
}

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  handle: string;
  status: 'active' | 'archived' | 'draft';
  tags: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
  metafields?: ShopifyMetafield[];
  created_at: string;
  updated_at: string;
}

interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: 'deny' | 'continue';
  compare_at_price?: string;
  fulfillment_service: string;
  inventory_management: string;
  option1?: string;
  option2?: string;
  option3?: string;
  taxable: boolean;
  barcode?: string;
  grams: number;
  image_id?: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
}

interface ShopifyImage {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt?: string;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

interface ShopifyOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

interface ShopifyMetafield {
  id: number;
  namespace: string;
  key: string;
  value: string;
  description?: string;
  owner_id: number;
  owner_resource: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface ProductBundle {
  id: string;
  name: string;
  description: string;
  bundlePrice: number;
  savings: number;
  products: Array<{
    productId: number;
    variantId: number;
    quantity: number;
    price: number;
  }>;
  isActive: boolean;
  validFrom: Date;
  validTo?: Date;
  maxUses?: number;
  currentUses: number;
  tags: string[];
  ageRestricted: boolean;
  discountCode?: string;
}

interface InventorySync {
  id: string;
  productId: number;
  variantId: number;
  sku: string;
  currentStock: number;
  targetStock: number;
  reorderPoint: number;
  lastSync: Date;
  syncStatus: 'success' | 'error' | 'pending';
  errors?: string[];
}

interface AgeVerification {
  enabled: boolean;
  minimumAge: number;
  countries: string[];
  verificationMethods: Array<'birthday' | 'id_upload' | 'third_party'>;
  gracePeriod: number; // hours
  blockDuration: number; // hours for blocked users
}

export class ShopifyAutomation {
  private config: ShopifyConfig;
  private apiUrl: string;

  constructor(config: ShopifyConfig) {
    this.config = config;
    this.apiUrl = `https://${config.storeDomain}/admin/api/${config.apiVersion}`;
  }

  /**
   * Make authenticated request to Shopify API
   */
  private async shopifyRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.apiUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Shopify-Access-Token': this.config.accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Shopify API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Get all products with pagination
   */
  async getAllProducts(limit: number = 250): Promise<ShopifyProduct[]> {
    const products: ShopifyProduct[] = [];
    let pageInfo = null;

    do {
      const params = new URLSearchParams({
        limit: limit.toString(),
        fields: 'id,title,handle,status,tags,variants,images,created_at,updated_at',
      });

      if (pageInfo) {
        params.set('page_info', pageInfo);
      }

      const response = await this.shopifyRequest(`/products.json?${params.toString()}`);
      products.push(...response.products);

      // Get next page info from Link header
      const linkHeader = response.headers?.get?.('Link');
      pageInfo = this.extractPageInfo(linkHeader, 'next');
    } while (pageInfo);

    return products;
  }

  /**
   * Get product by ID
   */
  async getProduct(productId: number): Promise<ShopifyProduct> {
    const response = await this.shopifyRequest(`/products/${productId}.json`);
    return response.product;
  }

  /**
   * Create new product
   */
  async createProduct(productData: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
    const response = await this.shopifyRequest('/products.json', {
      method: 'POST',
      body: JSON.stringify({ product: productData }),
    });
    return response.product;
  }

  /**
   * Update existing product
   */
  async updateProduct(productId: number, updates: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
    const response = await this.shopifyRequest(`/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ product: updates }),
    });
    return response.product;
  }

  /**
   * Generate SKU based on HOTMESS naming convention
   */
  generateSKU(product: {
    category: 'RAW' | 'HUNG' | 'HIGH' | 'SUPER';
    type: string;
    color?: string;
    size?: string;
    variant?: string;
  }): string {
    const categoryCode = product.category.substring(0, 3).toUpperCase();
    const typeCode = product.type.substring(0, 3).toUpperCase();
    const colorCode = product.color ? product.color.substring(0, 2).toUpperCase() : '';
    const sizeCode = product.size || '';
    const variantCode = product.variant ? product.variant.substring(0, 2).toUpperCase() : '';
    
    const timestamp = Date.now().toString().slice(-6);
    
    return `HM-${categoryCode}-${typeCode}-${colorCode}${sizeCode}${variantCode}-${timestamp}`;
  }

  /**
   * Bulk update SKUs for existing products
   */
  async updateProductSKUs(): Promise<{ updated: number; errors: number }> {
    let updated = 0;
    let errors = 0;

    try {
      const products = await this.getAllProducts();

      for (const product of products) {
        try {
          const category = this.extractCategoryFromTags(product.tags);
          if (!category) continue;

          for (const variant of product.variants) {
            if (!variant.sku || variant.sku.startsWith('OLD-')) {
              const newSKU = this.generateSKU({
                category,
                type: product.product_type || 'ITEM',
                color: variant.option1,
                size: variant.option2,
                variant: variant.option3,
              });

              await this.updateVariant(variant.id, { sku: newSKU });
              updated++;
            }
          }
        } catch (error) {
          console.error(`Failed to update SKU for product ${product.id}:`, error);
          errors++;
        }
      }
    } catch (error) {
      console.error('Failed to bulk update SKUs:', error);
      throw error;
    }

    return { updated, errors };
  }

  /**
   * Create product bundle
   */
  async createBundle(bundleData: Omit<ProductBundle, 'id' | 'currentUses'>): Promise<ProductBundle> {
    try {
      // Calculate total regular price
      let totalRegularPrice = 0;
      const bundleProducts = [];

      for (const item of bundleData.products) {
        const variant = await this.getVariant(item.variantId);
        totalRegularPrice += parseFloat(variant.price) * item.quantity;
        bundleProducts.push({
          ...item,
          title: variant.title,
          price: parseFloat(variant.price),
        });
      }

      const savings = totalRegularPrice - bundleData.bundlePrice;

      // Create Shopify product for the bundle
      const bundleProduct = await this.createProduct({
        title: bundleData.name,
        body_html: this.generateBundleDescription(bundleData, bundleProducts, savings),
        product_type: 'Bundle',
        vendor: 'HOTMESS',
        tags: [
          'bundle',
          ...bundleData.tags,
          ...(bundleData.ageRestricted ? ['age-restricted'] : []),
        ].join(','),
        status: bundleData.isActive ? 'active' : 'draft',
        variants: [{
          title: 'Default Bundle',
          price: bundleData.bundlePrice.toString(),
          sku: this.generateSKU({
            category: 'BUNDLE' as any,
            type: 'MIX',
          }),
          inventory_policy: 'deny',
          inventory_management: 'shopify',
          requires_shipping: true,
        }],
      });

      // Store bundle metadata
      await this.createMetafield(bundleProduct.id, 'bundle', 'products', JSON.stringify(bundleData.products));
      await this.createMetafield(bundleProduct.id, 'bundle', 'savings', savings.toString());
      await this.createMetafield(bundleProduct.id, 'bundle', 'valid_from', bundleData.validFrom.toISOString());
      
      if (bundleData.validTo) {
        await this.createMetafield(bundleProduct.id, 'bundle', 'valid_to', bundleData.validTo.toISOString());
      }

      const bundle: ProductBundle = {
        id: `bundle_${bundleProduct.id}`,
        name: bundleData.name,
        description: bundleData.description,
        bundlePrice: bundleData.bundlePrice,
        savings,
        products: bundleData.products,
        isActive: bundleData.isActive,
        validFrom: bundleData.validFrom,
        validTo: bundleData.validTo,
        maxUses: bundleData.maxUses,
        currentUses: 0,
        tags: bundleData.tags,
        ageRestricted: bundleData.ageRestricted,
      };

      // Store in database
      await this.storeBundle(bundle);

      return bundle;
    } catch (error) {
      console.error('Failed to create bundle:', error);
      throw error;
    }
  }

  /**
   * Sync inventory levels
   */
  async syncInventory(): Promise<{ synced: number; errors: number }> {
    let synced = 0;
    let errors = 0;

    try {
      const products = await this.getAllProducts();

      for (const product of products) {
        for (const variant of product.variants) {
          try {
            // Get current inventory level
            const inventoryItem = await this.getInventoryItem(variant.inventory_item_id);
            
            // Check if reorder is needed
            if (inventoryItem.available <= this.getReorderPoint(variant.sku)) {
              await this.triggerReorder(variant);
            }

            // Update local inventory tracking
            await this.updateInventorySync({
              id: `sync_${variant.id}`,
              productId: product.id,
              variantId: variant.id,
              sku: variant.sku,
              currentStock: inventoryItem.available,
              targetStock: this.getTargetStock(variant.sku),
              reorderPoint: this.getReorderPoint(variant.sku),
              lastSync: new Date(),
              syncStatus: 'success',
            });

            synced++;
          } catch (error) {
            console.error(`Failed to sync inventory for variant ${variant.id}:`, error);
            errors++;
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync inventory:', error);
      throw error;
    }

    return { synced, errors };
  }

  /**
   * Implement age verification
   */
  async implementAgeGate(config: AgeVerification): Promise<void> {
    try {
      // Update store metafields with age verification config
      await this.createStoreMetafield('age_verification', 'config', JSON.stringify(config));
      
      // Add age verification tags to restricted products
      const products = await this.getAllProducts();
      
      for (const product of products) {
        const isAgeRestricted = this.isProductAgeRestricted(product);
        
        if (isAgeRestricted && !product.tags.includes('age-restricted')) {
          const newTags = product.tags + ',age-restricted';
          await this.updateProduct(product.id, { tags: newTags });
        }
      }

      // Create age verification page if it doesn't exist
      await this.createAgeVerificationPage(config);
      
    } catch (error) {
      console.error('Failed to implement age gate:', error);
      throw error;
    }
  }

  /**
   * Webhook handlers
   */
  async handleOrderCreated(orderData: any): Promise<void> {
    try {
      // Check for bundle items and process accordingly
      for (const lineItem of orderData.line_items) {
        if (lineItem.product_type === 'Bundle') {
          await this.processBundleOrder(lineItem, orderData);
        }
      }

      // Update inventory levels
      await this.updateInventoryFromOrder(orderData);

      // Trigger affiliate tracking if referral exists
      if (orderData.referring_site || orderData.source_name) {
        await this.processAffiliateConversion(orderData);
      }

    } catch (error) {
      console.error('Failed to handle order created webhook:', error);
    }
  }

  async handleInventoryUpdate(inventoryData: any): Promise<void> {
    try {
      // Update local inventory tracking
      await this.updateInventorySync({
        id: `sync_${inventoryData.inventory_item_id}`,
        productId: inventoryData.product_id,
        variantId: inventoryData.variant_id,
        sku: inventoryData.sku,
        currentStock: inventoryData.available,
        targetStock: this.getTargetStock(inventoryData.sku),
        reorderPoint: this.getReorderPoint(inventoryData.sku),
        lastSync: new Date(),
        syncStatus: 'success',
      });

      // Check for low stock alerts
      if (inventoryData.available <= this.getReorderPoint(inventoryData.sku)) {
        await this.sendLowStockAlert(inventoryData);
      }

    } catch (error) {
      console.error('Failed to handle inventory update webhook:', error);
    }
  }

  /**
   * Private helper methods
   */
  private extractPageInfo(linkHeader: string | null, rel: 'next' | 'previous'): string | null {
    if (!linkHeader) return null;
    
    const links = linkHeader.split(',');
    for (const link of links) {
      if (link.includes(`rel="${rel}"`)) {
        const match = link.match(/<[^>]*[?&]page_info=([^&>]*)/);
        return match ? match[1] : null;
      }
    }
    
    return null;
  }

  private extractCategoryFromTags(tags: string): 'RAW' | 'HUNG' | 'HIGH' | 'SUPER' | null {
    const tagArray = tags.toLowerCase().split(',').map(tag => tag.trim());
    
    if (tagArray.includes('raw')) return 'RAW';
    if (tagArray.includes('hung')) return 'HUNG';
    if (tagArray.includes('high')) return 'HIGH';
    if (tagArray.includes('super')) return 'SUPER';
    
    return null;
  }

  private generateBundleDescription(
    bundleData: Omit<ProductBundle, 'id' | 'currentUses'>,
    products: any[],
    savings: number
  ): string {
    let description = `<div class="hotmess-bundle">`;
    description += `<h3>🔥 ${bundleData.name} Bundle</h3>`;
    description += `<p>${bundleData.description}</p>`;
    description += `<div class="bundle-savings">💰 Save £${savings.toFixed(2)}!</div>`;
    description += `<div class="bundle-products">`;
    description += `<h4>What's included:</h4><ul>`;
    
    for (const product of products) {
      description += `<li>${product.quantity}x ${product.title} (£${product.price.toFixed(2)} each)</li>`;
    }
    
    description += `</ul></div>`;
    
    if (bundleData.ageRestricted) {
      description += `<div class="age-warning">⚠️ This bundle contains age-restricted items. You must be 18+ to purchase.</div>`;
    }
    
    description += `</div>`;
    
    return description;
  }

  private async getVariant(variantId: number): Promise<ShopifyVariant> {
    const response = await this.shopifyRequest(`/variants/${variantId}.json`);
    return response.variant;
  }

  private async updateVariant(variantId: number, updates: Partial<ShopifyVariant>): Promise<ShopifyVariant> {
    const response = await this.shopifyRequest(`/variants/${variantId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ variant: updates }),
    });
    return response.variant;
  }

  private async createMetafield(ownerId: number, namespace: string, key: string, value: string): Promise<void> {
    await this.shopifyRequest('/metafields.json', {
      method: 'POST',
      body: JSON.stringify({
        metafield: {
          namespace,
          key,
          value,
          owner_id: ownerId,
          owner_resource: 'product',
          type: 'single_line_text_field',
        },
      }),
    });
  }

  private async createStoreMetafield(namespace: string, key: string, value: string): Promise<void> {
    await this.shopifyRequest('/metafields.json', {
      method: 'POST',
      body: JSON.stringify({
        metafield: {
          namespace,
          key,
          value,
          owner_resource: 'shop',
          type: 'single_line_text_field',
        },
      }),
    });
  }

  private async getInventoryItem(inventoryItemId: number): Promise<any> {
    const response = await this.shopifyRequest(`/inventory_items/${inventoryItemId}.json`);
    return response.inventory_item;
  }

  private isProductAgeRestricted(product: ShopifyProduct): boolean {
    const restrictedKeywords = ['adult', '18+', 'mature', 'explicit'];
    const productText = `${product.title} ${product.body_html} ${product.tags}`.toLowerCase();
    
    return restrictedKeywords.some(keyword => productText.includes(keyword));
  }

  private async createAgeVerificationPage(config: AgeVerification): Promise<void> {
    // Implementation would create a Shopify page for age verification
    console.log('Creating age verification page with config:', config);
  }

  private getReorderPoint(sku: string): number {
    // Implementation would get reorder point from configuration
    return 10; // Default reorder point
  }

  private getTargetStock(sku: string): number {
    // Implementation would get target stock from configuration
    return 50; // Default target stock
  }

  private async triggerReorder(variant: ShopifyVariant): Promise<void> {
    // Implementation would trigger reorder process
    console.log('Triggering reorder for variant:', variant.sku);
  }

  private async processBundleOrder(lineItem: any, orderData: any): Promise<void> {
    // Implementation would process bundle order
    console.log('Processing bundle order:', lineItem.product_id);
  }

  private async updateInventoryFromOrder(orderData: any): Promise<void> {
    // Implementation would update inventory levels
    console.log('Updating inventory from order:', orderData.id);
  }

  private async processAffiliateConversion(orderData: any): Promise<void> {
    // Implementation would process affiliate conversion
    console.log('Processing affiliate conversion for order:', orderData.id);
  }

  private async sendLowStockAlert(inventoryData: any): Promise<void> {
    // Implementation would send low stock alert
    console.log('Sending low stock alert for:', inventoryData.sku);
  }

  /**
   * Database operations (placeholder implementations)
   */
  private async storeBundle(bundle: ProductBundle): Promise<void> {
    // Implementation would store bundle in database
    console.log('Storing bundle:', bundle.id);
  }

  private async updateInventorySync(sync: InventorySync): Promise<void> {
    // Implementation would update inventory sync in database
    console.log('Updating inventory sync:', sync.id);
  }
}

// Initialize Shopify automation
export const shopifyAutomation = new ShopifyAutomation({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET!,
  apiVersion: '2023-10',
});

/**
 * Utility functions for Shopify integration
 */
export const ShopifyUtils = {
  /**
   * Verify webhook signature
   */
  verifyWebhook(body: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(body, 'utf8');
    const hash = hmac.digest('base64');
    
    return hash === signature;
  },

  /**
   * Format price for display
   */
  formatPrice(price: string | number, currency: string = 'GBP'): string {
    const amount = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  /**
   * Generate product URL
   */
  generateProductUrl(handle: string, variantId?: number): string {
    const baseUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${handle}`;
    return variantId ? `${baseUrl}?variant=${variantId}` : baseUrl;
  },

  /**
   * Parse Shopify webhook headers
   */
  parseWebhookHeaders(headers: Record<string, string>): {
    topic: string;
    shopDomain: string;
    signature: string;
  } {
    return {
      topic: headers['x-shopify-topic'] || '',
      shopDomain: headers['x-shopify-shop-domain'] || '',
      signature: headers['x-shopify-hmac-sha256'] || '',
    };
  },
};