import type {Metadata, Viewport} from 'next';

import {data} from '../../../data';
import {theme} from '../../../constants';
import {CategoryList} from './CategoryList';

export const metadata: Metadata = {
  title: 'Study Materials by Category',
  description:
    'Browse academic materials organized by category. Find notes, documents, and study resources for your specific subject area.',
};

export const viewport: Viewport = {themeColor: theme.colors.white};

type Params = {
  params: Promise<{id: string}>;
};

export default async function CategoryListPage({params}: Params) {
  const id = (await params).id;

  const [courses] = await Promise.all([data.getCourses()]);

  return <CategoryList id={id} courses={courses} />;
}
