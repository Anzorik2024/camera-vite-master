import { ReviewAdapt } from '../../types/camera';
import { formatReviewDate } from '../../utils/format';
import StarsRating from '../stars-rating/stars-rating';
import { ReviewItemTitle } from '../../const/review-item-title';

type ReviewItemProps = {
  reviewData: ReviewAdapt;
}


function ReviewItem({ reviewData }: ReviewItemProps): JSX.Element {
  const {userName, advantage, disadvantage, createAt, rating, review} = reviewData ;

  const reviewItem = {
    advantage,
    disadvantage,
    review
  } as const;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt.toISOString()}>
          {formatReviewDate(createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <StarsRating
          rating={rating}
        />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">

        {Object.values(ReviewItemTitle).map((title, index) => {
          const content = Object.values(reviewItem)[index];
          const key = Object.keys(ReviewItemTitle)[index];

          return (
            <li className="item-list" key={key}>
              <span className="item-list__title">{title}</span>
              <p className="item-list__text">
                {content}
              </p>
            </li>
          );
        })}
      </ul>
    </li>
  );
}


export default ReviewItem;

