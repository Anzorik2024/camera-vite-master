import StarsRating from '../stars-rating/stars-rating';

type CameraCardProps = {
rating: number;
reviewCount: number;
}

function CameraRating({rating, reviewCount}: CameraCardProps): JSX.Element {

  return (
    <>
      <StarsRating
        rating={rating}
      />
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </>

  );
}

export default CameraRating;
