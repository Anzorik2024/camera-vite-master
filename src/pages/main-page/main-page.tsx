import { useState, useRef, useEffect } from'react';

import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import ProductCard from '../../components/product-card/product-card';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectCameras } from '../../store/selectors';
import BasketModal from '../../components/basket-modal/basket-modal';
import useDisableBackground from '../../hooks/use-disable-background';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { resetOrder} from '../../store/order-slice/order-slice';
import { selectOrderStatus } from '../../store/selectors';
import { RequestStatus } from '../../const/request-status';
import { toast} from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
function MainPage ():JSX.Element {

  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const modalRef = useRef(null);
  const camerasCatalog = useAppSelector(selectCameras);

  const isOrderStatus = useAppSelector(selectOrderStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOrderStatus === RequestStatus.Success) {
      setModalAddCameraToBasketOpen(false);
      dispatch(resetOrder());
    }
    if (isOrderStatus === RequestStatus.Failed) {
      toast.error(WarningMessage.PhoneSendError);
    }
  }, [isOrderStatus, dispatch]);


  const handleAddCameraToBasketButtonClick = () => {
    setModalAddCameraToBasketOpen(true);
  };

  const closeAddCameraToBasketModal = () => {
    setModalAddCameraToBasketOpen(false);
    dispatch(resetOrder());
  };

  useDisableBackground(isModalAddCameraToBasketOpen);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner/>
        <div className="page-content">
          <BreadCrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от"/>
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input type="number" name="priceUp" placeholder="до"/>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-radio catalog-filter__item">
                          <label>
                            <input type="radio" name="category" value="photocamera" checked/><span className="custom-radio__icon"></span><span className="custom-radio__label">Фотокамера</span>
                          </label>
                        </div>
                        <div className="custom-radio catalog-filter__item">
                          <label>
                            <input type="radio" name="category" value="videocamera"/><span className="custom-radio__icon"></span><span className="custom-radio__label">Видеокамера</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection" checked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                          </label>
                        </div>
                      </fieldset>
                      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" checked/>
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort"/>
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию"/>
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                            <label htmlFor="down">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">
                    {camerasCatalog.map((camera) => <ProductCard camera={camera} key={camera.id} onAddCameraInBasketClickButton={handleAddCameraToBasketButtonClick} />)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={`modal ${isModalAddCameraToBasketOpen ? 'is-active' : ''}`} ref={modalRef}>
          <BasketModal onCloseModal={closeAddCameraToBasketModal} isOpen={isModalAddCameraToBasketOpen} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
