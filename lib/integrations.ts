/**
 * Integration Hub for HOTMESS business suite
 * Handles Google Sheets integration, Make.com webhooks, and data synchronization
 */

interface GoogleSheetsConfig {
  spreadsheetId: string;
  serviceAccountEmail: string;
  privateKey: string;
  clientEmail: string;
}

interface SheetData {
  range: string;
  values: any[][];
  majorDimension: 'ROWS' | 'COLUMNS';
}

interface MakeWebhookConfig {
  webhookUrl: string;
  secretKey?: string;
  scenarios: {
    [key: string]: {
      enabled: boolean;
      triggers: string[];
      filters?: any;
    };
  };
}

interface DataSyncJob {
  id: string;
  name: string;
  type: 'sheets' | 'make' | 'api';
  source: string;
  destination: string;
  schedule: string; // cron expression
  lastRun?: Date;
  nextRun?: Date;
  status: 'active' | 'paused' | 'error';
  config: any;
  mapping: DataMapping;
}

interface DataMapping {
  fields: Array<{
    source: string;
    destination: string;
    transform?: 'uppercase' | 'lowercase' | 'currency' | 'date' | 'phone' | 'email';
    defaultValue?: any;
    required?: boolean;
  }>;
  filters?: Array<{
    field: string;
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'not_empty';
    value: any;
  }>;
}

