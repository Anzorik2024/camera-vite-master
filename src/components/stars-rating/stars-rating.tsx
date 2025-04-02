import React from 'react';

import { STAR_MAX } from '../../const/const';

type StarsRatingProps = {
  rating: number;
}

function StarsRating({ rating }: StarsRatingProps): JSX.Element {
  const stars = Array.from({ length: STAR_MAX }, (_, i) => (
    <svg
      width={17}
      height={16}
      aria-hidden="true"
      data-testid="star"
      key={i}
    >
      <use xlinkHref={i < rating ? '#icon-full-star' : '#icon-star'} />
    </svg>
  ));

  return <React.Fragment key="stars">{stars}</React.Fragment>;
}

export default StarsRating;
