'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';

import {text} from '../../text';
import {Routes} from '../../routes';
import {theme} from '../../constants';
import {components} from '../../components';

const FAQData = [
  {
    id: 1,
    title: 'How do I access my purchased study materials?',
    content:
      'After successful payment, your study materials will be available in the "My Courses" section. You can download PDFs, access video content, and view course materials on any device. Materials are accessible for the duration of your enrollment.',
  },
  {
    id: 2,
    title: 'What payment methods are accepted?',
    content:
      'We accept various payment methods including mobile money (CBE Birr, TeleBirr), bank transfers to major Ethiopian banks, and international payment cards. All transactions are secure and encrypted for your protection.',
  },
  {
    id: 3,
    title: 'How do I get a refund for a course?',
    content:
      'Refunds are available within 7 days of purchase if you are not satisfied with the course content. Contact our support team with your order number and reason for refund. Processing takes 3-5 business days.',
  },
  {
    id: 4,
    title: 'Can I access courses offline?',
    content:
      'Yes, you can download study materials for offline access. Go to "My Courses", select the course, and tap the download button. Downloaded materials are available in your device\'s storage and can be accessed without internet connection.',
  },
  {
    id: 5,
    title: 'How do I contact my course instructor?',
    content:
      'Each course has a dedicated discussion forum where you can ask questions to instructors and fellow students. You can also send direct messages to instructors through the course platform. Response time is typically within 24 hours.',
  },
];

const OpenSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={11} height={6} fill='none'>
      <g>
        <path
          stroke='#111'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='M.857 5.143 5.143.857l4.286 4.286'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M10.143.143v5.714h-10V.143z' />
        </clipPath>
      </defs>
    </svg>
  );
};

const CloseSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={11} height={6} fill='none'>
      <g>
        <path
          stroke='#111'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='m.857.857 4.286 4.286L9.429.857'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M10.143 5.857V.143h-10v5.714z' />
        </clipPath>
      </defs>
    </svg>
  );
};

const menu = [
  {
    id: 1,
    title: 'Getting started',
    icon: 'assets/other/06.png',
    url: Routes.HOME,
  },
  {
    id: 2,
    title: 'profile',
    icon: '/assets/other/09.png',
    url: Routes.HOME,
  },
  {
    id: 3,
    title: 'Purchase',
    icon: '/assets/other/10.png',
    url: Routes.HOME,
  },
  {
    id: 4,
    title: 'Course Taking',
    icon: '/assets/other/11.png',
    url: Routes.HOME,
  },
];

export const HelpAndSupport: React.FC = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
  }, []);

  const toggleAccordion = (index: number) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  const renderBackground = () => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return <components.Header showGoBack={true} title='Help & Support' />;
  };

  const renderContent = () => {
    const btnStyle = {
      borderRadius: 10,
      padding: '18px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #FFFFFF',
      backgroundColor: `${'#FFFFFF'}50`,
      boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.05)',
    };

    return (
      <main
        className='scrollable container'
        style={{paddingTop: '10px', paddingBottom: '20px'}}
      >
        <ul>
          {FAQData.map((faq, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
              }}
            >
              <details
                onToggle={() => toggleAccordion(index)}
                style={{
                  ...btnStyle,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <summary
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  className='clickable'
                >
                  <text.H6 style={{marginRight: 10}}>{faq.title}</text.H6>
                  {openAccordionIndex === index ? <OpenSvg /> : <CloseSvg />}
                </summary>
                <div style={{paddingTop: 14}}>
                  <p
                    className='element'
                    style={{
                      ...theme.fonts.Lato,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: theme.colors.bodyTextColor,
                    }}
                  >
                    {faq.content}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
          }}
        >
          {menu.map((item, index) => {
            return (
              <Link
                href={item.url}
                style={{
                  width: 'calc(50% - 7.5px)',
                  padding: '30px 0 22px 0',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor:
                    index === 0
                      ? '#ABC9FB'
                      : index === 1
                        ? '#FE9BB3'
                        : index === 2
                          ? '#54DAE2'
                          : index === 3
                            ? '#BEA1FE'
                            : '#D3F9F9',
                }}
                key={item.id}
              >
                <Image
                  src={'/assets/other/08.png'}
                  alt='arrow'
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority={true}
                  style={{
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority={true}
                  style={{
                    width: '50%',
                    height: 'auto',
                    marginBottom: 14,
                    zIndex: 2,
                  }}
                />
                <text.H5
                  style={{
                    color: theme.colors.white,
                    textTransform: 'capitalize',
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </text.H5>
              </Link>
            );
          })}
        </div>
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
