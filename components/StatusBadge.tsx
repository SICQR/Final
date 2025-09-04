import React from 'react';

type Props = { label: string; up?: boolean };
export default function StatusBadge({ label, up = true }: Props) {
  const color = up ? 'bg-green-600' : 'bg-red-600';
  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full ${color}`}>
      {label}: {up ? 'UP' : 'DOWN'}
    </span>
  );
}
