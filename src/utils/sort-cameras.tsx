import { Cameras } from '../types/camera';
import { SortByTypeServerValue} from '../const/sort-by-type';
import { SortByOrderServerValue } from '../const/sort-by-order';

export const sortCameras = (initialCameras : Cameras , sortType: SortByTypeServerValue, order: SortByOrderServerValue) : Cameras => {
  const cameras = [...initialCameras];
  const direction = order === 'asc' ? 1 : -1;

  switch (sortType) {
    case SortByTypeServerValue.Price:
      cameras.sort((firstCamera, secondCamera) => direction * (firstCamera.price - secondCamera.price));
      break;

    case SortByTypeServerValue.Popular:
      cameras.sort((firstCamera, secondCamera) => direction * (firstCamera.rating - secondCamera.rating));
      break;
  }
  return cameras;
};
