/**
 * Comprehensive API Endpoints and Utilities for HOTMESS business suite
 * Data validation schemas, utility functions library, and API handlers
 */

import { z } from 'zod';

// Data Validation Schemas
export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8).optional(),
  role: z.enum(['user', 'affiliate', 'admin']).default('user'),
  status: z.enum(['active', 'suspended', 'pending']).default('pending'),
  provider: z.enum(['google', 'facebook', 'telegram', 'email']),
  providerId: z.string().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  country: z.string().length(2).optional(),
  language: z.string().length(2).default('en'),
  currency: z.string().length(3).default('GBP'),
  timezone: z.string().default('Europe/London'),
  affiliateCode: z.string().optional(),
  referredBy: z.string().optional(),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  ageVerified: z.boolean().default(false),
  marketingConsent: z.boolean().default(false),
  analyticsConsent: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  lastLoginAt: z.date().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  category: z.enum(['RAW', 'HUNG', 'HIGH', 'SUPER', 'BUNDLE']),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  cost: z.number().positive().optional(),
  sku: z.string().min(1),
  barcode: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  images: z.array(z.string().url()),
  variants: z.array(z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    value: z.string(),
    price: z.number().positive().optional(),
    sku: z.string().optional(),
    inventory: z.number().int().min(0),
  })),
  tags: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDigital: z.boolean().default(false),
  requiresShipping: z.boolean().default(true),
  ageRestricted: z.boolean().default(false),
  minimumAge: z.number().int().min(13).max(21).default(18),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const OrderSchema = z.object({
  id: z.string().uuid().optional(),
  orderNumber: z.string(),
  userId: z.string().uuid(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  paymentStatus: z.enum(['pending', 'authorized', 'paid', 'failed', 'refunded']),
  fulfillmentStatus: z.enum(['unfulfilled', 'partial', 'fulfilled']),
  subtotal: z.number().positive(),
  taxes: z.number().min(0),
  shipping: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().positive(),
  currency: z.string().length(3),
  items: z.array(z.object({
    productId: z.string().uuid(),
    variantId: z.string().uuid().optional(),
    name: z.string(),
    sku: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    total: z.number().positive(),
  })),
  shippingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    zip: z.string(),
    phone: z.string().optional(),
  }),
  billingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    zip: z.string(),
    phone: z.string().optional(),
  }),
  affiliateCode: z.string().optional(),
  commissionAmount: z.number().min(0).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const AffiliateSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  affiliateCode: z.string().min(3).max(20),
  status: z.enum(['active', 'pending', 'suspended', 'inactive']),
  tier: z.enum(['bronze', 'silver', 'gold', 'diamond']).default('bronze'),
  commissionRate: z.number().min(0).max(100),
  totalClicks: z.number().int().min(0).default(0),
  totalConversions: z.number().int().min(0).default(0),
  totalEarnings: z.number().min(0).default(0),
  pendingEarnings: z.number().min(0).default(0),
  paidEarnings: z.number().min(0).default(0),
  paymentMethod: z.enum(['paypal', 'bank', 'crypto']).optional(),
  paymentDetails: z.string().optional(),
  taxId: z.string().optional(),
  businessName: z.string().optional(),
  website: z.string().url().optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  joinDate: z.date().default(() => new Date()),
  lastActiveDate: z.date().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const AnalyticsEventSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  sessionId: z.string(),
  eventType: z.string(),
  eventName: z.string(),
  properties: z.record(z.string(), z.any()).default({}),
  timestamp: z.date().default(() => new Date()),
  source: z.enum(['web', 'mobile', 'api', 'telegram', 'shopify']),
  ipAddress: z.string(),
  userAgent: z.string(),
  referrer: z.string().url().optional(),
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    term: z.string().optional(),
    content: z.string().optional(),
  }).default({}),
  page: z.object({
    url: z.string().url(),
    title: z.string(),
    path: z.string(),
  }).optional(),
  device: z.object({
    type: z.enum(['desktop', 'mobile', 'tablet']),
    os: z.string(),
    browser: z.string(),
    screenResolution: z.string().optional(),
  }).optional(),
  location: z.object({
    country: z.string().length(2),
    region: z.string(),
    city: z.string(),
    timezone: z.string(),
  }).optional(),
});

// Utility Functions Library
export class APIUtils {
  /**
   * Generate unique identifiers
   */
  static generateId(): string {
    return crypto.randomUUID();
  }

