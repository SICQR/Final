/**
 * Enhanced Affiliate System for HOTMESS business suite
 * Features QR codes, UTM tracking, payout management, and leaderboards
 */

import QRCode from 'qrcode';

interface AffiliateUser {
  id: string;
  email: string;
  name: string;
  telegramId?: number;
  affiliateCode: string;
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  commissionRate: number;
  joinDate: Date;
  lastActive: Date;
  personalDetails?: {
    phone?: string;
    address?: string;
    taxId?: string;
    paymentMethod: 'paypal' | 'bank' | 'crypto';
    paymentDetails: string;
  };
}

interface AffiliateClick {
  id: string;
  affiliateCode: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  country?: string;
  city?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
}

interface AffiliateConversion {
  id: string;
  affiliateCode: string;
  clickId?: string;
  orderId: string;
  customerEmail: string;
  orderValue: number;
  commissionAmount: number;
  commissionRate: number;
  timestamp: Date;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }>;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface AffiliatePayout {
  id: string;
  affiliateCode: string;
  amount: number;
  period: {
    start: Date;
    end: Date;
  };
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestDate: Date;
  processedDate?: Date;
  paymentMethod: string;
  paymentDetails: string;
  transactionId?: string;
  notes?: string;
}

interface AffiliateStats {
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: Array<{ name: string; sales: number; commission: number }>;
  monthlyStats: Array<{
    month: string;
    clicks: number;
    conversions: number;
    earnings: number;
  }>;
  utmPerformance: Array<{
    source: string;
    clicks: number;
    conversions: number;
    earnings: number;
  }>;
}

interface LeaderboardEntry {
  rank: number;
  affiliateCode: string;
  name: string;
  tier: string;
  conversions: number;
  earnings: number;
  conversionRate: number;
  change: number; // position change from last period
}

export class AffiliateSystem {
  /**
   * Generate QR code for affiliate link
   */
  async generateQRCode(
    affiliateCode: string,
    options?: {
      campaign?: string;
      medium?: string;
      content?: string;
      size?: number;
    }
  ): Promise<string> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotmess.com';
      
      const params = new URLSearchParams({
        ref: affiliateCode,
      });

      if (options?.campaign) params.set('utm_campaign', options.campaign);
      if (options?.medium) params.set('utm_medium', options.medium);
      if (options?.content) params.set('utm_content', options.content);
      
      // Always add UTM source for tracking
      params.set('utm_source', 'qr_code');

      const url = `${baseUrl}?${params.toString()}`;
      
