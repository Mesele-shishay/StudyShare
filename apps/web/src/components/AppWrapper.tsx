'use client';

import React, {useState, useEffect} from 'react';
import {SplashScreen} from './SplashScreen';

interface AppWrapperProps {
  children: React.ReactNode;
  splashDuration?: number; // Duration in milliseconds
}

export const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  splashDuration = 3000,
}) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Don't render splash screen until mounted to prevent hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          duration={splashDuration}
        />
      )}
      {!showSplash && children}
    </>
  );
};