export class GoogleSheetsIntegration {
  private config: GoogleSheetsConfig;
  private auth: any;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      // Initialize Google Sheets API authentication
      // This would use google-auth-library in a real implementation
      this.auth = {
        client_email: this.config.clientEmail,
        private_key: this.config.privateKey.replace(/\\n/g, '\n'),
      };
    } catch (error) {
      console.error('Failed to initialize Google Sheets auth:', error);
      throw error;
    }
  }

  /**
   * Read data from Google Sheets
   */
  async readSheet(
    spreadsheetId: string,
    range: string
  ): Promise<SheetData> {
    try {
      // Make request to Google Sheets API
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
        {
          headers: {
            Authorization: `Bearer ${await this.getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        range: data.range,
        values: data.values || [],
        majorDimension: data.majorDimension || 'ROWS',
      };
    } catch (error) {
      console.error('Failed to read from Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Write data to Google Sheets
   */
  async writeSheet(
    spreadsheetId: string,
    range: string,
    values: any[][],
    valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED'
  ): Promise<void> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=${valueInputOption}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${await this.getAccessToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
            majorDimension: 'ROWS',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to write to Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Append data to Google Sheets
   */
  async appendSheet(
    spreadsheetId: string,
    range: string,
    values: any[][],
    valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED'
  ): Promise<void> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=${valueInputOption}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await this.getAccessToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
            majorDimension: 'ROWS',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to append to Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Sync affiliate data to Google Sheets
   */
  async syncAffiliateData(): Promise<void> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_AFFILIATE_ID!;
      
      // Get affiliate data
      const affiliates = await this.getAffiliateData();
      
      // Convert to sheet format
      const headers = [
        'Affiliate Code',
        'Name',
        'Email',
        'Telegram ID',
        'Status',
        'Tier',
        'Commission Rate',
        'Total Clicks',
        'Total Conversions',
        'Conversion Rate',
        'Total Earnings',
        'Pending Payout',
        'Total Paid',
        'Join Date',
        'Last Active',
      ];

      const rows = affiliates.map(affiliate => [
        affiliate.affiliateCode,
        affiliate.name,
        affiliate.email,
        affiliate.telegramId?.toString() || '',
        affiliate.status,
        affiliate.tier,
        `${affiliate.commissionRate}%`,
        affiliate.stats.totalClicks,
        affiliate.stats.totalConversions,
        `${affiliate.stats.conversionRate.toFixed(1)}%`,
        `£${affiliate.stats.totalEarnings.toFixed(2)}`,
        `£${affiliate.stats.pendingEarnings.toFixed(2)}`,
        `£${affiliate.stats.paidEarnings.toFixed(2)}`,
        affiliate.joinDate.toLocaleDateString(),
        affiliate.lastActive.toLocaleDateString(),
      ]);

      // Write to sheet
      await this.writeSheet(spreadsheetId, 'Affiliates!A1:O' + (rows.length + 1), [headers, ...rows]);
      
      console.log(`Synced ${affiliates.length} affiliates to Google Sheets`);
    } catch (error) {
      console.error('Failed to sync affiliate data:', error);
      throw error;
    }
  }

  /**
   * Sync sales data to Google Sheets
   */
  async syncSalesData(startDate: Date, endDate: Date): Promise<void> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_SALES_ID!;
      
      // Get sales data
      const sales = await this.getSalesData(startDate, endDate);
      
      // Convert to sheet format
      const headers = [
        'Date',
        'Order ID',
        'Customer Email',
        'Customer Name',
        'Product Names',
        'Total Amount',
        'Payment Status',
        'Affiliate Code',
        'Commission Amount',
        'UTM Source',
        'UTM Campaign',
        'UTM Medium',
      ];

      const rows = sales.map(sale => [
        sale.date.toLocaleDateString(),
        sale.orderId,
        sale.customerEmail,
        sale.customerName,
        sale.products.join(', '),
        `£${sale.totalAmount.toFixed(2)}`,
        sale.paymentStatus,
        sale.affiliateCode || '',
        sale.commissionAmount ? `£${sale.commissionAmount.toFixed(2)}` : '',
        sale.utmSource || '',
        sale.utmCampaign || '',
        sale.utmMedium || '',
      ]);

      // Append to sheet (don't overwrite existing data)
      if (rows.length > 0) {
        await this.appendSheet(spreadsheetId, 'Sales!A:L', rows);
        console.log(`Added ${rows.length} sales records to Google Sheets`);
      }
    } catch (error) {
      console.error('Failed to sync sales data:', error);
      throw error;
    }
  }

  /**
   * Sync inventory data to Google Sheets
   */
  async syncInventoryData(): Promise<void> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_INVENTORY_ID!;
      
      // Get inventory data
      const inventory = await this.getInventoryData();
      
      // Convert to sheet format
      const headers = [
        'SKU',
        'Product Name',
        'Variant',
        'Current Stock',
        'Reserved Stock',
        'Available Stock',
        'Reorder Point',
        'Target Stock',
        'Cost Price',
        'Retail Price',
        'Last Updated',
      ];

      const rows = inventory.map(item => [
        item.sku,
        item.productName,
        item.variant,
        item.currentStock,
        item.reservedStock,
        item.availableStock,
        item.reorderPoint,
        item.targetStock,
        `£${item.costPrice.toFixed(2)}`,
        `£${item.retailPrice.toFixed(2)}`,
        item.lastUpdated.toISOString(),
      ]);

      // Write to sheet
      await this.writeSheet(spreadsheetId, 'Inventory!A1:K' + (rows.length + 1), [headers, ...rows]);
      
      console.log(`Synced ${inventory.length} inventory items to Google Sheets`);
    } catch (error) {
      console.error('Failed to sync inventory data:', error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    // Implementation would use Google Auth to get access token
    // This is a placeholder
    return 'ACCESS_TOKEN_PLACEHOLDER';
  }

  private async getAffiliateData(): Promise<any[]> {
    // Implementation would fetch affiliate data from database
    return [];
  }

  private async getSalesData(startDate: Date, endDate: Date): Promise<any[]> {
    // Implementation would fetch sales data from database
    return [];
  }

  private async getInventoryData(): Promise<any[]> {
    // Implementation would fetch inventory data from database
    return [];
  }
}

export class MakeIntegration {
  private config: MakeWebhookConfig;

  constructor(config: MakeWebhookConfig) {
    this.config = config;
  }

  /**
   * Send data to Make.com scenario via webhook
   */
  async sendWebhook(
    scenarioName: string,
    data: any,
    options?: {
      timeout?: number;
      retries?: number;
    }
  ): Promise<{ success: boolean; response?: any; error?: string }> {
    try {
      const scenario = this.config.scenarios[scenarioName];
      
      if (!scenario || !scenario.enabled) {
        return {
          success: false,
          error: `Scenario '${scenarioName}' is not enabled or not found`,
        };
      }

      const payload = {
        scenario: scenarioName,
        timestamp: new Date().toISOString(),
        data,
      };

      // Add signature if secret key is configured
      if (this.config.secretKey) {
        const crypto = require('crypto');
        const signature = crypto
          .createHmac('sha256', this.config.secretKey)
          .update(JSON.stringify(payload))
          .digest('hex');
        
        (payload as any).signature = signature;
      }

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout((options?.timeout || 30) * 1000),
      });

      if (!response.ok) {
        throw new Error(`Make.com webhook error: ${response.statusText}`);
      }

      const responseData = await response.json();

      return {
        success: true,
        response: responseData,
      };
    } catch (error) {
      console.error(`Failed to send webhook to Make.com scenario '${scenarioName}':`, error);
      
      // Retry logic
      if (options?.retries && options.retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.sendWebhook(scenarioName, data, {
          ...options,
          retries: options.retries - 1,
        });
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send new user registration to Make.com
   */
  async sendUserRegistration(userData: {
    email: string;
    name: string;
    provider: string;
    timestamp: Date;
    affiliateCode?: string;
    utmParams?: any;
  }): Promise<void> {
    await this.sendWebhook('user_registration', userData, { retries: 2 });
  }

  /**
   * Send order data to Make.com
   */
  async sendOrderData(orderData: {
    orderId: string;
    customerEmail: string;
    totalAmount: number;
    products: any[];
    affiliateCode?: string;
    timestamp: Date;
  }): Promise<void> {
    await this.sendWebhook('new_order', orderData, { retries: 2 });
  }

  /**
   * Send affiliate conversion to Make.com
   */
  async sendAffiliateConversion(conversionData: {
    affiliateCode: string;
    orderId: string;
    commissionAmount: number;
    timestamp: Date;
  }): Promise<void> {
    await this.sendWebhook('affiliate_conversion', conversionData, { retries: 2 });
  }

  /**
   * Send inventory alert to Make.com
   */
  async sendInventoryAlert(alertData: {
    sku: string;
    productName: string;
    currentStock: number;
    reorderPoint: number;
    alertType: 'low_stock' | 'out_of_stock';
    timestamp: Date;
  }): Promise<void> {
    await this.sendWebhook('inventory_alert', alertData, { retries: 2 });
  }
}

export class DataSyncManager {
  private googleSheets: GoogleSheetsIntegration;
  private makeIntegration: MakeIntegration;
  private syncJobs: Map<string, DataSyncJob> = new Map();

  constructor(
    googleSheetsConfig: GoogleSheetsConfig,
    makeConfig: MakeWebhookConfig
  ) {
    this.googleSheets = new GoogleSheetsIntegration(googleSheetsConfig);
    this.makeIntegration = new MakeIntegration(makeConfig);
    this.initializeSyncJobs();
  }

  /**
   * Initialize sync jobs
   */
  private initializeSyncJobs(): void {
    // Daily affiliate sync to Google Sheets
    this.addSyncJob({
      id: 'daily-affiliate-sync',
      name: 'Daily Affiliate Data Sync',
      type: 'sheets',
      source: 'database',
      destination: 'google_sheets',
      schedule: '0 2 * * *', // Daily at 2 AM
      status: 'active',
      config: {
        spreadsheetId: process.env.GOOGLE_SHEETS_AFFILIATE_ID,
        range: 'Affiliates!A:O',
      },
      mapping: {
        fields: [
          { source: 'affiliateCode', destination: 'A' },
          { source: 'name', destination: 'B' },
          { source: 'email', destination: 'C' },
          // ... other mappings
        ],
      },
    });

    // Hourly sales sync to Google Sheets
    this.addSyncJob({
      id: 'hourly-sales-sync',
      name: 'Hourly Sales Data Sync',
      type: 'sheets',
      source: 'database',
      destination: 'google_sheets',
      schedule: '0 * * * *', // Every hour
      status: 'active',
      config: {
        spreadsheetId: process.env.GOOGLE_SHEETS_SALES_ID,
        range: 'Sales!A:L',
        append: true,
      },
      mapping: {
        fields: [
          { source: 'date', destination: 'A', transform: 'date' },
          { source: 'orderId', destination: 'B' },
          { source: 'customerEmail', destination: 'C' },
          // ... other mappings
        ],
      },
    });

    // Real-time order sync to Make.com
    this.addSyncJob({
      id: 'realtime-order-sync',
      name: 'Real-time Order Sync to Make.com',
      type: 'make',
      source: 'database',
      destination: 'make_webhook',
      schedule: 'immediate',
      status: 'active',
      config: {
        scenario: 'new_order',
        triggers: ['order.created', 'order.updated'],
      },
      mapping: {
        fields: [
          { source: 'id', destination: 'orderId' },
          { source: 'customer_email', destination: 'customerEmail' },
          { source: 'total_price', destination: 'totalAmount', transform: 'currency' },
          // ... other mappings
        ],
      },
    });
  }

  /**
   * Add sync job
   */
  addSyncJob(job: DataSyncJob): void {
    this.syncJobs.set(job.id, job);
  }

  /**
   * Run sync job
   */
  async runSyncJob(jobId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const job = this.syncJobs.get(jobId);
      
      if (!job) {
        return { success: false, error: 'Job not found' };
      }

      if (job.status !== 'active') {
        return { success: false, error: 'Job is not active' };
      }

      console.log(`Running sync job: ${job.name}`);
      
      switch (job.type) {
        case 'sheets':
          await this.runGoogleSheetsSync(job);
          break;
        case 'make':
          await this.runMakeSync(job);
          break;
        default:
          throw new Error(`Unsupported sync type: ${job.type}`);
      }

      // Update job status
      job.lastRun = new Date();
      job.nextRun = this.calculateNextRun(job.schedule);
      
      return { success: true };
    } catch (error) {
      console.error(`Sync job '${jobId}' failed:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Run all scheduled sync jobs
   */
  async runScheduledJobs(): Promise<void> {
    const now = new Date();
    
    for (const [jobId, job] of this.syncJobs) {
      if (job.status === 'active' && job.nextRun && job.nextRun <= now) {
        await this.runSyncJob(jobId);
      }
    }
  }

  /**
   * Get sync job status
   */
  getSyncJobStatus(jobId: string): DataSyncJob | null {
    return this.syncJobs.get(jobId) || null;
  }

  /**
   * List all sync jobs
   */
  getAllSyncJobs(): DataSyncJob[] {
    return Array.from(this.syncJobs.values());
  }

  private async runGoogleSheetsSync(job: DataSyncJob): Promise<void> {
    // Implementation would run Google Sheets sync based on job config
    switch (job.id) {
      case 'daily-affiliate-sync':
        await this.googleSheets.syncAffiliateData();
        break;
      case 'hourly-sales-sync':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        await this.googleSheets.syncSalesData(yesterday, new Date());
        break;
      default:
        console.log(`No specific handler for job: ${job.id}`);
    }
  }

  private async runMakeSync(job: DataSyncJob): Promise<void> {
    // Implementation would run Make.com sync based on job config
    console.log(`Running Make.com sync for job: ${job.id}`);
  }

  private calculateNextRun(schedule: string): Date {
    // Implementation would parse cron expression and calculate next run time
    // For now, return 1 hour from now
    const nextRun = new Date();
    nextRun.setHours(nextRun.getHours() + 1);
    return nextRun;
  }
}

// Initialize integrations
export const googleSheetsIntegration = new GoogleSheetsIntegration({
  spreadsheetId: process.env.GOOGLE_SHEETS_MAIN_ID!,
  serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  privateKey: process.env.GOOGLE_PRIVATE_KEY!,
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
});

export const makeIntegration = new MakeIntegration({
  webhookUrl: process.env.MAKE_WEBHOOK_URL!,
  secretKey: process.env.MAKE_SECRET_KEY,
  scenarios: {
    user_registration: {
      enabled: true,
      triggers: ['user.created'],
    },
    new_order: {
      enabled: true,
      triggers: ['order.created'],
    },
    affiliate_conversion: {
      enabled: true,
      triggers: ['conversion.created'],
    },
    inventory_alert: {
      enabled: true,
      triggers: ['inventory.low_stock', 'inventory.out_of_stock'],
    },
  },
});

export const dataSyncManager = new DataSyncManager(
  {
    spreadsheetId: process.env.GOOGLE_SHEETS_MAIN_ID!,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    privateKey: process.env.GOOGLE_PRIVATE_KEY!,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
  },
  {
    webhookUrl: process.env.MAKE_WEBHOOK_URL!,
    secretKey: process.env.MAKE_SECRET_KEY,
    scenarios: {
      user_registration: { enabled: true, triggers: ['user.created'] },
      new_order: { enabled: true, triggers: ['order.created'] },
      affiliate_conversion: { enabled: true, triggers: ['conversion.created'] },
      inventory_alert: { enabled: true, triggers: ['inventory.low_stock'] },
    },
  }
);

/**
 * Utility functions for integrations
 */
export const IntegrationUtils = {
  /**
   * Transform data based on mapping configuration
   */
  transformData(data: any, mapping: DataMapping): any {
    const transformed: any = {};
    
    for (const field of mapping.fields) {
      let value = data[field.source];
      
      if (value === undefined || value === null) {
        value = field.defaultValue;
      }
      
      if (field.required && (value === undefined || value === null)) {
        throw new Error(`Required field '${field.source}' is missing`);
      }
      
      // Apply transformations
      if (value !== undefined && value !== null && field.transform) {
        value = this.applyTransform(value, field.transform);
      }
      
      transformed[field.destination] = value;
    }
    
    return transformed;
  },

  /**
   * Apply data transformation
   */
  applyTransform(value: any, transform: string): any {
    switch (transform) {
      case 'uppercase':
        return String(value).toUpperCase();
      case 'lowercase':
        return String(value).toLowerCase();
      case 'currency':
        return `£${parseFloat(value).toFixed(2)}`;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'phone':
        return String(value).replace(/[^\d+]/g, '');
      case 'email':
        return String(value).toLowerCase().trim();
      default:
        return value;
    }
  },

  /**
   * Validate data against filters
   */
  validateFilters(data: any, filters: DataMapping['filters']): boolean {
    if (!filters) return true;
    
    for (const filter of filters) {
      const value = data[filter.field];
      
      switch (filter.operator) {
        case 'equals':
          if (value !== filter.value) return false;
          break;
        case 'contains':
          if (!String(value).includes(filter.value)) return false;
          break;
        case 'greater':
          if (!(value > filter.value)) return false;
          break;
        case 'less':
          if (!(value < filter.value)) return false;
          break;
        case 'not_empty':
          if (!value || value === '') return false;
          break;
      }
    }
    
    return true;
  },

  /**
   * Format data for Google Sheets
   */
  formatForSheets(data: any[]): any[][] {
    return data.map(row => {
      if (Array.isArray(row)) return row;
      if (typeof row === 'object') return Object.values(row);
      return [row];
    });
  },

  /**
   * Parse cron expression
   */
  parseCron(expression: string): {
    minute: string;
    hour: string;
    day: string;
    month: string;
    weekday: string;
  } {
    const parts = expression.split(' ');
    
    return {
      minute: parts[0] || '*',
      hour: parts[1] || '*',
      day: parts[2] || '*',
      month: parts[3] || '*',
      weekday: parts[4] || '*',
    };
  },
};