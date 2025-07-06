'use client';

import React from 'react';
import {theme} from '../constants';

import {CourseType} from '../types';
import {useWishlistStore} from '../stores';
import {svg} from '../svg';

type Props = {
  size?: number;
  course: CourseType;
  customFillColor?: string;
  customStrokeColor?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

export const CourseInWishlist: React.FC<Props> = ({
  size = 24,
  style,
  course,
  containerStyle,
  customFillColor = theme.colors.accentColor,
  customStrokeColor = theme.colors.secondaryTextColor,
}) => {
  const {list, addToWishlist, removeFromWishlist} = useWishlistStore();

  const isInWishlist = list.some((item) => item?.id === course?.id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(course);
    } else {
      addToWishlist(course);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <svg.HeartSvg course={course} size={size} />
    </button>
  );
};
