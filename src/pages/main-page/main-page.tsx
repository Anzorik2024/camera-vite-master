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
import { filterCamerasByPrice } from '../../utils/filter-cameras-by-price';
import { filterCameras } from '../../utils/filter-cameras';
import { getCurrentSortOrder,getCurrentSortType, getUserEnteredBottomPrice,getUserEnteredTopPrice,
  getCurrentFilterByCategory, getCurrentFiltersByTypes,getCurrentFiltersByLevels,} from '../../store/selectors';
import EmptyPage from '../empty-page/empty-page';
import useCheckSearchParams from '../../hooks/use-check-search-params';

function MainPage ():JSX.Element {
  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();

  useCheckSearchParams();

  const camerasCatalog = useAppSelector(selectCameras);
  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  const currentFiltersByLevels = useAppSelector(getCurrentFiltersByLevels);
  const currentBottomPrice = Number(useAppSelector(getUserEnteredBottomPrice));
  const currentTopPrice = Number(useAppSelector(getUserEnteredTopPrice));
  const currentSortByType = useAppSelector(getCurrentSortType);
  const currentSortByOrder = useAppSelector(getCurrentSortOrder);
  const isOrderStatus = useAppSelector(selectOrderStatus);

  const filterAllCameras = filterCameras(camerasCatalog, currentFilterByCategory, currentFiltersByLevels, currentFiltersByType);
  const camerasFilterByPrice = filterCamerasByPrice(filterAllCameras,currentBottomPrice, currentTopPrice);
  const camerasSort = sortCameras(camerasFilterByPrice,currentSortByType, currentSortByOrder);

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
                <Filters cameraFiltering={filterAllCameras}/>
                <div className="catalog__content">
                  <Sort/>
                  {camerasCatalog.length > 0 && camerasSort.length === 0 && <EmptyPage message={WarningMessage.NoProductsMatchingThisFilterWarning}/>}
                  <div className="cards catalog__cards">
                    {camerasSort.length > 0 && camerasSort.map((camera) => <ProductCard camera={camera} key={camera.id} onAddCameraInBasketButtonClick={handleAddCameraToBasketButtonClick} />)}
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
