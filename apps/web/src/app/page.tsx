'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {components} from '../components';
import {userApi} from '../services/api';

export default function StartPage() {
  const [message, setMessage] = useState('Initializing...');
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        setMessage('Checking your account...');

        // Dynamically import WebApp only on client side
        const {default: WebApp} = await import('@twa-dev/sdk');

        // Initialize Telegram Web App
        WebApp.ready();

        // Get user data from Telegram Web App
        const telegramUser = WebApp.initDataUnsafe?.user;

        if (!telegramUser) {
          setMessage('No Telegram user data available');
          // Wait a bit then redirect to onboarding
          setTimeout(() => {
            router.push('/onboarding');
          }, 2000);
          return;
        }

        setMessage('Verifying your account...');

        // Check if user exists in our database
        const response = await userApi.getUserByTelegramId(
          telegramUser.id.toString(),
        );

        if (response.success && response.data) {
          // User exists, redirect to home
          setMessage('Welcome back! Redirecting...');
          setTimeout(() => {
            router.push('/home');
          }, 1000);
        } else {
          // User doesn't exist, create them automatically
          setMessage('Creating your account...');

          try {
            // Create user with Telegram data
            const userData = {
              email: `${telegramUser.username || telegramUser.id}@telegram.user`, // Generate email if not available
              first_name: telegramUser.first_name || '',
              last_name: telegramUser.last_name || '',
              username: telegramUser.username || '',
              telegram_id: telegramUser.id.toString(),
            };

            const createResponse = await userApi.createUser(userData);

            if (createResponse.success) {
              setMessage('Account created! Redirecting...');
              setTimeout(() => {
                router.push('/home');
              }, 1000);
            } else {
              throw new Error(
                createResponse.message || 'Failed to create user',
              );
            }
          } catch (createError) {
            console.error('Error creating user:', createError);
            setMessage('Error creating account. Redirecting to setup...');
            setTimeout(() => {
              router.push('/onboarding');
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
        setMessage('Error occurred. Redirecting to setup...');
        setTimeout(() => {
          router.push('/onboarding');
        }, 2000);
      }
    };

    // Add a small delay to show the splash screen
    const timer = setTimeout(() => {
      checkUserAndRedirect();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <components.AppWrapper>
      <components.SplashScreen
        onComplete={() => {}}
        duration={5000}
        message={message}
      />
    </components.AppWrapper>
  );
}
