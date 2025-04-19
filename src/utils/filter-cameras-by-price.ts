import { Cameras } from '../types/camera';

export const filterCamerasByPrice = (cameras : Cameras, minPrice: number, maxPrice: number): Cameras =>
  cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
