import React from 'react';
import { Link } from 'react-router-dom';

import { Camera } from '../../types/camera';
import { formatPrice, capitalizeFirstLetter } from '../../utils/format';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import IconStar from '../icon-star/icon-star';
import { AppRoute } from '../../const/app-route';
import { selectCamera} from '../../store/order-slice/order-slice';

type ProductCardProps = {
  camera: Camera;
  onAddCameraInBasketClickButton: () => void;
 };

const STAR_MAX = 5;

function ProductCard ({camera, onAddCameraInBasketClickButton } :ProductCardProps): JSX.Element {

  const {name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount,id} = camera;

  const dispatch = useAppDispatch();

  const handleAddCameraInBasketButtonClick = () => {
    dispatch(selectCamera(camera));
    onAddCameraInBasketClickButton();
  };

  const getStarsRating = (): JSX.Element => {
    const stars = [];
    for(let i = 0; i < STAR_MAX; i++) {
      stars.push(<IconStar isFull={i < rating} key={i}/>);
    }
    return <React.Fragment key="stars">{stars}</React.Fragment> ;
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="280"
            height="240"
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getStarsRating()}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{capitalizeFirstLetter(name)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleAddCameraInBasketButtonClick}>
          Купить
        </button>
        <Link className="btn btn--transparent" to = {`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
