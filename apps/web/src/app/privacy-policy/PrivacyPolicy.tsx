'use client';

import React from 'react';

import {text} from '../../text';
import {components} from '../../components';
import {theme} from '@/constants';

const privacyPolicy = [
  {
    id: 1,
    title: '1. Terms of Service',
    content:
      'By accessing StudyShare, you agree to use this platform for educational purposes only. All study materials are provided by Ethiopian universities and academic institutions. You must be a registered student or faculty member to access course content. Sharing or distributing copyrighted materials is strictly prohibited.',
  },
  {
    id: 2,
    title: '2. Academic License',
    content:
      'Study materials are licensed for personal academic use only. You may download and study course content for your educational needs, but redistribution, commercial use, or sharing with unauthorized users is not permitted. This license is valid for the duration of your enrollment or faculty appointment.',
  },
  {
    id: 3,
    title: '3. Data Privacy',
    content:
      'We collect and process your academic information, payment details, and usage data to provide educational services. Your data is stored securely in compliance with Ethiopian data protection laws. We do not share your personal information with third parties except as required by law or with your explicit consent.',
  },
];

export const PrivacyPolicy: React.FC = () => {
  const renderBackground = () => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return <components.Header title='Privacy Policy' showGoBack={true} />;
  };

  const renderContent = () => {
    return (
      <main
        className='container scrollable'
        style={{paddingBottom: 20, paddingTop: 20}}
      >
        {privacyPolicy.map((item) => {
          return (
            <div style={{marginBottom: '10%'}} key={item.id}>
              <text.H5 style={{marginBottom: 10}}>{item.title}</text.H5>
              <p
                style={{
                  ...theme.fonts.Lato,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: theme.colors.bodyTextColor,
                }}
              >
                {item.content}
              </p>
            </div>
          );
        })}
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
