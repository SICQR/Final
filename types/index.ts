export interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  description?: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: boolean;
  };
  category: 'raw' | 'hung' | 'high' | 'super';
  inStock: boolean;
}

export interface Page {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: any[]; // Portable text content
}

export interface AffiliateLink {
  id: string;
  userId: string;
  code: string;
  qrCode?: string;
  clicks: number;
  conversions: number;
  commission: number;
  createdAt: string;
}

export interface RadioShow {
  id: string;
  title: string;
  description: string;
  schedule: {
    day: string;
    time: string;
    duration: number;
  };
  dj: string;
  isLive: boolean;
  streamUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}