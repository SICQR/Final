"use client";

import QRCodeGenerator from "@/components/QRCodeGenerator";

interface DropQRCodeProps {
  value: string;
}

export default function DropQRCode({ value }: DropQRCodeProps) {
  return <QRCodeGenerator value={value} />;
}
