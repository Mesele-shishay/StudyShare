'use client';

import Image from 'next/image';
import React, {useEffect} from 'react';

import {svg} from '../../svg';
import {Routes} from '../../routes';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAuthStore} from '../../stores/useAuthStore';

export const ProfileEdit: React.FC = () => {
  const {user} = useAuthStore();

  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.white;
  }, []);

  // Get user display name with fallback
  const getUserDisplayName = () => {
    if (!user) return '';

    const firstName = user.first_name || '';
    const lastName = user.last_name || '';

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (user.username) {
      return user.username;
    }

    return '';
  };

  // Get user email
  const getUserEmail = () => {
    if (!user) return '';
    return user.email || '';
  };

  // Get user profile image
  const getUserProfileImage = () => {
    return '/assets/users/01.png';
  };

  const renderBackground = () => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return <components.Header showGoBack={true} title='Profile Edit' />;
  };

  const renderContent = () => {
    return (
      <main
        className='scrollable container'
        style={{paddingTop: 20, paddingBottom: 20}}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: 120,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 30,
          }}
          className='center clickable'
        >
          <Image
            src={getUserProfileImage()}
            alt='User'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
            style={{
              width: '100%',
              height: 'auto',
              margin: '0 auto',
              borderRadius: '50%',
            }}
          />
          <div style={{position: 'absolute', bottom: -10, right: 0}}>
            <svg.CameraSvg />
          </div>
        </div>
        <components.InputField
          label='Name'
          type='text'
          inputType='username'
          placeholder={getUserDisplayName() || 'Enter your name'}
          containerStyle={{marginBottom: 10}}
        />
        <components.InputField
          label='Email'
          type='email'
          inputType='email'
          placeholder={getUserEmail() || 'Enter your email'}
          containerStyle={{marginBottom: 10}}
        />
        <components.InputField
          label='Phone number'
          type='tel'
          inputType='phone'
          placeholder='Enter your phone number'
          containerStyle={{marginBottom: 10}}
        />
        <components.InputField
          label='location'
          type='text'
          placeholder='Enter your location'
          inputType='location'
          containerStyle={{marginBottom: 20}}
        />
        <components.Button label='save changes' href={Routes.PROFILE} />
      </main>
    );
  };

  return (
    <components.Screen>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
    </components.Screen>
  );
};
