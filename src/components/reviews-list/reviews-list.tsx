import { useState, useEffect } from 'react';

import { ReviewsAdapt } from '../../types/camera';
import { ContentPerItem } from '../../const/content-per-item';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: ReviewsAdapt;
}

function ReviewsList({reviews}: ReviewListProps): JSX.Element {

  const [reviewAmount, setReviewAmount] = useState<number>(ContentPerItem.Review);

  useEffect(() => setReviewAmount(ContentPerItem.Review), [reviews]);

  const visibleReviews = reviews.slice(0, reviewAmount);
  const isButtonVisible = reviewAmount < reviews.length;

  const handleButtonClick = () => setReviewAmount((prevState) => prevState + ContentPerItem.Review);
  return(
    <>
      <ul className="review-block__list">
        {visibleReviews.map((review) => (
          <ReviewItem
            reviewData={review}
            key={review.id}
          />
        ))}
      </ul>
      {isButtonVisible &&
      <div className="review-block__buttons">
        <button
          className="btn btn--purple"
          type="button"
          onClick={handleButtonClick}
        >
          Показать больше отзывов
        </button>
      </div>}
    </>
  );
}

export default ReviewsList;

