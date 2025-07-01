'use client';

import React, {useEffect} from 'react';
import {svg} from '../../svg';
import {text} from '../../text';
import {Routes} from '../../routes';
import {theme} from '../../constants';
import {components} from '../../components';

export const SignUp: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.white;
  }, []);

  const renderBackground = () => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return <components.Header title='Sign up' showGoBack={true} />;
  };

  const renderContent = () => {
    return (
      <main
        className='scrollable container'
        style={{paddingTop: '8%', paddingBottom: '8%'}}
      >
        {/* LOGO */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg.SmallLogoSvg />
        </div>

        {/* HEADER */}
        <section>
          <text.H1
            style={{
              marginBottom: 30,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            Sign up
          </text.H1>
        </section>

        {/* INPUT FIELDS */}
        <section style={{marginBottom: 20}}>
          <components.InputField
            label='First Name'
            inputType='text'
            placeholder='Enter your first name'
            containerStyle={{marginBottom: '10px'}}
          />
          <components.InputField
            label='Last Name'
            inputType='text'
            placeholder='Enter your last name'
            containerStyle={{marginBottom: '10px'}}
          />
          <components.InputField
            label='Username'
            inputType='text'
            placeholder='Enter your username'
            containerStyle={{marginBottom: '10px'}}
          />
        </section>

        {/* SIGN IN BUTTON */}
        <section style={{marginBottom: 14}}>
          <components.Button
            label='Sign up'
            href={Routes.SIGN_UP_ACCOUNT_CREATED}
          />
        </section>

        {/* SOCIALS */}
        <section className='container' style={{marginBottom: 30}}>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            <li className='clickable'>
              <components.Facebook />
            </li>
            <li className='clickable'>
              <components.Twitter />
            </li>
            <li className='clickable'>
              <components.Google />
            </li>
          </ul>
        </section>
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
