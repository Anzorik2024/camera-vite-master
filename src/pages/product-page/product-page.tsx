import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import Spiner from '../../components/spiner/spiner';
import { RequestStatus } from '../../const/request-status';
import { selectProductStatus, selectProductCamera} from '../../store/selectors';
import { useActionCreators } from '../../hooks/use-action-creators';
import { productDataActions } from '../../store/product-slice/product-slice';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import BreadCrumbsProduct from '../../components/bread-crumbs-product/bread-crumbs-product';
import NotFoundPage from '../not-found-page/not-found-page';
import CameraInfo from '../../components/camera-info/camera-info';
import ReviewBlock from '../../components/review-block/review-block';
import ButtonToTop from '../../components/button-to-top/button-to-top';


function ProductPage():JSX.Element {

  const status = useAppSelector(selectProductStatus);
  const { fetchCameraByIdAction, fetchCameraReviews } = useActionCreators(productDataActions);
  const camera = useAppSelector(selectProductCamera);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id) {
      Promise.all([
        fetchCameraByIdAction(id),
        fetchCameraReviews(id),
      ]);
    }
  }, [fetchCameraByIdAction, fetchCameraReviews, id]);

  if (status === RequestStatus.Loading) {
    return (
      <Spiner />
    );
  }
  if (status === RequestStatus.Failed) {
    return <NotFoundPage />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {camera ? <BreadCrumbsProduct camera={camera}/> : null}
          <div className="page-content__section">
            {camera ? <CameraInfo camera={camera} /> : null}
          </div>
          <div className="page-content__section">
            <ReviewBlock/>
          </div>
        </div>
      </main>
      <ButtonToTop/>
      <Footer />
    </div>
  );
}

export default ProductPage;
