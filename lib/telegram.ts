/**
 * Telegram Integration Module for HOTMESS business suite
 * Handles bot interactions, affiliate system, internal chat rooms, and automated messaging
 */

interface TelegramConfig {
  botToken: string;
  botUsername: string;
  webhookUrl?: string;
  apiUrl?: string;
}

interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  entities?: Array<{
    type: string;
    offset: number;
    length: number;
    url?: string;
  }>;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: {
    id: string;
    from: TelegramUser;
    message?: TelegramMessage;
    data?: string;
  };
}

interface AffiliateData {
  userId: string;
  telegramId: number;
  affiliateCode: string;
  clicks: number;
  conversions: number;
  earnings: number;
  pendingPayout: number;
  totalPaid: number;
  joinDate: Date;
  isActive: boolean;
}

interface ChatRoom {
  id: string;
  telegramChatId: number;
  name: string;
  type: 'staff' | 'affiliates' | 'vip' | 'public';
  description?: string;
  isActive: boolean;
  memberCount: number;
  createdAt: Date;
}

export class TelegramBot {
  private config: TelegramConfig;
  private apiUrl: string;

  constructor(config: TelegramConfig) {
    this.config = config;
    this.apiUrl = config.apiUrl || `https://api.telegram.org/bot${config.botToken}`;
  }

  /**
   * Send message to Telegram chat
   */
  async sendMessage(
    chatId: number | string,
    text: string,
    options?: {
      parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
      disable_web_page_preview?: boolean;
      disable_notification?: boolean;
      reply_to_message_id?: number;
      reply_markup?: any;
    }
  ): Promise<TelegramMessage> {
    const response = await fetch(`${this.apiUrl}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        ...options,
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`);
    }

