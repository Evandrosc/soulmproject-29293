'use client';

import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';
import { initStorageCheck } from '@/utils/storageCheck';

export function ClientInit() {
  useEffect(() => {
    initStorageCheck();

    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    if (!clarityId) return;

    clarity.init(clarityId);
  }, []);

  return null;
}