  static generateShortId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `HM-${timestamp}-${random}`;
  }

  /**
   * Data validation and sanitization
   */
  static validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
        return { success: false, errors };
      }
      return { success: false, errors: ['Invalid data format'] };
    }
  }

  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  static sanitizePhoneNumber(phone: string): string {
    return phone.replace(/[^\d+]/g, '');
  }

  static sanitizeText(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
  }

  /**
   * Password utilities
   */
  static async hashPassword(password: string): Promise<string> {
    // In a real implementation, use bcrypt or similar
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);
    return hashedPassword === hash;
  }

  static generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Date and time utilities
   */
  static formatISO(date: Date): string {
    return date.toISOString();
  }

  static parseISO(dateString: string): Date {
    return new Date(dateString);
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static diffInDays(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static isWithinRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= startDate && date <= endDate;
  }

  /**
   * Number and currency utilities
   */
  static roundToDecimals(number: number, decimals: number = 2): number {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  static formatCurrency(amount: number, currency: string = 'GBP'): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static formatPercentage(number: number, decimals: number = 1): string {
    return `${(number * 100).toFixed(decimals)}%`;
  }

  /**
   * String utilities
   */
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static truncate(text: string, length: number, suffix: string = '...'): string {
    if (text.length <= length) return text;
    return text.substring(0, length - suffix.length) + suffix;
  }

  static extractDomain(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  }

  /**
   * Array utilities
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  static groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }

  /**
   * HTTP utilities
   */
  static createResponse<T>(data: T, status: number = 200): Response {
    return new Response(JSON.stringify({ success: true, data }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static createErrorResponse(message: string, status: number = 400, errors?: string[]): Response {
    return new Response(JSON.stringify({ 
      success: false, 
      error: message,
      errors: errors || []
    }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async parseRequestBody<T>(request: Request): Promise<T> {
    try {
      return await request.json();
    } catch {
      throw new Error('Invalid JSON in request body');
    }
  }

  static getClientIP(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const remoteAddr = request.headers.get('remote-addr');
    
    return forwardedFor?.split(',')[0] || realIP || remoteAddr || 'unknown';
  }

  static getUserAgent(request: Request): string {
    return request.headers.get('user-agent') || 'unknown';
  }

  /**
   * Analytics utilities
   */
  static parseUserAgent(userAgent: string): { browser: string; os: string; device: string } {
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Other';

    const os = userAgent.includes('Windows') ? 'Windows' :
              userAgent.includes('Mac') ? 'macOS' :
              userAgent.includes('Linux') ? 'Linux' :
              userAgent.includes('Android') ? 'Android' :
              userAgent.includes('iOS') ? 'iOS' : 'Other';

    const device = userAgent.includes('Mobile') ? 'mobile' :
                  userAgent.includes('Tablet') ? 'tablet' : 'desktop';

    return { browser, os, device };
  }

  static extractUTMParams(url: string): Record<string, string> {
    try {
      const urlObj = new URL(url);
      const params: Record<string, string> = {};
      
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlObj.searchParams.get(param);
        if (value) {
          params[param.replace('utm_', '')] = value;
        }
      });
      
      return params;
    } catch {
      return {};
    }
  }

  /**
   * Rate limiting utilities
   */
  static createRateLimitKey(identifier: string, window: string): string {
    return `ratelimit:${identifier}:${window}`;
  }

  static isRateLimited(count: number, limit: number): boolean {
    return count >= limit;
  }

  /**
   * Cache utilities
   */
  static createCacheKey(...parts: string[]): string {
    return parts.join(':');
  }

  static getCacheTTL(type: 'short' | 'medium' | 'long'): number {
    switch (type) {
      case 'short': return 5 * 60; // 5 minutes
      case 'medium': return 60 * 60; // 1 hour
      case 'long': return 24 * 60 * 60; // 24 hours
      default: return 60 * 60;
    }
  }

  /**
   * File utilities
   */
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  static isImageFile(filename: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    return imageExtensions.includes(this.getFileExtension(filename));
  }

  static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Search utilities
   */
  static normalizeSearchTerm(term: string): string {
    return term.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  static createSearchTokens(text: string): string[] {
    return this.normalizeSearchTerm(text)
      .split(' ')
      .filter(token => token.length > 2);
  }

  static calculateSearchScore(searchTerm: string, text: string): number {
    const normalizedTerm = this.normalizeSearchTerm(searchTerm);
    const normalizedText = this.normalizeSearchTerm(text);
    
    if (normalizedText.includes(normalizedTerm)) {
      return 100;
    }
    
    const searchTokens = this.createSearchTokens(normalizedTerm);
    const textTokens = this.createSearchTokens(normalizedText);
    
    let matches = 0;
    searchTokens.forEach(searchToken => {
      textTokens.forEach(textToken => {
        if (textToken.includes(searchToken) || searchToken.includes(textToken)) {
          matches++;
        }
      });
    });
    
    return searchTokens.length > 0 ? (matches / searchTokens.length) * 100 : 0;
  }

  /**
   * Error handling utilities
   */
  static createError(message: string, code: string, status: number = 400): APIError {
    return new APIError(message, code, status);
  }

  static isAPIError(error: unknown): error is APIError {
    return error instanceof APIError;
  }
}

// Custom error class
export class APIError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Middleware utilities
export class MiddlewareUtils {
  /**
   * CORS middleware
   */
  static cors(options?: {
    origin?: string | string[];
    methods?: string[];
    headers?: string[];
    credentials?: boolean;
  }) {
    return (request: Request): Headers => {
      const headers = new Headers();
      
      const origin = request.headers.get('origin');
      const allowedOrigins = Array.isArray(options?.origin) 
        ? options.origin 
        : options?.origin ? [options.origin] : ['*'];
      
      if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
        headers.set('Access-Control-Allow-Origin', origin || '*');
      }
      
      headers.set('Access-Control-Allow-Methods', options?.methods?.join(', ') || 'GET, POST, PUT, DELETE, OPTIONS');
      headers.set('Access-Control-Allow-Headers', options?.headers?.join(', ') || 'Content-Type, Authorization');
      
      if (options?.credentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      return headers;
    };
  }

  /**
   * Authentication middleware
   */
  static async authenticate(request: Request): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const authHeader = request.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return { success: false, error: 'Missing or invalid authorization header' };
      }

      const token = authHeader.substring(7);
      // In a real implementation, verify JWT token here
      
      return { success: true, user: { id: 'user123' } };
    } catch (error) {
      return { success: false, error: 'Invalid token' };
    }
  }

  /**
   * Rate limiting middleware
   */
  static async rateLimit(
    identifier: string,
    limit: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    // In a real implementation, use Redis or similar for distributed rate limiting
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Placeholder implementation
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }
}

// Export all schemas for external use
export const Schemas = {
  User: UserSchema,
  Product: ProductSchema,
  Order: OrderSchema,
  Affiliate: AffiliateSchema,
  AnalyticsEvent: AnalyticsEventSchema,
};

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Affiliate = z.infer<typeof AffiliateSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;