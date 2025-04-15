import { Cameras } from '../types/camera';
import { SortByTypeServerValue} from '../const/sort-by-type';
import { SortByOrderServerValue } from '../const/sort-by-order';

export const sortBy = (initialCameras : Cameras , sortType: SortByTypeServerValue, order: SortByOrderServerValue) : Cameras => {
  const cameras = [...initialCameras];
  // Определяем множитель для направления сортировки
  const direction = order === 'asc' ? 1 : -1;

  switch (sortType) {
    case SortByTypeServerValue.Price:
      cameras.sort((firstCamera, secondCamera) => direction * (secondCamera.price - firstCamera.price));
      break;

    case SortByTypeServerValue.Popular:
      cameras.sort((firstCamera, secondCamera) => direction * (secondCamera.rating - firstCamera.rating));
      break;
  }
  return cameras; // Возвращаем исходный массив, если параметр сортировки не распознан
};
