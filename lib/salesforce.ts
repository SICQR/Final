/**
 * Salesforce CRM Integration for HOTMESS business suite
 * Handles customer data sync, lead management, and sales automation
 */

interface SalesforceConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  securityToken: string;
  instanceUrl: string;
  apiVersion: string;
}

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

interface Lead {
  Id?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone?: string;
  Company: string;
  Status: 'Open - Not Contacted' | 'Working - Contacted' | 'Closed - Converted' | 'Closed - Not Converted';
  LeadSource: string;
  Description?: string;
  HOTMESS_Affiliate_Code__c?: string;
  HOTMESS_UTM_Source__c?: string;
  HOTMESS_UTM_Campaign__c?: string;
  HOTMESS_Signup_Date__c?: string;
}

interface Contact {
  Id?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone?: string;
  AccountId?: string;
  HOTMESS_Customer_Type__c?: 'Individual' | 'Business' | 'Affiliate';
  HOTMESS_Total_Orders__c?: number;
  HOTMESS_Total_Spent__c?: number;
  HOTMESS_Last_Order_Date__c?: string;
}

interface Opportunity {
  Id?: string;
  Name: string;
  AccountId?: string;
  ContactId?: string;
  Amount: number;
  CloseDate: string;
  StageName: 'Prospecting' | 'Qualification' | 'Needs Analysis' | 'Value Proposition' | 'Closed Won' | 'Closed Lost';
  Type?: 'New Customer' | 'Existing Customer - Upgrade' | 'Existing Customer - Replacement';
  HOTMESS_Product_Category__c?: string;
  HOTMESS_Order_ID__c?: string;
}

export class SalesforceClient {
  private config: SalesforceConfig;
  private accessToken?: string;
  private instanceUrl?: string;

  constructor(config: SalesforceConfig) {
    this.config = config;
  }

