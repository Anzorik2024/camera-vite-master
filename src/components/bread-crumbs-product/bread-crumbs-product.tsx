import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { Camera } from '../../types/camera';

type BreadCrumbsProductProps = {
 camera: Camera ;
}
function BreadCrumbsProduct ({camera} : BreadCrumbsProductProps) : JSX.Element {

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs-container">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{`${camera.category} «${camera.name}»`}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbsProduct;
