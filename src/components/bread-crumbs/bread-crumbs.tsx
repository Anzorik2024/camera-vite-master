import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
function BreadCrumbs () : JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container" data-testid="breadcrumbs-container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbs;

