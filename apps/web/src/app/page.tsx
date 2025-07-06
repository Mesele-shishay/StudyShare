'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {components} from '../components';

export default function StartPage() {
  const [message, setMessage] = useState('Initializing...');
  const router = useRouter();

  useEffect(() => {
    // Simple redirect logic - let AuthWrapper handle authentication
    const timer = setTimeout(() => {
      setMessage('Redirecting...');
      router.push('/home');
    }, 2000);

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
