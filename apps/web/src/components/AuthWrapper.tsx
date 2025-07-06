'use client';

import React, {useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {useTelegramAuth} from '../hooks/useTelegramAuth';
import {AppWrapper} from './AppWrapper';
import {SplashScreen} from './SplashScreen';
import {theme} from '../constants';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({children}) => {
  const {isInitialized, isLoading, user, error} = useTelegramAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Define public routes that don't require authentication
  // Exclude root page since it handles its own authentication
  const publicRoutes = ['/onboarding'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isRootPage = pathname === '/';

  useEffect(() => {
    // Skip authentication checks for root page
    if (isRootPage) return;

    if (!isInitialized || isLoading) return;

    // If there's an error, stay on current page and show error
    if (error) return;

    // If user exists and is on a public route, redirect to home
    if (user && isPublicRoute) {
      router.push('/home');
      return;
    }

    // If user doesn't exist and is not on onboarding, redirect to onboarding
    if (!user && !isPublicRoute) {
      router.push('/onboarding');
      return;
    }
  }, [
    isInitialized,
    isLoading,
    user,
    error,
    pathname,
    isPublicRoute,
    isRootPage,
    router,
  ]);

  // Skip splash screen for root page since it has its own
  if (isRootPage) {
    return <>{children}</>;
  }

  // Show splash screen while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <AppWrapper splashDuration={2000}>
        <SplashScreen
          onComplete={() => {}}
          duration={2000}
          message='Checking your account'
        />
      </AppWrapper>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <AppWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: 20,
            textAlign: 'center',
          }}
        >
          <h2 style={{color: theme.colors.coralRed, marginBottom: 16}}>
            Authentication Error
          </h2>
          <p style={{color: theme.colors.bodyTextColor}}>{error}</p>
          <p
            style={{
              color: theme.colors.secondaryTextColor,
              fontSize: 14,
              marginTop: 16,
            }}
          >
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      </AppWrapper>
    );
  }

  // Render children if authentication is successful
  return <>{children}</>;
};
