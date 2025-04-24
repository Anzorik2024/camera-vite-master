export type UserInput = '' | number;

export type FilterData = {
  currentFilterCategory: string | null;
  currentFilterTypes: string[];
  currentFilterLevels: string[];
  bottomPrice: UserInput;
  topPrice: UserInput;
  minPrice: number;
  maxPrice: number;
};
