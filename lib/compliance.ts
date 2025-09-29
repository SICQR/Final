/**
 * Compliance Modules for HOTMESS business suite
 * Enhanced age-gate system, privacy policy management, profanity filter, and GDPR compliance
 */

interface AgeGateConfig {
  enabled: boolean;
  minimumAge: number;
  strictMode: boolean;
  countries: {
    [countryCode: string]: {
      minimumAge: number;
      verificationRequired: boolean;
      methods: Array<'dob' | 'id_check' | 'credit_card' | 'phone_verification'>;
    };
  };
  cookieExpiry: number; // days
  gracePeriod: number; // hours
  blockDuration: number; // hours
  bypassCodes: string[];
}

interface AgeVerificationSession {
  id: string;
  ipAddress: string;
  userAgent: string;
  country: string;
  verified: boolean;
  method: string;
  timestamp: Date;
  expiresAt: Date;
  attempts: number;
  blocked: boolean;
  blockedUntil?: Date;
}

interface PrivacyPolicy {
  id: string;
  version: string;
  language: string;
  title: string;
  content: string;
  effective_date: Date;
  created_date: Date;
  updated_date: Date;
  is_active: boolean;
  regions: string[];
  sections: Array<{
    id: string;
    title: string;
    content: string;
    required: boolean;
    order: number;
  }>;
}

interface ConsentRecord {
  id: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  country: string;
  policyVersion: string;
  consentType: 'marketing' | 'analytics' | 'functional' | 'necessary';
  granted: boolean;
  timestamp: Date;
  expiresAt?: Date;
  method: 'checkbox' | 'banner' | 'popup' | 'api';
  evidence: any;
}

interface ProfanityFilter {
  enabled: boolean;
  strictness: 'low' | 'medium' | 'high' | 'strict';
  customWords: string[];
  whitelist: string[];
  contextAware: boolean;
  languages: string[];
  replacement: 'asterisk' | 'dashes' | 'custom' | 'remove';
  customReplacement?: string;
}

interface GDPRRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  userId?: string;
  email: string;
  name: string;
  phone?: string;
  details: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  requestDate: Date;
  completionDate?: Date;
  assignedTo?: string;
  notes: string[];
  attachments: Array<{
    filename: string;
    url: string;
    uploadDate: Date;
  }>;
}

export class AgeGateSystem {
  private config: AgeGateConfig;
  private sessions: Map<string, AgeVerificationSession> = new Map();

  constructor(config: AgeGateConfig) {
    this.config = config;
    this.loadSessions();
  }

  /**
   * Check if age verification is required
   */
  async requiresVerification(
    request: {
      ip: string;
      userAgent: string;
      country?: string;
      userId?: string;
    }
  ): Promise<{ required: boolean; reason?: string; session?: AgeVerificationSession }> {
    if (!this.config.enabled) {
      return { required: false };
    }

    const country = request.country || 'GB';
    const countryConfig = this.config.countries[country] || this.config.countries['default'];
    
    if (!countryConfig?.verificationRequired) {
      return { required: false };
    }

    // Check existing session
    const sessionKey = this.generateSessionKey(request.ip, request.userAgent);
    const existingSession = this.sessions.get(sessionKey);

    if (existingSession) {
      // Check if session is blocked
      if (existingSession.blocked && existingSession.blockedUntil && existingSession.blockedUntil > new Date()) {
        return {
          required: true,
          reason: 'blocked',
          session: existingSession,
        };
      }

      // Check if session is still valid
      if (existingSession.verified && existingSession.expiresAt > new Date()) {
        return { required: false, session: existingSession };
      }
    }

    return {
      required: true,
      reason: 'verification_needed',
      session: existingSession,
    };
  }