      const qrCode = await QRCode.toDataURL(url, {
        width: options?.size || 512,
        margin: 2,
        color: {
          dark: '#ff1981', // HOTMESS pink
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M',
      });

      return qrCode;
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      throw new Error('QR code generation failed');
    }
  }

  /**
   * Track affiliate click
   */
  async trackClick(
    affiliateCode: string,
    request: {
      ip: string;
      userAgent: string;
      referrer?: string;
      utmParams?: {
        source?: string;
        medium?: string;
        campaign?: string;
        term?: string;
        content?: string;
      };
    }
  ): Promise<string> {
    try {
      // Generate unique click ID
      const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Parse user agent for device info
      const deviceInfo = this.parseUserAgent(request.userAgent);
      
      // Get geolocation from IP (placeholder)
      const geoInfo = await this.getGeoLocation(request.ip);

      const clickData: AffiliateClick = {
        id: clickId,
        affiliateCode,
        timestamp: new Date(),
        ipAddress: request.ip,
        userAgent: request.userAgent,
        referrer: request.referrer,
        utmSource: request.utmParams?.source,
        utmMedium: request.utmParams?.medium,
        utmCampaign: request.utmParams?.campaign,
        utmTerm: request.utmParams?.term,
        utmContent: request.utmParams?.content,
        country: geoInfo.country,
        city: geoInfo.city,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      };

      // Store click data
      await this.storeClick(clickData);

      // Update affiliate click count
      await this.incrementClickCount(affiliateCode);

      return clickId;
    } catch (error) {
      console.error('Failed to track click:', error);
      throw error;
    }
  }

  /**
   * Track affiliate conversion
   */
  async trackConversion(
    affiliateCode: string,
    orderData: {
      orderId: string;
      customerEmail: string;
      orderValue: number;
      products: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        category: string;
      }>;
    },
    clickId?: string
  ): Promise<void> {
    try {
      // Get affiliate info for commission rate
      const affiliate = await this.getAffiliate(affiliateCode);
      if (!affiliate) {
        throw new Error('Affiliate not found');
      }

      const commissionAmount = orderData.orderValue * (affiliate.commissionRate / 100);

      const conversionData: AffiliateConversion = {
        id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        affiliateCode,
        clickId,
        orderId: orderData.orderId,
        customerEmail: orderData.customerEmail,
        orderValue: orderData.orderValue,
        commissionAmount,
        commissionRate: affiliate.commissionRate,
        timestamp: new Date(),
        products: orderData.products,
        status: 'pending',
      };

      // Store conversion
      await this.storeConversion(conversionData);

      // Update affiliate stats
      await this.updateAffiliateStats(affiliateCode, {
        conversions: 1,
        earnings: commissionAmount,
      });

      // Send notification to affiliate
      await this.notifyConversion(affiliate, conversionData);

    } catch (error) {
      console.error('Failed to track conversion:', error);
      throw error;
    }
  }

  /**
   * Get affiliate statistics
   */
  async getAffiliateStats(
    affiliateCode: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<AffiliateStats> {
    try {
      // Default to last 30 days if no range provided
      const end = timeRange?.end || new Date();
      const start = timeRange?.start || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      const clicks = await this.getClicksInRange(affiliateCode, start, end);
      const conversions = await this.getConversionsInRange(affiliateCode, start, end);
      
      const totalClicks = clicks.length;
      const totalConversions = conversions.length;
      const totalEarnings = conversions.reduce((sum, conv) => sum + conv.commissionAmount, 0);
      const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
      const averageOrderValue = totalConversions > 0 ? 
        conversions.reduce((sum, conv) => sum + conv.orderValue, 0) / totalConversions : 0;

      // Get monthly breakdown
      const monthlyStats = await this.getMonthlyStats(affiliateCode, start, end);
      
      // Get UTM performance
      const utmPerformance = await this.getUTMPerformance(affiliateCode, start, end);
      
      // Get top products
      const topProducts = await this.getTopProducts(affiliateCode, start, end);
      
      // Get payout info
      const { pending, paid } = await this.getPayoutSummary(affiliateCode);

      return {
        totalClicks,
        totalConversions,
        totalEarnings,
        pendingEarnings: pending,
        paidEarnings: paid,
        conversionRate,
        averageOrderValue,
        topProducts,
        monthlyStats,
        utmPerformance,
      };
    } catch (error) {
      console.error('Failed to get affiliate stats:', error);
      throw error;
    }
  }

  /**
   * Get affiliate leaderboard
   */
  async getLeaderboard(
    timeRange?: { start: Date; end: Date },
    limit: number = 50
  ): Promise<LeaderboardEntry[]> {
    try {
      const end = timeRange?.end || new Date();
      const start = timeRange?.start || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get all affiliates with their stats
      const affiliates = await this.getAllActiveAffiliates();
      const leaderboardData: LeaderboardEntry[] = [];

      for (const affiliate of affiliates) {
        const stats = await this.getAffiliateStats(affiliate.affiliateCode, { start, end });
        
        leaderboardData.push({
          rank: 0, // Will be set after sorting
          affiliateCode: affiliate.affiliateCode,
          name: affiliate.name,
          tier: affiliate.tier,
          conversions: stats.totalConversions,
          earnings: stats.totalEarnings,
          conversionRate: stats.conversionRate,
          change: 0, // Calculate based on previous period
        });
      }

      // Sort by earnings descending
      leaderboardData.sort((a, b) => b.earnings - a.earnings);

      // Set ranks
      leaderboardData.forEach((entry, index) => {
        entry.rank = index + 1;
      });

      return leaderboardData.slice(0, limit);
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      throw error;
    }
  }

  /**
   * Request payout
   */
  async requestPayout(
    affiliateCode: string,
    amount?: number
  ): Promise<{ success: boolean; payoutId?: string; message: string }> {
    try {
      const affiliate = await this.getAffiliate(affiliateCode);
      if (!affiliate) {
        return { success: false, message: 'Affiliate not found' };
      }

      const stats = await this.getAffiliateStats(affiliateCode);
      const availableAmount = stats.pendingEarnings;
      const minPayout = 25; // £25 minimum

      if (availableAmount < minPayout) {
        return {
          success: false,
          message: `Minimum payout is £${minPayout}. You have £${availableAmount.toFixed(2)} available.`,
        };
      }

      const payoutAmount = amount || availableAmount;
      
      if (payoutAmount > availableAmount) {
        return {
          success: false,
          message: `Insufficient funds. You have £${availableAmount.toFixed(2)} available.`,
        };
      }

      if (!affiliate.personalDetails?.paymentMethod) {
        return {
          success: false,
          message: 'Please set up your payment method before requesting a payout.',
        };
      }

      // Create payout request
      const payout: AffiliatePayout = {
        id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        affiliateCode,
        amount: payoutAmount,
        period: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        status: 'pending',
        requestDate: new Date(),
        paymentMethod: affiliate.personalDetails.paymentMethod,
        paymentDetails: affiliate.personalDetails.paymentDetails,
      };

      await this.storePayout(payout);

      // Notify admin
      await this.notifyPayoutRequest(affiliate, payout);

      return {
        success: true,
        payoutId: payout.id,
        message: `Payout request for £${payoutAmount.toFixed(2)} has been submitted and will be processed within 3-5 business days.`,
      };
    } catch (error) {
      console.error('Failed to request payout:', error);
      return {
        success: false,
        message: 'Failed to process payout request. Please try again later.',
      };
    }
  }

  /**
   * Approve payout (admin function)
   */
  async approvePayout(
    payoutId: string,
    transactionId?: string,
    notes?: string
  ): Promise<void> {
    try {
      const payout = await this.getPayout(payoutId);
      if (!payout) {
        throw new Error('Payout not found');
      }

      payout.status = 'approved';
      payout.processedDate = new Date();
      payout.transactionId = transactionId;
      payout.notes = notes;

      await this.updatePayout(payout);

      // Update affiliate balance
      await this.updateAffiliateBalance(payout.affiliateCode, -payout.amount);

      // Notify affiliate
      const affiliate = await this.getAffiliate(payout.affiliateCode);
      if (affiliate) {
        await this.notifyPayoutApproved(affiliate, payout);
      }
    } catch (error) {
      console.error('Failed to approve payout:', error);
      throw error;
    }
  }

  /**
   * Generate affiliate link with UTM parameters
   */
  generateAffiliateLink(
    affiliateCode: string,
    utmParams?: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    }
  ): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotmess.com';
    const params = new URLSearchParams({
      ref: affiliateCode,
    });

    if (utmParams?.source) params.set('utm_source', utmParams.source);
    if (utmParams?.medium) params.set('utm_medium', utmParams.medium);
    if (utmParams?.campaign) params.set('utm_campaign', utmParams.campaign);
    if (utmParams?.term) params.set('utm_term', utmParams.term);
    if (utmParams?.content) params.set('utm_content', utmParams.content);

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Private helper methods
   */
  private parseUserAgent(userAgent: string): {
    device: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
  } {
    // Simplified user agent parsing
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    const isTablet = /iPad|Tablet/.test(userAgent);
    
    let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
    if (isTablet) device = 'tablet';
    else if (isMobile) device = 'mobile';

    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Other';

    const os = userAgent.includes('Windows') ? 'Windows' :
              userAgent.includes('Mac') ? 'macOS' :
              userAgent.includes('Linux') ? 'Linux' :
              userAgent.includes('Android') ? 'Android' :
              userAgent.includes('iOS') ? 'iOS' : 'Other';

    return { device, browser, os };
  }

  private async getGeoLocation(ip: string): Promise<{ country: string; city: string }> {
    // Placeholder implementation - would use IP geolocation service
    return { country: 'Unknown', city: 'Unknown' };
  }

  /**
   * Database operations (placeholder implementations)
   */
  private async getAffiliate(affiliateCode: string): Promise<AffiliateUser | null> {
    // Implementation would query database
    return null;
  }

  private async storeClick(click: AffiliateClick): Promise<void> {
    // Implementation would store in database
    console.log('Storing click:', click);
  }

  private async storeConversion(conversion: AffiliateConversion): Promise<void> {
    // Implementation would store in database
    console.log('Storing conversion:', conversion);
  }

  private async storePayout(payout: AffiliatePayout): Promise<void> {
    // Implementation would store in database
    console.log('Storing payout:', payout);
  }

  private async incrementClickCount(affiliateCode: string): Promise<void> {
    // Implementation would update database
    console.log('Incrementing click count for:', affiliateCode);
  }

  private async updateAffiliateStats(affiliateCode: string, updates: any): Promise<void> {
    // Implementation would update database
    console.log('Updating affiliate stats:', affiliateCode, updates);
  }

  private async getClicksInRange(affiliateCode: string, start: Date, end: Date): Promise<AffiliateClick[]> {
    // Implementation would query database
    return [];
  }

  private async getConversionsInRange(affiliateCode: string, start: Date, end: Date): Promise<AffiliateConversion[]> {
    // Implementation would query database
    return [];
  }

  private async getMonthlyStats(affiliateCode: string, start: Date, end: Date): Promise<any[]> {
    // Implementation would aggregate data from database
    return [];
  }

  private async getUTMPerformance(affiliateCode: string, start: Date, end: Date): Promise<any[]> {
    // Implementation would aggregate UTM data
    return [];
  }

  private async getTopProducts(affiliateCode: string, start: Date, end: Date): Promise<any[]> {
    // Implementation would aggregate product data
    return [];
  }

  private async getPayoutSummary(affiliateCode: string): Promise<{ pending: number; paid: number }> {
    // Implementation would calculate from database
    return { pending: 0, paid: 0 };
  }

  private async getAllActiveAffiliates(): Promise<AffiliateUser[]> {
    // Implementation would query database
    return [];
  }

  private async getPayout(payoutId: string): Promise<AffiliatePayout | null> {
    // Implementation would query database
    return null;
  }

  private async updatePayout(payout: AffiliatePayout): Promise<void> {
    // Implementation would update database
    console.log('Updating payout:', payout);
  }

  private async updateAffiliateBalance(affiliateCode: string, amount: number): Promise<void> {
    // Implementation would update database
    console.log('Updating affiliate balance:', affiliateCode, amount);
  }

  private async notifyConversion(affiliate: AffiliateUser, conversion: AffiliateConversion): Promise<void> {
    // Implementation would send notification
    console.log('Notifying conversion:', affiliate.affiliateCode, conversion.commissionAmount);
  }

  private async notifyPayoutRequest(affiliate: AffiliateUser, payout: AffiliatePayout): Promise<void> {
    // Implementation would notify admin
    console.log('Notifying payout request:', affiliate.affiliateCode, payout.amount);
  }

  private async notifyPayoutApproved(affiliate: AffiliateUser, payout: AffiliatePayout): Promise<void> {
    // Implementation would notify affiliate
    console.log('Notifying payout approved:', affiliate.affiliateCode, payout.amount);
  }
}

// Initialize affiliate system
export const affiliateSystem = new AffiliateSystem();