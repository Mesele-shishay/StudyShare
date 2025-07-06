import {Lato, League_Spartan} from 'next/font/google';
import type {Metadata, Viewport} from 'next';

import 'swiper/css';
import '../scss/_index.scss';
import {components} from '../components';
import {StoreProvider} from '../stores';

const lato = Lato({
  weight: '400',
  variable: '--font-lato',
  subsets: ['latin'],
});

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
});

export const viewport: Viewport = {themeColor: '#fff'};
export const metadata: Metadata = {
  title: 'StudyShare - AI-Powered Academic Platform',
  description:
    'Upload, share, and supercharge your academic materials with AI. Generate summaries, flashcards, and check plagiarism - all within Telegram. Join the community of university students.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0'
        />
        <script src='https://telegram.org/js/telegram-web-app.js?56'></script>
      </head>
      <body
        suppressHydrationWarning
        id='app'
        className={`${lato.variable} ${leagueSpartan.variable}`}
      >
        <StoreProvider>
          <components.AuthWrapper>{children}</components.AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
