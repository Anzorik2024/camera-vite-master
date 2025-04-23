import { Cameras } from '../types/camera';

export const usePriceRange = (camerasCatalog: Cameras): { minPrice: number; maxPrice: number } => {

  if (camerasCatalog.length === 0) {
    return { minPrice: 0, maxPrice: 0 };
  }

  const prices = camerasCatalog.map((camera) => camera.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return { minPrice, maxPrice };
};
