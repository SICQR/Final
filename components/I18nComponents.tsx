'use client';

import React from 'react';
import { useTranslation, i18n } from '../lib/i18n';

// Language selector component
export function LanguageSelector({ 
  className = '',
  showFlags = true,
  showNativeNames = true,
}: {
  className?: string;
  showFlags?: boolean;
  showNativeNames?: boolean;
}) {
  const { currentLanguage, setLanguage } = useTranslation();
  const languages = i18n.getSupportedLanguages();

  return (
    <select
      value={currentLanguage.code}
      onChange={(e) => setLanguage(e.target.value)}
      className={`bg-gray-800 border border-gray-700 rounded text-white ${className}`}
    >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {showFlags && `${language.flag} `}
          {showNativeNames ? language.nativeName : language.name}
        </option>
      ))}
    </select>
  );
}

// Region selector component
export function RegionSelector({ 
  className = '',
}: {
  className?: string;
}) {
  const { currentRegion, setRegion } = useTranslation();
  const regions = i18n.getSupportedRegions();

  return (
    <select
      value={currentRegion.code}
      onChange={(e) => setRegion(e.target.value)}
      className={`bg-gray-800 border border-gray-700 rounded text-white ${className}`}
    >
      {regions.map((region) => (
        <option key={region.code} value={region.code}>
          {region.name}
        </option>
      ))}
    </select>
  );
}