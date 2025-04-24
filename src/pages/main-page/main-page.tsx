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
import Sort from '../../components/sort/sort';
import { sortCameras } from '../../utils/sort-cameras';
import Filters from '../../components/filters/filters';
import { setMaxPrice,setMinPrice} from '../../store/filter-slice/filter-slice';
import { filterCamerasByPrice } from '../../utils/filter-cameras-by-price';
import { filterCameras } from '../../utils/filter-cameras';
import { getCurrentSortOrder,
  getCurrentSortType,
  getUserEnteredBottomPrice,
  getUserEnteredTopPrice,
  getCurrentFilterByCategory,
  getCurrentFiltersByTypes,
  getCurrentFiltersByLevels,
} from '../../store/selectors';

import { usePriceRange } from '../../hooks/use-price-range';
function MainPage ():JSX.Element {

  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();

  const camerasCatalog = useAppSelector(selectCameras);// Заменить на фильтрованные данные

  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  const currentFiltersByLevels = useAppSelector(getCurrentFiltersByLevels);

  const filterAllCameras = filterCameras(camerasCatalog, currentFilterByCategory, currentFiltersByLevels, currentFiltersByType);

  const pricesFromFiltered = usePriceRange(filterAllCameras);
  const pricesFromCatalog = usePriceRange(camerasCatalog);

  const currentMaxPrice = filterAllCameras.length > 0 ? pricesFromFiltered.maxPrice : pricesFromCatalog.maxPrice;
  const currentMinPrice = filterAllCameras.length > 0 ? pricesFromFiltered.minPrice : pricesFromCatalog.minPrice;// текущие данные вынести в фильтр компонент

  useEffect(() => {// вынести в отдельный компонент!!!
    dispatch(setMinPrice(currentMinPrice));//устанавливаем значение в плейсхолдер и это будет начальное значение
    dispatch(setMaxPrice(currentMaxPrice));//устанавливаем значение в плейсхолдер и это будет начальное значение

  },[currentMaxPrice,currentMinPrice,dispatch]);

  const currentBottomPrice = Number(useAppSelector(getUserEnteredBottomPrice));// для теста вынести в компонент!!!-начало фильтрации по цене
  const currentTopPrice = Number(useAppSelector(getUserEnteredTopPrice));// для теста -начало фильтрации по цене

  const camerasFilterByPrice = filterCamerasByPrice(filterAllCameras,currentBottomPrice, currentTopPrice);// пример как будет работать фильтрация

  const currentSortByType = useAppSelector(getCurrentSortType);
  const currentSortByOrder = useAppSelector(getCurrentSortOrder);

  const camerasSort = sortCameras(camerasFilterByPrice,currentSortByType, currentSortByOrder); // в самом конце всегда сортировка

  const isOrderStatus = useAppSelector(selectOrderStatus);


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
                <Filters/>
                <div className="catalog__content">
                  <Sort/>
                  <div className="cards catalog__cards">
                    {camerasSort.map((camera) => <ProductCard camera={camera} key={camera.id} onAddCameraInBasketButtonClick={handleAddCameraToBasketButtonClick} />)}
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
