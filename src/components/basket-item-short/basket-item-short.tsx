import { Camera } from '../../types/camera';
import { PhotocameraCategoryName } from '../../const/const';
import { formatPrice } from '../../utils/format';

type BasketItemShortProps = {
  camera: Camera;
}

function BasketItemShort({camera} : BasketItemShortProps): JSX.Element {
  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, type, vendorCode, category, level, price } = camera;

  const getCategory = (cameraCategory: string) => {
    if (cameraCategory === PhotocameraCategoryName.Photocamera) {
      return PhotocameraCategoryName.ModalPhotocamera;
    }

    return cameraCategory;
  };

  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="140" height="120"
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{category}{` «${name}»`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{` ${vendorCode}`}</span>
          </li>
          <li className="basket-item__list-item">{type}{`  ${getCategory(category)}`}</li>
          <li className="basket-item__list-item">{`${level} уровень`}</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽</p>
      </div>
    </div>
  );
}

export default BasketItemShort;

