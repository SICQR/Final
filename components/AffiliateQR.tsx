"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Card } from '@/components/ui';

interface AffiliateQRProps {
  affiliateCode?: string;
}

export const AffiliateQR: React.FC<AffiliateQRProps> = ({
  affiliateCode = 'SAMPLE123'
}) => {
  const [copied, setCopied] = useState(false);
  const affiliateUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hotmessldn.com'}?ref=${affiliateCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  return (
    <Card variant="dark" className="mb-12">
      <h2 className="text-3xl font-heading font-bold mb-6 text-hung text-center">
        Scan. Grrr. Repeat.
      </h2>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Your link, your cut, your crown.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="text-center">
          <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
            <QRCodeSVG
              value={affiliateUrl}
              size={120}
              bgColor="white"
              fgColor="black"
              level="M"
              includeMargin={false}
            />
          </div>
          <p className="text-sm text-gray-400">Your unique QR code</p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400 mb-2">Commission Rate:</p>
          <p className="text-3xl font-bold text-hung mb-4">15%</p>
          
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border text-sm font-mono break-all">
              {affiliateUrl}
            </div>
            <Button 
              onClick={handleCopyLink}
              variant={copied ? "secondary" : "primary"}
              size="sm"
              className="w-full"
            >
              {copied ? "✓ Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};