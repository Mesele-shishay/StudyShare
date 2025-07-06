'use client';

import {useState, useEffect} from 'react';
import {userApi, TelegramUser} from '../services/api';

export interface TelegramAuthState {
  isInitialized: boolean;
  isLoading: boolean;
  user: TelegramUser | null;
  error: string | null;
}

export const useTelegramAuth = () => {
  const [state, setState] = useState<TelegramAuthState>({
    isInitialized: false,
    isLoading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    const initializeTelegramAuth = async () => {
      try {
        // Dynamically import WebApp only on client side
        const {default: WebApp} = await import('@twa-dev/sdk');

        // Initialize Telegram Web App
        WebApp.ready();

        // Get user data from Telegram Web App
        const telegramUser = WebApp.initDataUnsafe?.user;

        if (!telegramUser) {
          setState((prev) => ({
            ...prev,
            isInitialized: true,
            isLoading: false,
            error: 'No Telegram user data available',
          }));
          return;
        }

        // Check if user exists in our database
        const response = await userApi.getUserByTelegramId(
          telegramUser.id.toString(),
        );

        if (response.success && response.data) {
          // User exists
          setState((prev) => ({
            ...prev,
            isInitialized: true,
            isLoading: false,
            user: response.data || null,
          }));
        } else {
          // User doesn't exist
          setState((prev) => ({
            ...prev,
            isInitialized: true,
            isLoading: false,
            user: null,
          }));
        }
      } catch (error) {
        console.error('Error initializing Telegram auth:', error);
        setState((prev) => ({
          ...prev,
          isInitialized: true,
          isLoading: false,
          error: 'Failed to initialize Telegram authentication',
        }));
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      initializeTelegramAuth();
    }
  }, []);

  const createUser = async (email: string) => {
    try {
      setState((prev) => ({...prev, isLoading: true}));

      // Dynamically import WebApp only on client side
      const {default: WebApp} = await import('@twa-dev/sdk');

      const telegramUser = WebApp.initDataUnsafe?.user;
      if (!telegramUser) {
        throw new Error('No Telegram user data available');
      }

      const userData = {
        email,
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name,
        username: telegramUser.username,
        telegram_id: telegramUser.id.toString(),
      };

      const response = await userApi.createUser(userData);

      if (response.success && response.data) {
        // User created successfully, reload page to refresh authentication state
        window.location.reload();
      } else {
        throw new Error(response.message || 'Failed to create user');
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to create user',
      }));
    }
  };

  return {
    ...state,
    createUser,
  };
};
