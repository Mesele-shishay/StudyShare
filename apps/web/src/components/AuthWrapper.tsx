'use client';

import React, {useEffect, useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {useAuthStore} from '../stores/useAuthStore';
import {AppWrapper} from './AppWrapper';
import {SplashScreen} from './SplashScreen';
import {theme} from '../constants';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({children}) => {
  const {isAuthenticated, isLoading, user} = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Define public routes that don't require authentication
  const publicRoutes = ['/onboarding'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isRootPage = pathname === '/';

  useEffect(() => {
    // Skip authentication checks for root page (it handles its own auth flow)
    if (isRootPage) {
      setIsCheckingAuth(false);
      return;
    }

    // Handle authentication routing logic
    const handleAuthRouting = () => {
      // If user is authenticated and trying to access onboarding, redirect to home
      if (isAuthenticated && pathname === '/onboarding') {
        router.push('/home');
        return;
      }

      // If user is not authenticated and trying to access protected route, redirect to onboarding
      if (!isAuthenticated && !isPublicRoute) {
        router.push('/onboarding');
        return;
      }

      // All checks passed
      setIsCheckingAuth(false);
    };

    // Add a small delay to allow auth store hydration
    const timer = setTimeout(() => {
      handleAuthRouting();
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, pathname, isPublicRoute, isRootPage, router]);

  // Skip wrapper for root page since it has its own splash screen
  if (isRootPage) {
    return <>{children}</>;
  }

  // Show loading screen while checking authentication or during auth store loading
  if (isCheckingAuth || isLoading) {
    return (
      <AppWrapper>
        <SplashScreen
          onComplete={() => {}}
          duration={3000}
          message='Checking your access...'
        />
      </AppWrapper>
    );
  }

  // For onboarding route, show content regardless of auth state
  // (onboarding component will handle redirects if user is already authenticated)
  if (pathname === '/onboarding') {
    return <>{children}</>;
  }

  // For protected routes, ensure user is authenticated
  if (!isAuthenticated || !user) {
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
            Access Denied
          </h2>
          <p style={{color: theme.colors.bodyTextColor, marginBottom: 16}}>
            You need to be logged in to access this page.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: theme.colors.mainColor,
              color: theme.colors.white,
              cursor: 'pointer',
              ...theme.fonts.Lato,
            }}
          >
            Go to Setup
          </button>
        </div>
      </AppWrapper>
    );
  }

  // Render children for authenticated users on protected routes
  return <>{children}</>;
};
