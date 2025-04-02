import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useActionCreators} from '../../hooks/use-action-creators';
import { useAppSelector } from '../../hooks/use-app-selector';
import Spiner from '../spiner/spiner';
import MainPage from '../../pages/main-page/main-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import BasketPage from '../../pages/basket-page/basket-page';
import { selectIsLoading } from '../../store/selectors';
import { ToastContainer, toast} from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoute } from '../../const/app-route';
import { catalogReducerAction } from '../../store/catalog-slice/catalog-slice';


function App (): JSX.Element {

  const { fetchAllCameraAction } = useActionCreators(catalogReducerAction);

  useEffect(() => {
    fetchAllCameraAction()
      .unwrap()
      .catch(() => {
        toast.error(WarningMessage.DataLoadingWarning);
      });

  }, [fetchAllCameraAction]);


  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return (
      <Spiner />
    );
  }


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductPage/>}
        >
        </Route>
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        >
        </Route>
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
