'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from 'next/navigation';

import {text} from '../../text';
import {theme} from '../../constants';
import {components} from '../../components';
import {userApi} from '../../services/api';
import {useAuthStore} from '../../stores/useAuthStore';

const onboarding = [
  {
    id: 1,
    title: 'Discover useful resources',
    image: '/assets/onboarding/01_02.png',
    description:
      'E-Learning is for everyone. \n Discover useful resources and \n improve your skills.',
  },
  {
    id: 2,
    title: 'New profession',
    image: '/assets/onboarding/02_02.png',
    description:
      'With us you can get a new profession, learn \n skills for career development',
  },
  {
    id: 3,
    title: 'Move forward',
    image: '/assets/onboarding/03_02.png',
    description:
      'We have created a comfortable learning \n environment for you to move forward',
  },
];

export const Onboarding: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const {setUser, isAuthenticated} = useAuthStore();

  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.white;

    // Redirect if user is already authenticated
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  const handleGetStarted = async () => {
    if (isRegistering) return; // Prevent double-click

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      // Dynamically import WebApp only on client side
      const {default: WebApp} = await import('@twa-dev/sdk');

      // Get user data from Telegram Web App
      const telegramUser = WebApp.initDataUnsafe?.user;

      if (!telegramUser) {
        throw new Error(
          "Unable to access Telegram user data. Please ensure you're opening this app from Telegram.",
        );
      }

      // Create user with Telegram data
      const userData = {
        email: `${telegramUser.username || telegramUser.id}@telegram.user`,
        first_name: telegramUser.first_name || '',
        last_name: telegramUser.last_name || '',
        username: telegramUser.username || '',
        telegram_id: telegramUser.id.toString(),
      };

      const createResponse = await userApi.createUser(userData);

      if (createResponse.success) {
        // Get the newly created user data
        const userResponse = await userApi.getUserByTelegramId(
          telegramUser.id.toString(),
        );

        if (userResponse.success && userResponse.data) {
          // Set session in auth store
          setUser(userResponse.data);

          // Redirect to home
          router.push('/home');
        } else {
          throw new Error('User created but unable to retrieve user data');
        }
      } else {
        throw new Error(
          createResponse.message || 'Failed to create your account',
        );
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setRegistrationError(
        error.message || 'Failed to create your account. Please try again.',
      );
      setIsRegistering(false);
    }
  };

  const renderBackground = () => {
    return <components.Background version={2} />;
  };

  const renderHeader = () => {
    return <components.Header />;
  };

  const renderCarousel = () => {
    return (
      <section
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Swiper
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
        >
          {onboarding.map((item) => (
            <SwiperSlide key={item.id} style={{width: '100%', height: 'auto'}}>
              <Image
                src={item.image}
                alt='Onboarding'
                width={0}
                height={0}
                sizes='100vw'
                priority={true}
                style={{
                  width: '80%',
                  height: 'auto',
                  margin: '0 auto',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  };

  const renderDescription = () => {
    const currentItem = onboarding[currentSlideIndex];
    return (
      <section className='container' style={{marginBottom: '8%'}}>
        <text.H2 style={{textAlign: 'center', textTransform: 'capitalize'}}>
          {currentItem.title}
        </text.H2>
        <div style={{maxWidth: 327, margin: '0 auto'}}>
          <p
            className='t16'
            style={{
              marginTop: '14px',
              textAlign: 'center',
              ...theme.fonts.Lato,
              fontSize: 16,
              lineHeight: 1.7,
              color: theme.colors.bodyTextColor,
            }}
          >
            {currentItem.description}
          </p>
        </div>
      </section>
    );
  };

  const renderDots = () => {
    return (
      <section
        className='container'
        style={{
          gap: 10,
          marginBottom: '8%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {onboarding.map((item, index: number) => (
          <div
            key={item.id}
            style={{
              width: currentSlideIndex === index ? 25 : 10,
              height: 2,
              borderRadius: '4px',
              backgroundColor:
                currentSlideIndex === index
                  ? theme.colors.mainColor
                  : theme.colors.secondaryTextColor,
            }}
          />
        ))}
      </section>
    );
  };

  const renderErrorMessage = () => {
    if (!registrationError) return null;

    return (
      <section style={{padding: '0 20px', marginBottom: '20px'}}>
        <div
          style={{
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#d32f2f',
              fontSize: 14,
              margin: 0,
              ...theme.fonts.Lato,
            }}
          >
            {registrationError}
          </p>
        </div>
      </section>
    );
  };

  const renderButton = () => {
    return (
      <section style={{padding: 20}}>
        <components.Button
          label={isRegistering ? 'Registering your account...' : 'Get Started'}
          onClick={handleGetStarted}
          style={{
            opacity: isRegistering ? 0.7 : 1,
            cursor: isRegistering ? 'not-allowed' : 'pointer',
          }}
        />
      </section>
    );
  };

  return (
    <components.Screen>
      {renderBackground()}
      {renderHeader()}
      {renderCarousel()}
      {renderDescription()}
      {renderDots()}
      {renderErrorMessage()}
      {renderButton()}
    </components.Screen>
  );
};