  /**
   * Verify age using date of birth
   */
  async verifyAge(
    request: {
      ip: string;
      userAgent: string;
      country?: string;
    },
    verification: {
      method: 'dob' | 'id_check' | 'credit_card' | 'phone_verification';
      data: any;
    }
  ): Promise<{ verified: boolean; session: AgeVerificationSession; message?: string }> {
    const country = request.country || 'GB';
    const countryConfig = this.config.countries[country] || this.config.countries['default'];
    const minimumAge = countryConfig?.minimumAge || this.config.minimumAge;

    const sessionKey = this.generateSessionKey(request.ip, request.userAgent);
    let session = this.sessions.get(sessionKey);

    if (!session) {
      session = {
        id: `age_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ipAddress: request.ip,
        userAgent: request.userAgent,
        country,
        verified: false,
        method: verification.method,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + this.config.cookieExpiry * 24 * 60 * 60 * 1000),
        attempts: 0,
        blocked: false,
      };
    }

    session.attempts++;

    // Check for too many attempts
    if (session.attempts > 3) {
      session.blocked = true;
      session.blockedUntil = new Date(Date.now() + this.config.blockDuration * 60 * 60 * 1000);
      this.sessions.set(sessionKey, session);
      
      return {
        verified: false,
        session,
        message: 'Too many verification attempts. Please try again later.',
      };
    }

    let verified = false;
    let message = '';

    switch (verification.method) {
      case 'dob':
        const result = this.verifyDateOfBirth(verification.data.dateOfBirth, minimumAge);
        verified = result.verified;
        message = result.message;
        break;
        
      case 'id_check':
        verified = await this.verifyIDDocument(verification.data);
        message = verified ? 'ID verification successful' : 'ID verification failed';
        break;
        
      case 'credit_card':
        verified = await this.verifyCreditCard(verification.data);
        message = verified ? 'Card verification successful' : 'Card verification failed';
        break;
        
      case 'phone_verification':
        verified = await this.verifyPhone(verification.data);
        message = verified ? 'Phone verification successful' : 'Phone verification failed';
        break;
    }

    session.verified = verified;
    session.method = verification.method;
    this.sessions.set(sessionKey, session);

    // Save to database
    await this.saveSession(session);

    return { verified, session, message };
  }

  /**
   * Get age verification status
   */
  getVerificationStatus(sessionId: string): AgeVerificationSession | null {
    for (const session of this.sessions.values()) {
      if (session.id === sessionId) {
        return session;
      }
    }
    return null;
  }

  private verifyDateOfBirth(dateOfBirth: string, minimumAge: number): { verified: boolean; message: string } {
    try {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      
      if (dob > today) {
        return { verified: false, message: 'Invalid date of birth' };
      }

      const age = today.getFullYear() - dob.getFullYear();
      const hasHadBirthday = today.getMonth() > dob.getMonth() || 
                           (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

      const actualAge = hasHadBirthday ? age : age - 1;

      if (actualAge >= minimumAge) {
        return { verified: true, message: 'Age verification successful' };
      } else {
        return { verified: false, message: `You must be at least ${minimumAge} years old` };
      }
    } catch (error) {
      return { verified: false, message: 'Invalid date format' };
    }
  }

  private async verifyIDDocument(data: any): Promise<boolean> {
    // Implementation would integrate with ID verification service
    // For now, return placeholder
    return false;
  }

  private async verifyCreditCard(data: any): Promise<boolean> {
    // Implementation would verify credit card (age verification only, no charges)
    // For now, return placeholder
    return false;
  }

  private async verifyPhone(data: any): Promise<boolean> {
    // Implementation would verify phone number via SMS
    // For now, return placeholder
    return false;
  }

  private generateSessionKey(ip: string, userAgent: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(`${ip}:${userAgent}`).digest('hex');
  }

  private async loadSessions(): Promise<void> {
    // Implementation would load sessions from database
    console.log('Loading age verification sessions...');
  }

  private async saveSession(session: AgeVerificationSession): Promise<void> {
    // Implementation would save session to database
    console.log('Saving age verification session:', session.id);
  }
}

export class PrivacyPolicyManager {
  private policies: Map<string, PrivacyPolicy> = new Map();

  /**
   * Create new privacy policy
   */
  async createPolicy(policyData: Omit<PrivacyPolicy, 'id' | 'created_date' | 'updated_date'>): Promise<PrivacyPolicy> {
    const policy: PrivacyPolicy = {
      ...policyData,
      id: `policy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_date: new Date(),
      updated_date: new Date(),
    };

    this.policies.set(policy.id, policy);
    await this.savePolicy(policy);

    return policy;
  }

  /**
   * Update existing policy
   */
  async updatePolicy(policyId: string, updates: Partial<PrivacyPolicy>): Promise<PrivacyPolicy | null> {
    const policy = this.policies.get(policyId);
    if (!policy) return null;

    const updatedPolicy = {
      ...policy,
      ...updates,
      updated_date: new Date(),
    };

    this.policies.set(policyId, updatedPolicy);
    await this.savePolicy(updatedPolicy);

    return updatedPolicy;
  }

  /**
   * Get active policy for region and language
   */
  getActivePolicy(region: string, language: string = 'en'): PrivacyPolicy | null {
    for (const policy of this.policies.values()) {
      if (
        policy.is_active &&
        policy.language === language &&
        (policy.regions.includes(region) || policy.regions.includes('global'))
      ) {
        return policy;
      }
    }
    return null;
  }

  /**
   * Record consent
   */
  async recordConsent(consentData: Omit<ConsentRecord, 'id' | 'timestamp'>): Promise<ConsentRecord> {
    const consent: ConsentRecord = {
      ...consentData,
      id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    await this.saveConsent(consent);
    return consent;
  }

  /**
   * Get consent history for user
   */
  async getConsentHistory(userId: string): Promise<ConsentRecord[]> {
    // Implementation would query database
    return [];
  }

  /**
   * Check if consent is valid
   */
  async isConsentValid(userId: string, consentType: ConsentRecord['consentType']): Promise<boolean> {
    const consents = await this.getConsentHistory(userId);
    const latestConsent = consents
      .filter(c => c.consentType === consentType)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    if (!latestConsent) return false;
    if (!latestConsent.granted) return false;
    if (latestConsent.expiresAt && latestConsent.expiresAt < new Date()) return false;

    return true;
  }

  private async savePolicy(policy: PrivacyPolicy): Promise<void> {
    // Implementation would save to database
    console.log('Saving privacy policy:', policy.id);
  }

  private async saveConsent(consent: ConsentRecord): Promise<void> {
    // Implementation would save to database
    console.log('Saving consent record:', consent.id);
  }
}

export class ProfanityFilterSystem {
  private config: ProfanityFilter;
  private badWords: Set<string> = new Set();
  private whitelistedWords: Set<string> = new Set();

  constructor(config: ProfanityFilter) {
    this.config = config;
    this.loadWordLists();
  }

  /**
   * Filter profanity from text
   */
  filterText(text: string, options?: { preserveLength?: boolean }): {
    filtered: string;
    hasProfanity: boolean;
    detectedWords: string[];
  } {
    if (!this.config.enabled) {
      return {
        filtered: text,
        hasProfanity: false,
        detectedWords: [],
      };
    }

    const detectedWords: string[] = [];
    let filtered = text;

    // Check for profanity
    for (const word of this.badWords) {
      const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
      const matches = text.match(regex);
      
      if (matches) {
        detectedWords.push(...matches);
        
        // Apply replacement
        const replacement = this.generateReplacement(word, options?.preserveLength);
        filtered = filtered.replace(regex, replacement);
      }
    }

    // Check custom words
    for (const word of this.config.customWords) {
      const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
      const matches = text.match(regex);
      
      if (matches) {
        detectedWords.push(...matches);
        
        const replacement = this.generateReplacement(word, options?.preserveLength);
        filtered = filtered.replace(regex, replacement);
      }
    }

    return {
      filtered,
      hasProfanity: detectedWords.length > 0,
      detectedWords,
    };
  }

  /**
   * Check if text contains profanity
   */
  containsProfanity(text: string): boolean {
    const result = this.filterText(text);
    return result.hasProfanity;
  }

  /**
   * Add word to custom filter list
   */
  addCustomWord(word: string): void {
    this.config.customWords.push(word.toLowerCase());
    this.badWords.add(word.toLowerCase());
  }

  /**
   * Add word to whitelist
   */
  addToWhitelist(word: string): void {
    this.config.whitelist.push(word.toLowerCase());
    this.whitelistedWords.add(word.toLowerCase());
    this.badWords.delete(word.toLowerCase());
  }

  private loadWordLists(): void {
    // Load default bad words based on strictness level
    const defaultBadWords = this.getDefaultBadWords();
    defaultBadWords.forEach(word => this.badWords.add(word));

    // Load custom words
    this.config.customWords.forEach(word => this.badWords.add(word.toLowerCase()));

    // Load whitelist
    this.config.whitelist.forEach(word => {
      this.whitelistedWords.add(word.toLowerCase());
      this.badWords.delete(word.toLowerCase());
    });
  }

  private getDefaultBadWords(): string[] {
    // This would load from a curated list based on strictness
    const baseBadWords = ['damn', 'hell', 'crap'];
    const mediumBadWords = ['shit', 'bitch', 'ass'];
    const highBadWords = ['fuck', 'pussy', 'cock'];
    const strictBadWords = ['xxx', 'porn', 'sex'];

    switch (this.config.strictness) {
      case 'low':
        return [];
      case 'medium':
        return baseBadWords;
      case 'high':
        return [...baseBadWords, ...mediumBadWords];
      case 'strict':
        return [...baseBadWords, ...mediumBadWords, ...highBadWords, ...strictBadWords];
      default:
        return baseBadWords;
    }
  }

  private generateReplacement(word: string, preserveLength?: boolean): string {
    switch (this.config.replacement) {
      case 'asterisk':
        return preserveLength ? '*'.repeat(word.length) : '***';
      case 'dashes':
        return preserveLength ? '-'.repeat(word.length) : '---';
      case 'custom':
        return this.config.customReplacement || '[FILTERED]';
      case 'remove':
        return '';
      default:
        return '***';
    }
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export class GDPRComplianceManager {
  private requests: Map<string, GDPRRequest> = new Map();

  /**
   * Submit GDPR request
   */
  async submitRequest(requestData: Omit<GDPRRequest, 'id' | 'status' | 'requestDate' | 'notes' | 'attachments'>): Promise<GDPRRequest> {
    const request: GDPRRequest = {
      ...requestData,
      id: `gdpr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      requestDate: new Date(),
      notes: [],
      attachments: [],
    };

    this.requests.set(request.id, request);
    await this.saveRequest(request);

    // Send notification to data protection team
    await this.notifyDataProtectionTeam(request);

    return request;
  }

  /**
   * Process data access request
   */
  async processAccessRequest(requestId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const request = this.requests.get(requestId);
      if (!request || request.type !== 'access') {
        return { success: false, error: 'Request not found or invalid type' };
      }

      // Collect all personal data for the user
      const userData = await this.collectUserData(request.userId || request.email);
      
      // Update request status
      request.status = 'completed';
      request.completionDate = new Date();
      this.requests.set(requestId, request);
      await this.saveRequest(request);

      return { success: true, data: userData };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Process data erasure request
   */
  async processErasureRequest(requestId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const request = this.requests.get(requestId);
      if (!request || request.type !== 'erasure') {
        return { success: false, error: 'Request not found or invalid type' };
      }

      // Delete all personal data for the user
      await this.deleteUserData(request.userId || request.email);
      
      // Update request status
      request.status = 'completed';
      request.completionDate = new Date();
      this.requests.set(requestId, request);
      await this.saveRequest(request);

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Process data portability request
   */
  async processPortabilityRequest(requestId: string): Promise<{ success: boolean; exportUrl?: string; error?: string }> {
    try {
      const request = this.requests.get(requestId);
      if (!request || request.type !== 'portability') {
        return { success: false, error: 'Request not found or invalid type' };
      }

      // Export user data in portable format
      const exportUrl = await this.exportUserData(request.userId || request.email);
      
      // Update request status
      request.status = 'completed';
      request.completionDate = new Date();
      this.requests.set(requestId, request);
      await this.saveRequest(request);

      return { success: true, exportUrl };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get GDPR request status
   */
  getRequestStatus(requestId: string): GDPRRequest | null {
    return this.requests.get(requestId) || null;
  }

  /**
   * List all GDPR requests
   */
  getAllRequests(): GDPRRequest[] {
    return Array.from(this.requests.values());
  }

  /**
   * Add note to GDPR request
   */
  addNote(requestId: string, note: string, author: string): boolean {
    const request = this.requests.get(requestId);
    if (!request) return false;

    request.notes.push(`[${new Date().toISOString()}] ${author}: ${note}`);
    this.requests.set(requestId, request);
    this.saveRequest(request);

    return true;
  }

  private async collectUserData(userIdentifier: string): Promise<any> {
    // Implementation would collect all user data from various systems
    return {
      user_profile: {},
      orders: [],
      affiliate_data: {},
      consent_records: [],
      support_tickets: [],
    };
  }

  private async deleteUserData(userIdentifier: string): Promise<void> {
    // Implementation would delete user data from all systems
    console.log('Deleting user data for:', userIdentifier);
  }

  private async exportUserData(userIdentifier: string): Promise<string> {
    // Implementation would export user data and return download URL
    return 'https://example.com/exports/user_data.json';
  }

  private async saveRequest(request: GDPRRequest): Promise<void> {
    // Implementation would save to database
    console.log('Saving GDPR request:', request.id);
  }

  private async notifyDataProtectionTeam(request: GDPRRequest): Promise<void> {
    // Implementation would send notification
    console.log('Notifying data protection team about request:', request.id);
  }
}

// Initialize compliance systems
export const ageGateSystem = new AgeGateSystem({
  enabled: true,
  minimumAge: 18,
  strictMode: true,
  countries: {
    'GB': { minimumAge: 18, verificationRequired: true, methods: ['dob', 'id_check'] },
    'US': { minimumAge: 21, verificationRequired: true, methods: ['dob', 'id_check'] },
    'default': { minimumAge: 18, verificationRequired: true, methods: ['dob'] },
  },
  cookieExpiry: 30,
  gracePeriod: 2,
  blockDuration: 24,
  bypassCodes: [],
});

export const privacyPolicyManager = new PrivacyPolicyManager();

export const profanityFilter = new ProfanityFilterSystem({
  enabled: true,
  strictness: 'medium',
  customWords: [],
  whitelist: ['hell', 'damn'], // Context-appropriate for HOTMESS brand
  contextAware: true,
  languages: ['en'],
  replacement: 'asterisk',
});

export const gdprManager = new GDPRComplianceManager();

/**
 * Utility functions for compliance
 */
export const ComplianceUtils = {
  /**
   * Generate compliance report
   */
  async generateComplianceReport(startDate: Date, endDate: Date): Promise<{
    ageVerifications: number;
    consentRecords: number;
    gdprRequests: number;
    profanityDetections: number;
  }> {
    // Implementation would aggregate compliance data
    return {
      ageVerifications: 0,
      consentRecords: 0,
      gdprRequests: 0,
      profanityDetections: 0,
    };
  },

  /**
   * Validate email for compliance
   */
  validateEmail(email: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      issues.push('Invalid email format');
    }

    // Check for disposable email domains
    const disposableDomains = ['10minutemail.com', 'guerrillamail.com', 'tempmail.org'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      issues.push('Disposable email address not allowed');
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  },

  /**
   * Generate consent banner HTML
   */
  generateConsentBanner(policyVersion: string): string {
    return `
      <div id="consent-banner" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
        <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div class="mb-4 md:mb-0">
            <p class="text-sm">
              We use cookies to enhance your experience and for analytics. 
              By continuing to use our site, you consent to our use of cookies.
            </p>
          </div>
          <div class="flex space-x-4">
            <button id="consent-accept" class="btn-primary">Accept All</button>
            <button id="consent-customize" class="btn-secondary">Customize</button>
            <button id="consent-reject" class="text-gray-400 hover:text-white">Reject</button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Check if IP is from restricted region
   */
  async isRestrictedRegion(ip: string): Promise<{ restricted: boolean; country?: string; reason?: string }> {
    try {
      // Implementation would use IP geolocation service
      const geoData = await getGeoLocation(ip);
      
      const restrictedCountries = ['CN', 'KP', 'IR']; // Example restricted countries
      
      if (restrictedCountries.includes(geoData.country)) {
        return {
          restricted: true,
          country: geoData.country,
          reason: 'Service not available in your region',
        };
      }

      return { restricted: false, country: geoData.country };
    } catch (error) {
      return { restricted: false };
    }
  },
};

async function getGeoLocation(ip: string): Promise<{ country: string; region: string }> {
  // Placeholder implementation
  return { country: 'GB', region: 'London' };
}