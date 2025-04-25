import { Cameras } from '../types/camera';
import { SortByTypeValue} from '../const/sort-by-type';
import { SortByOrderServerValue } from '../const/sort-by-order';

export const sortCameras = (initialCameras : Cameras | [] , sortType: SortByTypeValue, order: SortByOrderServerValue) : Cameras => {
  const cameras = [...initialCameras];
  const direction = order === 'asc' ? 1 : -1;

  switch (sortType) {
    case SortByTypeValue.Price:
      cameras.sort((firstCamera, secondCamera) => direction * (firstCamera.price - secondCamera.price));
      break;

    case SortByTypeValue.Popular:
      cameras.sort((firstCamera, secondCamera) => direction * (firstCamera.rating - secondCamera.rating));
      break;
  }
  return cameras;
};
