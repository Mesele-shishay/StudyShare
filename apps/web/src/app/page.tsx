import React from 'react';
import type {Metadata, Viewport} from 'next';

import {theme} from '../constants';
import {Onboarding} from './Onboarding';

export const metadata: Metadata = {
  title: 'StudyShare - AI-Powered Academic Platform',
  description:
    'Upload, share, and supercharge your academic materials with AI. Generate summaries, flashcards, and check plagiarism - all within Telegram. Join the community of university students.',
};

export const viewport: Viewport = {
  themeColor: theme.colors.white,
};

export default function StartPage() {
  return <Onboarding />;
}