    return data.result;
  }

  /**
   * Send photo to Telegram chat
   */
  async sendPhoto(
    chatId: number | string,
    photo: string,
    options?: {
      caption?: string;
      parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
      disable_notification?: boolean;
      reply_to_message_id?: number;
      reply_markup?: any;
    }
  ): Promise<TelegramMessage> {
    const response = await fetch(`${this.apiUrl}/sendPhoto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        photo,
        ...options,
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`);
    }

    return data.result;
  }

  /**
   * Set webhook for receiving updates
   */
  async setWebhook(url: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        allowed_updates: ['message', 'callback_query'],
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Failed to set webhook: ${data.description}`);
    }
  }

  /**
   * Get chat member information
   */
  async getChatMember(chatId: number | string, userId: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/getChatMember`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        user_id: userId,
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`);
    }

    return data.result;
  }

  /**
   * Create invite link for chat
   */
  async createChatInviteLink(
    chatId: number | string,
    options?: {
      name?: string;
      expire_date?: number;
      member_limit?: number;
      creates_join_request?: boolean;
    }
  ): Promise<{ invite_link: string; name?: string; expire_date?: number }> {
    const response = await fetch(`${this.apiUrl}/createChatInviteLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        ...options,
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`);
    }

    return data.result;
  }
}

export class TelegramAffiliateSystem {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  /**
   * Process /claim command to create affiliate account
   */
  async processClaim(telegramUser: TelegramUser, chatId: number): Promise<void> {
    try {
      // Check if user already has an affiliate account
      const existingAffiliate = await this.getAffiliateByTelegramId(telegramUser.id);
      
      if (existingAffiliate) {
        await this.bot.sendMessage(
          chatId,
          `🎯 You already have an affiliate account!\n\n` +
          `📊 Your Code: \`${existingAffiliate.affiliateCode}\`\n` +
          `💰 Total Earnings: £${existingAffiliate.earnings.toFixed(2)}\n` +
          `🔗 Clicks: ${existingAffiliate.clicks}\n` +
          `✅ Conversions: ${existingAffiliate.conversions}\n\n` +
          `Share your link: https://hotmess.com/?ref=${existingAffiliate.affiliateCode}`,
          { parse_mode: 'Markdown' }
        );
        return;
      }

      // Generate unique affiliate code
      const affiliateCode = await this.generateAffiliateCode(telegramUser);
      
      // Create affiliate account
      const affiliateData: AffiliateData = {
        userId: `telegram_${telegramUser.id}`,
        telegramId: telegramUser.id,
        affiliateCode,
        clicks: 0,
        conversions: 0,
        earnings: 0,
        pendingPayout: 0,
        totalPaid: 0,
        joinDate: new Date(),
        isActive: true,
      };

      await this.saveAffiliate(affiliateData);

      // Send welcome message with affiliate details
      const welcomeMessage = `
🎉 *Welcome to HOTMESS Affiliate Program!*

Your affiliate account has been created successfully!

📊 *Your Details:*
🆔 Code: \`${affiliateCode}\`
🔗 Your Link: https://hotmess.com/?ref=${affiliateCode}
💰 Commission Rate: 15%
💸 Minimum Payout: £25

📈 *How it works:*
1. Share your unique link
2. Earn 15% on every sale
3. Get paid monthly (minimum £25)
4. Track earnings in real-time

🎯 *Quick Commands:*
/stats - View your statistics
/payout - Request payout
/link - Get your affiliate link
/help - Show all commands

Start earning now! Share your link and watch the money roll in. 💪
      `.trim();

      await this.bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });

      // Add to affiliate chat room
      await this.addToAffiliateRoom(telegramUser.id);

    } catch (error) {
      console.error('Error processing claim:', error);
      await this.bot.sendMessage(
        chatId,
        '❌ Sorry, there was an error creating your affiliate account. Please try again later.'
      );
    }
  }

  /**
   * Process /stats command to show affiliate statistics
   */
  async processStats(telegramId: number, chatId: number): Promise<void> {
    try {
      const affiliate = await this.getAffiliateByTelegramId(telegramId);
      
      if (!affiliate) {
        await this.bot.sendMessage(
          chatId,
          '❌ You don\'t have an affiliate account. Use /claim to get started!'
        );
        return;
      }

      const conversionRate = affiliate.clicks > 0 ? (affiliate.conversions / affiliate.clicks * 100).toFixed(1) : '0.0';
      const avgEarningsPerConversion = affiliate.conversions > 0 ? (affiliate.earnings / affiliate.conversions).toFixed(2) : '0.00';

      const statsMessage = `
📊 *Your Affiliate Stats*

🆔 Code: \`${affiliate.affiliateCode}\`
📅 Member since: ${affiliate.joinDate.toLocaleDateString()}

📈 *Performance:*
🔗 Total Clicks: ${affiliate.clicks.toLocaleString()}
✅ Conversions: ${affiliate.conversions.toLocaleString()}
📊 Conversion Rate: ${conversionRate}%
💰 Total Earnings: £${affiliate.earnings.toFixed(2)}

💸 *Payouts:*
⏳ Pending: £${affiliate.pendingPayout.toFixed(2)}
✅ Total Paid: £${affiliate.totalPaid.toFixed(2)}
📊 Avg per Sale: £${avgEarningsPerConversion}

🎯 *Quick Actions:*
/link - Get your affiliate link
/payout - Request payout (min £25)
/leaderboard - See top affiliates
      `.trim();

      await this.bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error processing stats:', error);
      await this.bot.sendMessage(
        chatId,
        '❌ Sorry, there was an error fetching your stats. Please try again later.'
      );
    }
  }

  /**
   * Process /payout command to request payout
   */
  async processPayout(telegramId: number, chatId: number): Promise<void> {
    try {
      const affiliate = await this.getAffiliateByTelegramId(telegramId);
      
      if (!affiliate) {
        await this.bot.sendMessage(
          chatId,
          '❌ You don\'t have an affiliate account. Use /claim to get started!'
        );
        return;
      }

      if (affiliate.pendingPayout < 25) {
        await this.bot.sendMessage(
          chatId,
          `💸 *Payout Request*\n\n` +
          `Current Balance: £${affiliate.pendingPayout.toFixed(2)}\n` +
          `Minimum Payout: £25.00\n\n` +
          `❌ You need £${(25 - affiliate.pendingPayout).toFixed(2)} more to request a payout.\n\n` +
          `Keep sharing your link to reach the minimum! 💪`,
          { parse_mode: 'Markdown' }
        );
        return;
      }

      // Create payout request
      await this.createPayoutRequest(affiliate);

      const payoutMessage = `
✅ *Payout Request Submitted!*

💰 Amount: £${affiliate.pendingPayout.toFixed(2)}
⏰ Processing Time: 3-5 business days
📧 You'll receive confirmation via email

Your payout will be processed by our team and sent to your registered payment method.

Need help? Contact @HOTMESSSupport
      `.trim();

      await this.bot.sendMessage(chatId, payoutMessage, { parse_mode: 'Markdown' });

      // Notify admin channel
      await this.notifyPayoutRequest(affiliate);

    } catch (error) {
      console.error('Error processing payout:', error);
      await this.bot.sendMessage(
        chatId,
        '❌ Sorry, there was an error processing your payout request. Please try again later.'
      );
    }
  }

  /**
   * Generate unique affiliate code
   */
  private async generateAffiliateCode(telegramUser: TelegramUser): Promise<string> {
    const baseCode = telegramUser.username || 
                    `${telegramUser.first_name}${telegramUser.id}`.replace(/[^a-zA-Z0-9]/g, '');
    
    // Ensure uniqueness
    let counter = 0;
    let code = baseCode.toUpperCase().substring(0, 8);
    
    while (await this.isCodeTaken(code)) {
      counter++;
      code = `${baseCode.substring(0, 6)}${counter}`.toUpperCase();
    }
    
    return code;
  }

  /**
   * Database operations (placeholder implementations)
   */
  private async getAffiliateByTelegramId(telegramId: number): Promise<AffiliateData | null> {
    // Implementation would query database
    return null;
  }

  private async saveAffiliate(affiliate: AffiliateData): Promise<void> {
    // Implementation would save to database
    console.log('Saving affiliate:', affiliate);
  }

  private async isCodeTaken(code: string): Promise<boolean> {
    // Implementation would check database
    return false;
  }

  private async createPayoutRequest(affiliate: AffiliateData): Promise<void> {
    // Implementation would create payout request in database
    console.log('Creating payout request for:', affiliate.affiliateCode);
  }

  private async notifyPayoutRequest(affiliate: AffiliateData): Promise<void> {
    // Notify admin about new payout request
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (adminChatId) {
      await this.bot.sendMessage(
        adminChatId,
        `💸 New payout request:\n\n` +
        `Affiliate: ${affiliate.affiliateCode}\n` +
        `Amount: £${affiliate.pendingPayout.toFixed(2)}\n` +
        `Telegram ID: ${affiliate.telegramId}`
      );
    }
  }

  private async addToAffiliateRoom(telegramId: number): Promise<void> {
    // Add user to affiliate chat room
    const affiliateRoomId = process.env.TELEGRAM_AFFILIATE_ROOM_ID;
    if (affiliateRoomId) {
      try {
        const inviteLink = await this.bot.createChatInviteLink(affiliateRoomId, {
          member_limit: 1,
          creates_join_request: false,
        });
        
        await this.bot.sendMessage(
          telegramId,
          `🎉 You've been invited to the HOTMESS Affiliate Room!\n\n` +
          `Join here: ${inviteLink.invite_link}\n\n` +
          `Connect with other affiliates, get tips, and stay updated on new drops!`
        );
      } catch (error) {
        console.error('Failed to add to affiliate room:', error);
      }
    }
  }
}

