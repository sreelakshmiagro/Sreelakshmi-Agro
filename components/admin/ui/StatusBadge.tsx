'use client';

import React from 'react';
import { clsx } from 'clsx';

export type StatusType = 'published' | 'draft' | 'archived' | 'closed' | 'pending' | 'unread' | 'submitted' | 'active' | 'inactive';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  
  let colorClass = 'bg-gray-100 text-gray-800'; // default
  
  switch (normalized) {
    case 'published':
    case 'active':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'draft':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'pending':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    case 'unread':
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'submitted':
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'archived':
    case 'closed':
    case 'inactive':
      colorClass = 'bg-gray-200 text-gray-700';
      break;
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        colorClass,
        className
      )}
    >
      {status}
    </span>
  );
}
