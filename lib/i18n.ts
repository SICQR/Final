/**
 * Internationalization (i18n) Module for HOTMESS business suite
 * Multi-language support, currency localization, and regional compliance
 */

interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number;
  decimalPlaces: number;
}

interface Region {
  code: string;
  name: string;
  languages: string[];
  currency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
  compliance: {
    ageGate: boolean;
    minimumAge: number;
    gdprRequired: boolean;
    cookieConsent: boolean;
    dataRetention: number; // days
  };
}

interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  [languageCode: string]: Translation;
}

export class InternationalizationManager {
  private translations: Translations = {};
  private currentLanguage: string = 'en';
  private currentRegion: string = 'GB';
  private fallbackLanguage: string = 'en';
  private baseCurrency: string = 'GBP';

  // Supported languages
  private languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', rtl: false, flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false, flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', rtl: false, flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false, flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', rtl: false, flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false, flag: '🇵🇹' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', rtl: false, flag: '🇳🇱' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false, flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', rtl: false, flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false, flag: '🇨🇳' },
  ];

  // Supported currencies
  private currencies: Currency[] = [
    { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 1.0, decimalPlaces: 2 },
    { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1.27, decimalPlaces: 2 },
    { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 1.16, decimalPlaces: 2 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.71, decimalPlaces: 2 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.96, decimalPlaces: 2 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 188.0, decimalPlaces: 0 },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', exchangeRate: 1.11, decimalPlaces: 2 },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', exchangeRate: 13.5, decimalPlaces: 2 },
  ];

  // Regional configurations
  private regions: Region[] = [
    {
      code: 'GB',
      name: 'United Kingdom',
      languages: ['en'],
      currency: 'GBP',
      timezone: 'Europe/London',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: '1,234.56',
      compliance: {
        ageGate: true,
        minimumAge: 18,
        gdprRequired: true,
        cookieConsent: true,
        dataRetention: 730,
      },
    },
    {
      code: 'US',
      name: 'United States',
      languages: ['en'],
      currency: 'USD',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      numberFormat: '1,234.56',
      compliance: {
        ageGate: true,
        minimumAge: 21,
        gdprRequired: false,
        cookieConsent: true,
        dataRetention: 365,
      },
    },
    {
      code: 'EU',
      name: 'European Union',
      languages: ['en', 'de', 'fr', 'es', 'it', 'nl'],
      currency: 'EUR',
      timezone: 'Europe/Berlin',
      dateFormat: 'DD.MM.YYYY',
      numberFormat: '1.234,56',
      compliance: {
        ageGate: true,
        minimumAge: 18,
        gdprRequired: true,
        cookieConsent: true,
        dataRetention: 730,
      },
    },
    {
      code: 'CA',
      name: 'Canada',
      languages: ['en', 'fr'],
      currency: 'CAD',
      timezone: 'America/Toronto',
      dateFormat: 'YYYY-MM-DD',
      numberFormat: '1,234.56',
      compliance: {
        ageGate: true,
        minimumAge: 19,
        gdprRequired: false,
        cookieConsent: true,
        dataRetention: 365,
      },
    },
  ];

  constructor() {
    this.loadTranslations();
    this.detectUserPreferences();
  }

  /**
   * Load translations for all supported languages
   */
  private async loadTranslations(): Promise<void> {
    // Load base translations
    this.translations = {
      en: {
        common: {
          welcome: 'Welcome',
          loading: 'Loading...',
          error: 'Error',
          success: 'Success',
          save: 'Save',
          cancel: 'Cancel',
          continue: 'Continue',
          back: 'Back',
          next: 'Next',
          finish: 'Finish',
          close: 'Close',
          edit: 'Edit',
          delete: 'Delete',
          confirm: 'Confirm',
          yes: 'Yes',
          no: 'No',
        },
        navigation: {
          home: 'Home',
          radio: 'Radio',
          shop: 'Shop',
          affiliate: 'Affiliate',
          about: 'About',
          contact: 'Contact',
          login: 'Login',
          logout: 'Logout',
          account: 'Account',
          settings: 'Settings',
        },
        homepage: {
          title: 'Always too much, never enough.',
          subtitle: 'Shop limited drops, stream HOTMESS RADIO, and earn with every scan.',
          description: 'For the boys who stayed up, stayed soft, and still showed up. HNHMESS: aftercare, not afterthought.',
          listenLive: 'Listen Live',
          shopDrops: 'Shop Drops',
          joinRoom: 'Join the Room',
        },
        radio: {
          title: 'HOTMESS RADIO',
          subtitle: "London's Filth Frequency. Live now.",
          nowPlaying: 'Now Playing',
          upNext: 'Up Next',
          schedule: 'Schedule',
          pastShows: 'Past Shows',
        },
        shop: {
          title: 'Drops',
          subtitle: 'RAW / HUNG / HIGH / SUPER — limited, loud, lethal.',
          addToCart: 'Add to Cart',
          buyNow: 'Buy Now',
          soldOut: 'Sold Out',
          price: 'Price',
          size: 'Size',
          color: 'Color',
          quantity: 'Quantity',
          cart: 'Cart',
          checkout: 'Checkout',
        },
        affiliate: {
          title: 'Earn with your mess.',
          subtitle: 'No pyramid. Just scans and real cuts.',
          getStarted: 'Get Started',
          earnings: 'Earnings',
          stats: 'Stats',
          payout: 'Payout',
          referrals: 'Referrals',
          commission: 'Commission',
          minimumPayout: 'Minimum Payout',
        },
        compliance: {
          ageGate: {
            title: 'Age Verification Required',
            subtitle: 'You must be {age} or older to access this content.',
            dateOfBirth: 'Date of Birth',
            verify: 'Verify Age',
            error: 'You must be at least {age} years old to access this site.',
          },
          cookies: {
            title: 'We use cookies',
            message: 'This site uses cookies to enhance your experience and for analytics.',
            accept: 'Accept All',
            reject: 'Reject',
            customize: 'Customize',
            necessary: 'Necessary',
            analytics: 'Analytics',
            marketing: 'Marketing',
          },
          privacy: {
            title: 'Privacy Policy',
            lastUpdated: 'Last updated: {date}',
            dataCollection: 'Data Collection',
            dataUsage: 'Data Usage',
            dataSharing: 'Data Sharing',
            yourRights: 'Your Rights',
          },
        },
      },
      es: {
        common: {
          welcome: 'Bienvenido',
          loading: 'Cargando...',
          error: 'Error',
          success: 'Éxito',
          save: 'Guardar',
          cancel: 'Cancelar',
          continue: 'Continuar',
          back: 'Atrás',
          next: 'Siguiente',
          finish: 'Finalizar',
          close: 'Cerrar',
          edit: 'Editar',
          delete: 'Eliminar',
          confirm: 'Confirmar',
          yes: 'Sí',
          no: 'No',
        },
        navigation: {
          home: 'Inicio',
          radio: 'Radio',
          shop: 'Tienda',
          affiliate: 'Afiliado',
          about: 'Acerca de',
          contact: 'Contacto',
          login: 'Iniciar sesión',
          logout: 'Cerrar sesión',
          account: 'Cuenta',
          settings: 'Configuración',
        },
        homepage: {
          title: 'Siempre demasiado, nunca suficiente.',
          subtitle: 'Compra lanzamientos limitados, escucha HOTMESS RADIO y gana con cada escaneo.',
          description: 'Para los chicos que se quedaron despiertos, se mantuvieron suaves y aún así aparecieron.',
          listenLive: 'Escuchar en Vivo',
          shopDrops: 'Comprar Lanzamientos',
          joinRoom: 'Únete a la Sala',
        },
        // ... more Spanish translations
      },
      fr: {
        common: {
          welcome: 'Bienvenue',
          loading: 'Chargement...',
          error: 'Erreur',
          success: 'Succès',
          save: 'Enregistrer',
          cancel: 'Annuler',
          continue: 'Continuer',
          back: 'Retour',
          next: 'Suivant',
          finish: 'Terminer',
          close: 'Fermer',
          edit: 'Modifier',
          delete: 'Supprimer',
          confirm: 'Confirmer',
          yes: 'Oui',
          no: 'Non',
        },
        // ... more French translations
      },
      // ... other languages would be loaded here
    };
  }

  /**
   * Detect user preferences from browser/location
   */
  private detectUserPreferences(): void {
    if (typeof window !== 'undefined') {
      // Detect language
      const browserLanguage = navigator.language.split('-')[0];
      if (this.languages.find(lang => lang.code === browserLanguage)) {
        this.currentLanguage = browserLanguage;
      }

      // Try to detect region from timezone
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const region = this.regions.find(r => r.timezone === timezone);
        if (region) {
          this.currentRegion = region.code;
        }
      } catch (error) {
        console.warn('Could not detect timezone:', error);
      }

      // Load from localStorage if available
      const savedLanguage = localStorage.getItem('hotmess_language');
      const savedRegion = localStorage.getItem('hotmess_region');
      
      if (savedLanguage && this.languages.find(lang => lang.code === savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
      
      if (savedRegion && this.regions.find(region => region.code === savedRegion)) {
        this.currentRegion = savedRegion;
      }
    }
  }

  /**
   * Get translated string
   */
  public t(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let translation: any = this.translations[this.currentLanguage];
    
    // Navigate through nested keys
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to default language
        translation = this.translations[this.fallbackLanguage];
        for (const fallbackKey of keys) {
          if (translation && typeof translation === 'object' && fallbackKey in translation) {
            translation = translation[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }

    if (typeof translation !== 'string') {
      return key;
    }

    // Replace parameters
    if (params) {
      return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }

    return translation;
  }

  /**
   * Set current language
   */
  public setLanguage(languageCode: string): void {
    if (this.languages.find(lang => lang.code === languageCode)) {
      this.currentLanguage = languageCode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('hotmess_language', languageCode);
        document.documentElement.lang = languageCode;
        
        // Update text direction if needed
        const language = this.languages.find(lang => lang.code === languageCode);
        if (language) {
          document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
        }
      }
    }
  }

  /**
   * Set current region
   */
  public setRegion(regionCode: string): void {
    if (this.regions.find(region => region.code === regionCode)) {
      this.currentRegion = regionCode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('hotmess_region', regionCode);
      }
    }
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): Language {
    return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0];
  }

  /**
   * Get current region
   */
  public getCurrentRegion(): Region {
    return this.regions.find(region => region.code === this.currentRegion) || this.regions[0];
  }

  /**
   * Get all supported languages
   */
  public getSupportedLanguages(): Language[] {
    return this.languages;
  }

  /**
   * Get all supported regions
   */
  public getSupportedRegions(): Region[] {
    return this.regions;
  }

  /**
   * Format currency
   */
  public formatCurrency(amount: number, currencyCode?: string): string {
    const currentRegion = this.getCurrentRegion();
    const targetCurrency = currencyCode || currentRegion.currency;
    const currency = this.currencies.find(c => c.code === targetCurrency);
    
    if (!currency) {
      return `${amount.toFixed(2)}`;
    }

    // Convert from base currency if needed
    let convertedAmount = amount;
    if (targetCurrency !== this.baseCurrency) {
      convertedAmount = amount * currency.exchangeRate;
    }

    // Format based on locale
    try {
      return new Intl.NumberFormat(this.getLocaleCode(), {
        style: 'currency',
        currency: targetCurrency,
        minimumFractionDigits: currency.decimalPlaces,
        maximumFractionDigits: currency.decimalPlaces,
      }).format(convertedAmount);
    } catch (error) {
      // Fallback formatting
      return `${currency.symbol}${convertedAmount.toFixed(currency.decimalPlaces)}`;
    }
  }

  /**
   * Format number
   */
  public formatNumber(number: number): string {
    try {
      return new Intl.NumberFormat(this.getLocaleCode()).format(number);
    } catch (error) {
      return number.toString();
    }
  }

  /**
   * Format date
   */
  public formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    try {
      return new Intl.DateTimeFormat(this.getLocaleCode(), {
        timeZone: this.getCurrentRegion().timezone,
        ...options,
      }).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  }

  /**
   * Format relative time
   */
  public formatRelativeTime(date: Date): string {
    try {
      const rtf = new Intl.RelativeTimeFormat(this.getLocaleCode(), { numeric: 'auto' });
      const now = new Date();
      const diffInSeconds = (date.getTime() - now.getTime()) / 1000;
      
      if (Math.abs(diffInSeconds) < 60) {
        return rtf.format(Math.round(diffInSeconds), 'second');
      } else if (Math.abs(diffInSeconds) < 3600) {
        return rtf.format(Math.round(diffInSeconds / 60), 'minute');
      } else if (Math.abs(diffInSeconds) < 86400) {
        return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
      } else {
        return rtf.format(Math.round(diffInSeconds / 86400), 'day');
      }
    } catch (error) {
      return date.toLocaleDateString();
    }
  }

  /**
   * Get locale code for Intl APIs
   */
  private getLocaleCode(): string {
    const language = this.getCurrentLanguage();
    const region = this.getCurrentRegion();
    return `${language.code}-${region.code}`;
  }

  /**
   * Get compliance settings for current region
   */
  public getComplianceSettings(): Region['compliance'] {
    return this.getCurrentRegion().compliance;
  }

  /**
   * Check if feature is enabled for current region
   */
  public isFeatureEnabled(feature: keyof Region['compliance']): boolean {
    const compliance = this.getComplianceSettings();
    return compliance[feature] as boolean;
  }

  /**
   * Get available currencies for current region
   */
  public getAvailableCurrencies(): Currency[] {
    // For now, return all currencies. Could be filtered by region in the future.
    return this.currencies;
  }

  /**
   * Update exchange rates
   */
  public async updateExchangeRates(): Promise<void> {
    try {
      // In a real implementation, this would fetch from a currency API
      // For now, we'll use static rates
      console.log('Exchange rates updated');
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
    }
  }

  /**
   * Pluralize strings based on count
   */
  public plural(key: string, count: number, params?: Record<string, any>): string {
    // Simple pluralization - would need more sophisticated rules for different languages
    const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`;
    return this.t(pluralKey, { count, ...params });
  }

  /**
   * Get RTL status for current language
   */
  public isRTL(): boolean {
    return this.getCurrentLanguage().rtl;
  }

  /**
   * Export translations for a specific language
   */
  public exportTranslations(languageCode: string): Translation | null {
    return this.translations[languageCode] || null;
  }

  /**
   * Import translations for a specific language
   */
  public importTranslations(languageCode: string, translations: Translation): void {
    this.translations[languageCode] = translations;
  }
}

// Create global instance
export const i18n = new InternationalizationManager();

// React hooks for i18n
export function useTranslation() {
  return {
    t: (key: string, params?: Record<string, any>) => i18n.t(key, params),
    currentLanguage: i18n.getCurrentLanguage(),
    currentRegion: i18n.getCurrentRegion(),
    setLanguage: (code: string) => i18n.setLanguage(code),
    setRegion: (code: string) => i18n.setRegion(code),
    formatCurrency: (amount: number, currency?: string) => i18n.formatCurrency(amount, currency),
    formatNumber: (number: number) => i18n.formatNumber(number),
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => i18n.formatDate(date, options),
    formatRelativeTime: (date: Date) => i18n.formatRelativeTime(date),
    isRTL: () => i18n.isRTL(),
    compliance: i18n.getComplianceSettings(),
  };
}