  /**
   * Authenticate with Salesforce and get access token
   */
  async authenticate(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      username: this.config.username,
      password: this.config.password + this.config.securityToken,
    });

    try {
      const response = await fetch(`${this.config.instanceUrl}/services/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const data: SalesforceAuthResponse = await response.json();
      this.accessToken = data.access_token;
      this.instanceUrl = data.instance_url;
    } catch (error) {
      console.error('Salesforce authentication error:', error);
      throw error;
    }
  }

  /**
   * Make authenticated API request to Salesforce
   */
  private async apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessToken) {
      await this.authenticate();
    }

    const url = `${this.instanceUrl}/services/data/v${this.config.apiVersion}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, re-authenticate
        await this.authenticate();
        return this.apiRequest(endpoint, options);
      }
      throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create a new lead in Salesforce
   */
  async createLead(lead: Lead): Promise<string> {
    const response = await this.apiRequest('/sobjects/Lead/', {
      method: 'POST',
      body: JSON.stringify(lead),
    });

    return response.id;
  }

  /**
   * Update an existing lead
   */
  async updateLead(leadId: string, updates: Partial<Lead>): Promise<void> {
    await this.apiRequest(`/sobjects/Lead/${leadId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Get lead by email
   */
  async getLeadByEmail(email: string): Promise<Lead | null> {
    const query = `SELECT Id, FirstName, LastName, Email, Phone, Company, Status, LeadSource, Description, HOTMESS_Affiliate_Code__c, HOTMESS_UTM_Source__c, HOTMESS_UTM_Campaign__c FROM Lead WHERE Email = '${email}' LIMIT 1`;
    
    const response = await this.apiRequest(`/query?q=${encodeURIComponent(query)}`);
    
    return response.records.length > 0 ? response.records[0] : null;
  }

  /**
   * Create a new contact
   */
  async createContact(contact: Contact): Promise<string> {
    const response = await this.apiRequest('/sobjects/Contact/', {
      method: 'POST',
      body: JSON.stringify(contact),
    });

    return response.id;
  }

  /**
   * Update an existing contact
   */
  async updateContact(contactId: string, updates: Partial<Contact>): Promise<void> {
    await this.apiRequest(`/sobjects/Contact/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Get contact by email
   */
  async getContactByEmail(email: string): Promise<Contact | null> {
    const query = `SELECT Id, FirstName, LastName, Email, Phone, AccountId, HOTMESS_Customer_Type__c, HOTMESS_Total_Orders__c, HOTMESS_Total_Spent__c, HOTMESS_Last_Order_Date__c FROM Contact WHERE Email = '${email}' LIMIT 1`;
    
    const response = await this.apiRequest(`/query?q=${encodeURIComponent(query)}`);
    
    return response.records.length > 0 ? response.records[0] : null;
  }

  /**
   * Create a new opportunity
   */
  async createOpportunity(opportunity: Opportunity): Promise<string> {
    const response = await this.apiRequest('/sobjects/Opportunity/', {
      method: 'POST',
      body: JSON.stringify(opportunity),
    });

    return response.id;
  }

  /**
   * Update an existing opportunity
   */
  async updateOpportunity(opportunityId: string, updates: Partial<Opportunity>): Promise<void> {
    await this.apiRequest(`/sobjects/Opportunity/${opportunityId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Sync customer data from HOTMESS to Salesforce
   */
  async syncCustomer(customerData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    totalOrders?: number;
    totalSpent?: number;
    lastOrderDate?: Date;
    affiliateCode?: string;
    utmSource?: string;
    utmCampaign?: string;
  }): Promise<{ contactId?: string; leadId?: string }> {
    try {
      // Check if contact exists
      let contact = await this.getContactByEmail(customerData.email);
      
      if (contact) {
        // Update existing contact
        await this.updateContact(contact.Id!, {
          HOTMESS_Total_Orders__c: customerData.totalOrders,
          HOTMESS_Total_Spent__c: customerData.totalSpent,
          HOTMESS_Last_Order_Date__c: customerData.lastOrderDate?.toISOString().split('T')[0],
        });
        return { contactId: contact.Id };
      } else {
        // Check if lead exists
        let lead = await this.getLeadByEmail(customerData.email);
        
        if (lead) {
          // Update existing lead
          await this.updateLead(lead.Id!, {
            FirstName: customerData.firstName,
            LastName: customerData.lastName,
            Phone: customerData.phone,
            HOTMESS_Affiliate_Code__c: customerData.affiliateCode,
            HOTMESS_UTM_Source__c: customerData.utmSource,
            HOTMESS_UTM_Campaign__c: customerData.utmCampaign,
          });
          return { leadId: lead.Id };
        } else {
          // Create new lead
          const leadId = await this.createLead({
            FirstName: customerData.firstName,
            LastName: customerData.lastName,
            Email: customerData.email,
            Phone: customerData.phone,
            Company: 'HOTMESS Customer',
            Status: 'Open - Not Contacted',
            LeadSource: 'Website',
            HOTMESS_Affiliate_Code__c: customerData.affiliateCode,
            HOTMESS_UTM_Source__c: customerData.utmSource,
            HOTMESS_UTM_Campaign__c: customerData.utmCampaign,
            HOTMESS_Signup_Date__c: new Date().toISOString().split('T')[0],
          });
          return { leadId };
        }
      }
    } catch (error) {
      console.error('Salesforce sync error:', error);
      throw error;
    }
  }

  /**
   * Track order in Salesforce as opportunity
   */
  async trackOrder(orderData: {
    customerEmail: string;
    orderNumber: string;
    amount: number;
    productCategory: string;
    orderDate: Date;
  }): Promise<string> {
    try {
      // Find the contact or lead
      let contact = await this.getContactByEmail(orderData.customerEmail);
      let accountId: string | undefined;
      let contactId: string | undefined;

      if (contact) {
        contactId = contact.Id;
        accountId = contact.AccountId;
      }

      // Create opportunity
      const opportunityId = await this.createOpportunity({
        Name: `HOTMESS Order - ${orderData.orderNumber}`,
        AccountId: accountId,
        ContactId: contactId,
        Amount: orderData.amount,
        CloseDate: orderData.orderDate.toISOString().split('T')[0],
        StageName: 'Closed Won',
        Type: 'New Customer',
        HOTMESS_Product_Category__c: orderData.productCategory,
        HOTMESS_Order_ID__c: orderData.orderNumber,
      });

      return opportunityId;
    } catch (error) {
      console.error('Order tracking error:', error);
      throw error;
    }
  }

  /**
   * Get sales analytics
   */
  async getSalesAnalytics(startDate: Date, endDate: Date): Promise<{
    totalRevenue: number;
    totalOrders: number;
    newLeads: number;
    convertedLeads: number;
    avgOrderValue: number;
  }> {
    try {
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // Get total revenue and orders
      const revenueQuery = `SELECT COUNT(Id), SUM(Amount) FROM Opportunity WHERE StageName = 'Closed Won' AND CloseDate >= ${startDateStr} AND CloseDate <= ${endDateStr} AND HOTMESS_Order_ID__c != null`;
      const revenueResponse = await this.apiRequest(`/query?q=${encodeURIComponent(revenueQuery)}`);
      
      const totalOrders = revenueResponse.records[0]?.expr0 || 0;
      const totalRevenue = revenueResponse.records[0]?.expr1 || 0;

      // Get new leads
      const leadsQuery = `SELECT COUNT(Id) FROM Lead WHERE CreatedDate >= ${startDateStr}T00:00:00.000+0000 AND CreatedDate <= ${endDateStr}T23:59:59.999+0000`;
      const leadsResponse = await this.apiRequest(`/query?q=${encodeURIComponent(leadsQuery)}`);
      const newLeads = leadsResponse.records[0]?.expr0 || 0;

      // Get converted leads
      const convertedQuery = `SELECT COUNT(Id) FROM Lead WHERE IsConverted = true AND ConvertedDate >= ${startDateStr}T00:00:00.000+0000 AND ConvertedDate <= ${endDateStr}T23:59:59.999+0000`;
      const convertedResponse = await this.apiRequest(`/query?q=${encodeURIComponent(convertedQuery)}`);
      const convertedLeads = convertedResponse.records[0]?.expr0 || 0;

      return {
        totalRevenue,
        totalOrders,
        newLeads,
        convertedLeads,
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      };
    } catch (error) {
      console.error('Analytics query error:', error);
      throw error;
    }
  }
}

// Initialize Salesforce client
export const salesforceClient = new SalesforceClient({
  clientId: process.env.SALESFORCE_CLIENT_ID!,
  clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
  username: process.env.SALESFORCE_USERNAME!,
  password: process.env.SALESFORCE_PASSWORD!,
  securityToken: process.env.SALESFORCE_SECURITY_TOKEN!,
  instanceUrl: process.env.SALESFORCE_INSTANCE_URL!,
  apiVersion: '58.0',
});

/**
 * Utility functions for CRM integration
 */
export const CRMUtils = {
  /**
   * Sync user signup to Salesforce
   */
  async syncUserSignup(user: {
    email: string;
    name: string;
    provider: string;
    affiliateCode?: string;
    utm?: {
      source?: string;
      campaign?: string;
      medium?: string;
    };
  }): Promise<void> {
    const [firstName, ...lastNameParts] = user.name.split(' ');
    const lastName = lastNameParts.join(' ') || 'Unknown';

    await salesforceClient.syncCustomer({
      email: user.email,
      firstName,
      lastName,
      affiliateCode: user.affiliateCode,
      utmSource: user.utm?.source,
      utmCampaign: user.utm?.campaign,
    });
  },

  /**
   * Sync order to Salesforce
   */
  async syncOrder(order: {
    customerEmail: string;
    orderNumber: string;
    amount: number;
    items: Array<{ name: string; category: string; price: number; quantity: number }>;
    orderDate: Date;
  }): Promise<void> {
    const mainCategory = order.items[0]?.category || 'General';
    
    await salesforceClient.trackOrder({
      customerEmail: order.customerEmail,
      orderNumber: order.orderNumber,
      amount: order.amount,
      productCategory: mainCategory,
      orderDate: order.orderDate,
    });
  },

  /**
   * Get CRM analytics for dashboard
   */
  async getAnalytics(days: number = 30): Promise<{
    totalRevenue: number;
    totalOrders: number;
    newLeads: number;
    convertedLeads: number;
    avgOrderValue: number;
    conversionRate: number;
  }> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const analytics = await salesforceClient.getSalesAnalytics(startDate, endDate);
    
    return {
      ...analytics,
      conversionRate: analytics.newLeads > 0 ? (analytics.convertedLeads / analytics.newLeads) * 100 : 0,
    };
  },
};