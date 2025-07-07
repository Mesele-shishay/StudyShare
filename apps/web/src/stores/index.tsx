'use client';

import {useEffect} from 'react';
import {useTabStore} from './useTabStore';
import {useWishlistStore} from './useWishlistStore';
import {useAuthStore} from './useAuthStore';

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  useEffect(() => {
    // Hydrate stores on client side
    useWishlistStore.persist.rehydrate();
    useTabStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
};

export {useWishlistStore, useTabStore, useAuthStore};