export class TelegramChatRooms {
  private bot: TelegramBot;
  
  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  /**
   * Get all chat rooms
   */
  async getChatRooms(): Promise<ChatRoom[]> {
    // Implementation would fetch from database
    return [
      {
        id: 'staff',
        telegramChatId: -1001234567890,
        name: 'HOTMESS Staff',
        type: 'staff',
        description: 'Internal staff communications',
        isActive: true,
        memberCount: 15,
        createdAt: new Date(),
      },
      {
        id: 'affiliates',
        telegramChatId: -1001234567891,
        name: 'HOTMESS Affiliates',
        type: 'affiliates',
        description: 'Affiliate community and support',
        isActive: true,
        memberCount: 89,
        createdAt: new Date(),
      },
    ];
  }

  /**
   * Broadcast message to specific room type
   */
  async broadcastToRoom(
    roomType: ChatRoom['type'],
    message: string,
    options?: { parse_mode?: 'HTML' | 'Markdown' }
  ): Promise<void> {
    const rooms = await this.getChatRooms();
    const targetRooms = rooms.filter(room => room.type === roomType && room.isActive);

    for (const room of targetRooms) {
      try {
        await this.bot.sendMessage(room.telegramChatId, message, options);
      } catch (error) {
        console.error(`Failed to send message to room ${room.name}:`, error);
      }
    }
  }

