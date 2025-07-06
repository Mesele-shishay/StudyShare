'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import {text} from '../../text';
import {theme} from '../../constants';
import {components} from '../../components';
import {useTelegramAuth} from '../../hooks/useTelegramAuth';

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
  const {createUser, isLoading} = useTelegramAuth();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.white;
  }, []);

  const handleGetStarted = async () => {
    try {
      // Dynamically import WebApp to get Telegram user data
      const {default: WebApp} = await import('@twa-dev/sdk');
      const telegramUser = WebApp.initDataUnsafe?.user;

      if (telegramUser) {
        // Generate email using username or telegram ID
        const email = `${telegramUser.username || telegramUser.id}@telegram.user`;
        await createUser(email);
      }
    } catch (error) {
      console.error('Error creating user:', error);
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

  const renderButton = () => {
    return (
      <section style={{padding: 20}}>
        <components.Button
          label={isLoading ? 'Creating Account...' : 'Get Started'}
          onClick={isLoading ? undefined : handleGetStarted}
          style={isLoading ? {opacity: 0.6, pointerEvents: 'none'} : {}}
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
      {renderButton()}
    </components.Screen>
  );
};
