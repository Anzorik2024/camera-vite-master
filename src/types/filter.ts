import { Cameras } from './camera';

export type UserInput = '' | number;

export type FilterData = {
  filterCameras: Cameras | [];
  currentFilterCategory: string | null;
  currentFilterTypes: string[];
  currentFilterLevels: string[];
  bottomPrice: UserInput;
  topPrice: UserInput;
  minPrice: number;
  maxPrice: number;
};