  /**
   * Send new drop alert to affiliates
   */
  async notifyNewDrop(product: {
    name: string;
    price: number;
    image: string;
    url: string;
  }): Promise<void> {
    const message = `
🔥 *NEW DROP ALERT!* 🔥

🛍️ ${product.name}
💰 £${product.price.toFixed(2)}

Get your affiliate links ready! This is going to be HOT! 🚀

👉 Shop: ${product.url}
    `.trim();

    await this.broadcastToRoom('affiliates', message, { parse_mode: 'Markdown' });
    
    // Also send photo if available
    if (product.image) {
      try {
        await this.bot.sendPhoto(
          process.env.TELEGRAM_AFFILIATE_ROOM_ID!,
          product.image,
          { caption: `🔥 ${product.name} - £${product.price.toFixed(2)}` }
        );
      } catch (error) {
        console.error('Failed to send product image:', error);
      }
    }
  }

  /**
   * Send radio show notification
   */
  async notifyRadioShow(show: {
    name: string;
    dj: string;
    startTime: Date;
    streamUrl: string;
  }): Promise<void> {
    const message = `
📻 *HOTMESS RADIO GOING LIVE!* 📻

🎵 Show: ${show.name}
👨‍💼 DJ: ${show.dj}
⏰ Starting: ${show.startTime.toLocaleString('en-GB')}

Tune in now! 🎧

👉 Listen: ${show.streamUrl}
    `.trim();

    await this.broadcastToRoom('public', message, { parse_mode: 'Markdown' });
  }
}

// Initialize Telegram bot and services
export const telegramBot = new TelegramBot({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  botUsername: process.env.TELEGRAM_BOT_USERNAME!,
  webhookUrl: process.env.TELEGRAM_WEBHOOK_URL,
});

export const telegramAffiliateSystem = new TelegramAffiliateSystem(telegramBot);
export const telegramChatRooms = new TelegramChatRooms(telegramBot);

/**
 * Utility functions for Telegram integration
 */
export const TelegramUtils = {
  /**
   * Format message for Telegram Markdown
   */
  formatMarkdown(text: string): string {
    return text
      .replace(/\*/g, '\\*')
      .replace(/_/g, '\\_')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/~/g, '\\~')
      .replace(/`/g, '\\`')
      .replace(/>/g, '\\>')
      .replace(/#/g, '\\#')
      .replace(/\+/g, '\\+')
      .replace(/-/g, '\\-')
      .replace(/=/g, '\\=')
      .replace(/\|/g, '\\|')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\./g, '\\.')
      .replace(/!/g, '\\!');
  },

  /**
   * Create inline keyboard
   */
  createInlineKeyboard(buttons: Array<Array<{ text: string; url?: string; callback_data?: string }>>): any {
    return {
      reply_markup: {
        inline_keyboard: buttons,
      },
    };
  },

  /**
   * Parse Telegram command
   */
  parseCommand(text: string): { command: string; args: string[] } {
    const parts = text.trim().split(' ');
    const command = parts[0].toLowerCase().replace('/', '');
    const args = parts.slice(1);
    
    return { command, args };
  },
};