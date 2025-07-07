'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {components} from '../components';
import {userApi} from '../services/api';
import {useAuthStore} from '../stores/useAuthStore';

export default function StartPage() {
  const [message, setMessage] = useState('Initializing...');
  const router = useRouter();
  const {clearSession, setUser, setLoading} = useAuthStore();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // CRITICAL: Clear any existing session first
        clearSession();
        setMessage('Starting fresh...');

        // Show splash screen for a moment
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMessage('Connecting to Telegram...');
        setLoading(true);

        // Dynamically import WebApp only on client side
        const {default: WebApp} = await import('@twa-dev/sdk');

        // Initialize Telegram Web App
        WebApp.ready();

        // Get fresh user data from Telegram Web App
        const telegramUser = WebApp.initDataUnsafe?.user;

        if (!telegramUser) {
          setMessage('Unable to connect to Telegram');
          // Wait a bit then redirect to onboarding
          setTimeout(() => {
            setLoading(false);
            router.push('/onboarding');
          }, 2000);
          return;
        }

        setMessage('Checking your account...');

        // Check if user exists in our database with fresh Telegram data
        const response = await userApi.getUserByTelegramId(
          telegramUser.id.toString(),
        );

        if (response.success && response.data) {
          // User exists - set fresh session and redirect to home
          setUser(response.data);
          setMessage('Welcome back! Redirecting...');
          setTimeout(() => {
            router.push('/home');
          }, 1000);
        } else {
          // User doesn't exist - redirect to onboarding for registration
          setMessage('Setting up your account...');
          setTimeout(() => {
            setLoading(false);
            router.push('/onboarding');
          }, 1500);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setMessage('Connection error. Redirecting to setup...');
        setTimeout(() => {
          setLoading(false);
          router.push('/onboarding');
        }, 2000);
      }
    };

    // Start authentication flow
    authenticateUser();
  }, [router, clearSession, setUser, setLoading]);

  return (
    <components.AppWrapper>
      <components.SplashScreen
        onComplete={() => {}}
        duration={10000} // Long duration since we handle completion manually
        message={message}
      />
    </components.AppWrapper>
  );
}
