import { useAppSelector } from '../../hooks/use-app-selector';
import { selectSortedReviews } from '../../store/selectors';
import ReviewsList from '../reviews-list/reviews-list';
function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(selectSortedReviews);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3" data-testid="title-review">Отзывы</h2>
        </div>
        {reviews.length > 0 && <ReviewsList reviews={reviews}/>}
      </div>
    </section>
  );
}

export default ReviewBlock;
