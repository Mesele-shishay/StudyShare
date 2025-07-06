'use client';

import React, {useEffect, useState} from 'react';
import {BookOpen} from 'lucide-react';
import {theme} from '../constants';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // Duration in milliseconds
  message?: string; // Custom loading message
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  duration = 3000,
  message = 'Loading your learning experience',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadingDots, setLoadingDots] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Animate logo entrance
    const logoTimer = setTimeout(() => {
      setLogoScale(1);
    }, 300);

    // Animate text entrance
    const textTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 800);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (duration / 50); // Adjust speed based on duration
      });
    }, 50);

    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Complete splash screen after specified duration
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration, isMounted]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.colors.white,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, rgba(255, 117, 87, 0.05) 0%, rgba(255, 45, 171, 0.05) 50%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Logo Container */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: `linear-gradient(135deg, ${theme.colors.mainOrange} 0%, ${theme.colors.persianRose} 100%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(255, 117, 87, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated background elements */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              animation: 'rotate 8s linear infinite',
            }}
          />

          {/* Floating particles */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '60%',
                right: '20%',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                animation: 'pulse 2s ease-in-out infinite 0.5s',
              }}
            />
          </div>

          {/* BookOpen icon from Lucide React */}
          <BookOpen
            size={60}
            color={theme.colors.white}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      </div>

      {/* App Name */}
      <div
        style={{
          opacity: textOpacity,
          transition: 'opacity 0.8s ease-in-out',
          marginBottom: '60px',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.colors.mainColor,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.5px',
            textShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          StudyShare
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: theme.colors.textColor,
            margin: '8px 0 0 0',
            textAlign: 'center',
            fontWeight: '400',
          }}
        >
          AI-Powered Academic Platform
        </p>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '200px',
          height: '4px',
          backgroundColor: theme.colors.antiFlashWhite,
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${theme.colors.mainOrange} 0%, ${theme.colors.persianRose} 100%)`,
            borderRadius: '2px',
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px rgba(255, 117, 87, 0.3)',
          }}
        />
      </div>

      {/* Loading Text */}
      <p
        style={{
          fontSize: '14px',
          color: theme.colors.secondaryTextColor,
          margin: 0,
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {message}
        {loadingDots}
      </p>

      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};
