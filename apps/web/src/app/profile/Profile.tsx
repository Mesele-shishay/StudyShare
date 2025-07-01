'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect} from 'react';

import {text} from '../../text';
import {URLS} from '../../config';
import {items} from '../../items';
import {Routes} from '../../routes';
import {theme} from '../../constants';
import {components} from '../../components';

const HeartSvg: React.FC = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={19} fill='none'>
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.367 3.586a4.619 4.619 0 0 0-1.488-.928 4.87 4.87 0 0 0-3.508 0 4.619 4.619 0 0 0-1.488.928L10 4.41l-.883-.824a4.756 4.756 0 0 0-3.242-1.254c-1.216 0-2.382.451-3.242 1.254-.86.802-1.342 1.89-1.342 3.025s.483 2.223 1.342 3.026l.884.824L10 16.512l6.483-6.05.884-.825c.425-.397.763-.87.994-1.388.23-.52.349-1.076.349-1.638 0-.562-.119-1.118-.35-1.637-.23-.52-.567-.991-.993-1.388v0Z'
      />
    </svg>
  );
};

const HelpCircleSvg: React.FC = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none'>
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z'
      />
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.575 7.5a2.5 2.5 0 0 1 4.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008'
      />
    </svg>
  );
};

const DocumentSvg: React.FC = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none'>
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.667 1.667H5a1.667 1.667 0 0 0-1.667 1.666v13.334A1.667 1.667 0 0 0 5 18.333h10a1.667 1.667 0 0 0 1.667-1.666v-10l-5-5Z'
      />
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.667 1.667v5h5M13.333 10.833H6.667M13.333 14.167H6.667M8.333 7.5H6.667'
      />
    </svg>
  );
};

const EditSvg: React.FC = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} fill='none'>
      <rect width={40} height={40} fill='#fff' rx={20} />
      <path
        stroke='#333'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M20 25.333h6M23 14.333a1.414 1.414 0 0 1 2 2l-8.333 8.334-2.667.666.667-2.666L23 14.333Z'
      />
    </svg>
  );
};

export const Profile: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.white;
  }, []);

  const renderBackground = () => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return <components.Header title='My profile' />;
  };

  const renderContent = () => {
    return (
      <main
        className='scrollable'
        style={{paddingTop: '8%', paddingBottom: '8%'}}
      >
        {/* USER INFO */}
        <section style={{marginBottom: 20}}>
          <Link
            href={Routes.PROFILE_EDIT}
            style={{
              position: 'relative',
              display: 'flex',
              marginBottom: 20,
            }}
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
                src={`${URLS.MAIN_URL}/assets/users/01.png`}
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
                <EditSvg />
              </div>
            </div>
          </Link>

          <text.H2 style={{textAlign: 'center'}}>Mesele Shishay</text.H2>
          <span
            style={{
              textAlign: 'center',
              display: 'block',
              marginBottom: 20,
              ...theme.fonts.Lato,
              fontSize: 16,
              color: theme.colors.bodyTextColor,
            }}
          >
            mesele@mail.com
          </span>
        </section>

        {/* MENU */}
        <section>
          <div className='container'>
            <items.ProfileItem
              label='Wishlist'
              icon={<HeartSvg />}
              href={Routes.MY_WISHLIST}
            />

            <items.ProfileItem
              label='Help & Support'
              href={Routes.HELP_AND_SUPPORT}
              icon={<HelpCircleSvg />}
            />
            <items.ProfileItem
              label='Privacy Policy'
              href={Routes.PRIVACY_POLICY}
              icon={<DocumentSvg />}
            />
          </div>
        </section>
      </main>
    );
  };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  return (
    <components.Screen>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
    </components.Screen>
  );
};
