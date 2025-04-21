import { Cameras } from '../types/camera';
import { FilterByCategory } from '../const/filter-by-category';

export const filterCameras = (
  initialCameras: Cameras,
  category: string | null,
  skillLevels: string[],
  cameraTypes: string[]
): Cameras => {
  let filteredCameras = [...initialCameras];

  if (category) {
    const categoryAdapt = category === FilterByCategory.Photocamera ? 'Фотоаппарат' : FilterByCategory.Videocamera;
    filteredCameras = filteredCameras.filter((camera) =>
      camera.category === categoryAdapt
    );
  }

  if (skillLevels.length > 0) {
    filteredCameras = filteredCameras.filter((camera) =>
      skillLevels.includes(camera.level)
    );
  }

  if (cameraTypes.length > 0) {
    filteredCameras = filteredCameras.filter((camera) =>
      cameraTypes.includes(camera.type)
    );
  }
  return filteredCameras;
};
