import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';


import { AppRoute } from '../../const/app-route';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header/>
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Страница не найдена</h1>
              <Link className="btn btn--purple" to={AppRoute.Main}>
          Вернуться к каталогу товаров
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </>);
}

export default NotFoundPage;
