/**
 * Push Notifications System for HOTMESS business suite
 * Handles web push notifications, user preferences, and admin management
 */

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  tag?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
}

interface UserNotificationPreferences {
  userId: string;
  enabled: boolean;
  categories: {
    marketing: boolean;
    orders: boolean;
    affiliate: boolean;
    radio: boolean;
    drops: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
    timezone: string;
  };
}

export class PushNotificationService {
  private vapidPublicKey: string;
  private vapidPrivateKey: string;
  private vapidSubject: string;

  constructor() {
    this.vapidPublicKey = process.env.VAPID_PUBLIC_KEY!;
    this.vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;
    this.vapidSubject = process.env.VAPID_SUBJECT!;
  }

  /**
   * Generate VAPID keys (for initial setup)
   */
  static generateVAPIDKeys(): { publicKey: string; privateKey: string } {
    // This would use the web-push library to generate keys
    // For now, return placeholder
    return {
      publicKey: 'VAPID_PUBLIC_KEY_PLACEHOLDER',
      privateKey: 'VAPID_PRIVATE_KEY_PLACEHOLDER',
    };
  }

  /**
   * Subscribe user to push notifications
   */
  async subscribeUser(
    userId: string,
    subscription: PushSubscription,
    preferences?: Partial<UserNotificationPreferences>
  ): Promise<void> {
    try {
      // Store subscription in database
      await this.storeSubscription(userId, subscription);
      
      // Set default preferences if not provided
      const defaultPreferences: UserNotificationPreferences = {
        userId,
        enabled: true,
        categories: {
          marketing: true,
          orders: true,
          affiliate: true,
          radio: true,
          drops: true,
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
          timezone: 'Europe/London',
        },
        ...preferences,
      };

      await this.updateUserPreferences(userId, defaultPreferences);

      // Send welcome notification
      await this.sendNotification(userId, {
        title: 'Welcome to HOTMESS!',
        body: 'You\'ll now receive updates about drops, radio shows, and your affiliate earnings.',
        icon: '/icons/hotmess-icon-192.png',
        badge: '/icons/hotmess-badge-72.png',
        tag: 'welcome',
      });
    } catch (error) {
      console.error('Failed to subscribe user:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe user from push notifications
   */
  async unsubscribeUser(userId: string): Promise<void> {
    try {
      // Remove subscription from database
      await this.removeSubscription(userId);
      
      // Update preferences to disabled
      await this.updateUserPreferences(userId, { enabled: false } as any);
    } catch (error) {
      console.error('Failed to unsubscribe user:', error);
      throw error;
    }
  }

  /**
   * Send notification to specific user
   */
  async sendNotification(
    userId: string,
    payload: NotificationPayload
  ): Promise<boolean> {
    try {
      // Get user subscription and preferences
      const subscription = await this.getUserSubscription(userId);
      const preferences = await this.getUserPreferences(userId);

      if (!subscription || !preferences.enabled) {
        return false;
      }

      // Check quiet hours
      if (this.isInQuietHours(preferences.quietHours)) {
        // Schedule for later or skip non-urgent notifications
        if (!payload.requireInteraction) {
          return false;
        }
      }

      // Send push notification using web-push library
      const webpush = await import('web-push');
      
      webpush.setVapidDetails(
        this.vapidSubject,
        this.vapidPublicKey,
        this.vapidPrivateKey
      );

      const notificationPayload = JSON.stringify({
        ...payload,
        timestamp: payload.timestamp || Date.now(),
      });

      await webpush.sendNotification(subscription, notificationPayload);
      
      // Log notification
      await this.logNotification(userId, payload);

      return true;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  /**
   * Send notification to multiple users
   */
  async sendBulkNotification(
    userIds: string[],
    payload: NotificationPayload,
    options?: {
      batchSize?: number;
      delayMs?: number;
    }
  ): Promise<{ sent: number; failed: number }> {
    const batchSize = options?.batchSize || 100;
    const delayMs = options?.delayMs || 100;
    
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      
      const promises = batch.map(async (userId) => {
        try {
          const success = await this.sendNotification(userId, payload);
          return success ? 'sent' : 'failed';
        } catch (error) {
          return 'failed';
        }
      });

      const results = await Promise.all(promises);
      sent += results.filter(r => r === 'sent').length;
      failed += results.filter(r => r === 'failed').length;

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < userIds.length && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    return { sent, failed };
  }

  /**
   * Send notification by category
   */
  async sendCategoryNotification(
    category: keyof UserNotificationPreferences['categories'],
    payload: NotificationPayload,
    filters?: {
      userRole?: string;
      affiliateCode?: string;
      location?: string;
    }
  ): Promise<{ sent: number; failed: number }> {
    try {
      // Get all users subscribed to this category
      const userIds = await this.getUsersByCategory(category, filters);
      
      return await this.sendBulkNotification(userIds, payload);
    } catch (error) {
      console.error('Failed to send category notification:', error);
      return { sent: 0, failed: 0 };
    }
  }

  /**
   * Update user notification preferences
   */
  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserNotificationPreferences>
  ): Promise<void> {
    try {
      // Update in database
      await this.storeUserPreferences(userId, preferences);
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      throw error;
    }
  }

  /**
   * Get user notification preferences
   */
  async getUserPreferences(userId: string): Promise<UserNotificationPreferences> {
    try {
      // Fetch from database - placeholder implementation
      return {
        userId,
        enabled: true,
        categories: {
          marketing: true,
          orders: true,
          affiliate: true,
          radio: true,
          drops: true,
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
          timezone: 'Europe/London',
        },
      };
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      throw error;
    }
  }

  /**
   * Check if current time is in user's quiet hours
   */
  private isInQuietHours(quietHours: UserNotificationPreferences['quietHours']): boolean {
    if (!quietHours.enabled) {
      return false;
    }

    try {
      const now = new Date();
      const timezone = quietHours.timezone;
      
      // Convert current time to user's timezone
      const userTime = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);

      const [currentHour, currentMinute] = userTime.split(':').map(Number);
      const currentTimeMinutes = currentHour * 60 + currentMinute;

      const [startHour, startMinute] = quietHours.start.split(':').map(Number);
      const startTimeMinutes = startHour * 60 + startMinute;

      const [endHour, endMinute] = quietHours.end.split(':').map(Number);
      const endTimeMinutes = endHour * 60 + endMinute;

      // Handle quiet hours that span midnight
      if (startTimeMinutes > endTimeMinutes) {
        return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
      } else {
        return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
      }
    } catch (error) {
      console.error('Error checking quiet hours:', error);
      return false;
    }
  }

  /**
   * Database operations (placeholder implementations)
   */
  private async storeSubscription(userId: string, subscription: PushSubscription): Promise<void> {
    // Implementation would store in database
    console.log('Storing subscription for user:', userId);
  }

  private async removeSubscription(userId: string): Promise<void> {
    // Implementation would remove from database
    console.log('Removing subscription for user:', userId);
  }

  private async getUserSubscription(userId: string): Promise<PushSubscription | null> {
    // Implementation would fetch from database
    return null;
  }

  private async storeUserPreferences(
    userId: string,
    preferences: Partial<UserNotificationPreferences>
  ): Promise<void> {
    // Implementation would store in database
    console.log('Storing preferences for user:', userId, preferences);
  }

  private async getUsersByCategory(
    category: keyof UserNotificationPreferences['categories'],
    filters?: any
  ): Promise<string[]> {
    // Implementation would query database
    return [];
  }

  private async logNotification(userId: string, payload: NotificationPayload): Promise<void> {
    // Implementation would log to database
    console.log('Logging notification:', userId, payload.title);
  }
}

// Initialize push notification service
export const pushNotificationService = new PushNotificationService();

/**
 * Predefined notification templates
 */
export const NotificationTemplates = {
  // Order notifications
  orderConfirmed: (orderNumber: string, amount: number): NotificationPayload => ({
    title: 'Order Confirmed!',
    body: `Your order #${orderNumber} for £${amount.toFixed(2)} has been confirmed.`,
    icon: '/icons/order-confirmed.png',
    tag: `order-${orderNumber}`,
    data: { type: 'order', orderNumber },
    actions: [
      { action: 'view', title: 'View Order' },
      { action: 'track', title: 'Track Package' },
    ],
  }),

  orderShipped: (orderNumber: string, trackingUrl?: string): NotificationPayload => ({
    title: 'Order Shipped!',
    body: `Your order #${orderNumber} is on its way.`,
    icon: '/icons/order-shipped.png',
    tag: `order-${orderNumber}`,
    data: { type: 'order', orderNumber, trackingUrl },
    actions: [
      { action: 'track', title: 'Track Package' },
    ],
  }),

  // Drop notifications
  newDrop: (productName: string, price: number): NotificationPayload => ({
    title: 'New Drop Alert!',
    body: `${productName} just dropped for £${price.toFixed(2)}. Get it before it's gone!`,
    icon: '/icons/new-drop.png',
    badge: '/icons/hotmess-badge-72.png',
    tag: 'new-drop',
    requireInteraction: true,
    data: { type: 'drop', productName },
    actions: [
      { action: 'view', title: 'View Drop' },
      { action: 'buy', title: 'Buy Now' },
    ],
  }),

  // Radio notifications
  radioLive: (showName: string, djName: string): NotificationPayload => ({
    title: 'HOTMESS RADIO is LIVE!',
    body: `${showName} with ${djName} is now playing.`,
    icon: '/icons/radio-live.png',
    tag: 'radio-live',
    data: { type: 'radio', showName, djName },
    actions: [
      { action: 'listen', title: 'Listen Now' },
    ],
  }),

  // Affiliate notifications
  affiliateEarning: (amount: number, referralName: string): NotificationPayload => ({
    title: 'You Earned a Commission!',
    body: `£${amount.toFixed(2)} earned from ${referralName}'s purchase.`,
    icon: '/icons/affiliate-earning.png',
    tag: 'affiliate-earning',
    data: { type: 'affiliate', amount },
    actions: [
      { action: 'view', title: 'View Earnings' },
    ],
  }),

  affiliatePayoutReady: (amount: number): NotificationPayload => ({
    title: 'Payout Ready!',
    body: `Your £${amount.toFixed(2)} affiliate payout is ready to withdraw.`,
    icon: '/icons/payout-ready.png',
    tag: 'payout-ready',
    requireInteraction: true,
    data: { type: 'payout', amount },
    actions: [
      { action: 'withdraw', title: 'Withdraw Now' },
    ],
  }),

  // Marketing notifications
  weeklyNewsletter: (subject: string): NotificationPayload => ({
    title: 'HOTMESS Weekly',
    body: subject,
    icon: '/icons/newsletter.png',
    tag: 'newsletter',
    data: { type: 'newsletter' },
    actions: [
      { action: 'read', title: 'Read Now' },
    ],
  }),

  // System notifications
  welcomeBack: (userName: string): NotificationPayload => ({
    title: `Welcome back, ${userName}!`,
    body: 'Check out what\'s new since your last visit.',
    icon: '/icons/welcome-back.png',
    tag: 'welcome-back',
    data: { type: 'system' },
  }),
};

/**
 * Client-side utilities for browser push notifications
 */
export const PushNotificationClient = {
  /**
   * Check if push notifications are supported
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 
           'serviceWorker' in navigator && 
           'PushManager' in window;
  },

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error('Push notifications not supported');
    }

    const permission = await Notification.requestPermission();
    return permission;
  },

  /**
   * Subscribe to push notifications
   */
  async subscribe(userId: string): Promise<PushSubscription | null> {
    try {
      if (!this.isSupported()) {
        throw new Error('Push notifications not supported');
      }

      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        return null;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      // Send subscription to server
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          subscription,
        }),
      });

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  },

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribe(userId: string): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
      }

      // Notify server
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      return true;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  },
};