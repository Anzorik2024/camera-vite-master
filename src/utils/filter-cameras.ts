import { Cameras } from '../types/camera';

export const filterCameras = (
  initialCameras: Cameras,
  category: string | null,
  skillLevels: string[],
  cameraTypes: string[]
): Cameras => {
  // Копируем исходный массив для безопасной работы
  let filteredCameras = [...initialCameras];

  // Фильтрация по категории (фото/видео)
  if (category) {
    filteredCameras = filteredCameras.filter((camera) =>
      camera.category === category
    );
  }

  // Фильтрация по уровню владения
  if (skillLevels.length > 0) {
    filteredCameras = filteredCameras.filter((camera) =>
      skillLevels.includes(camera.level)
      //camera.type === ???
    );
  }

  // Фильтрация по типу камеры
  if (cameraTypes.length > 0) {
    filteredCameras = filteredCameras.filter((camera) =>
      cameraTypes.includes(camera.type)
    );
  }

  // Возвращаем отфильтрованный список камер
  return filteredCameras;
};
