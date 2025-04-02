import { Link } from 'react-router-dom';

import { AppRoute } from '../../const/app-route';

function Banner ():JSX.Element {
  const PRODUCT_ID = 1;
  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
        >
        </source>
        <img
          src="img/content/banner-bg.jpg"
          srcSet="img/content/banner-bg@2x.jpg 2x"
          width="1280"
          height="280"
          alt="баннер"
        >
        </img>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to = {`${AppRoute.Product}/${PRODUCT_ID}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
