enum SortByTypeTitle {
  Price = 'по цене',
  Popular= 'по популярности'
}

enum SortByTypeID {
  Price = 'sortPrice',
  Popular= 'sortPopular'
}

export enum SortByTypeValue {
  Price ='price',
  Popular='rating',
}


export const SORT_BY_TYPE = [
  {title: SortByTypeTitle.Price, id: SortByTypeID.Price, value: SortByTypeValue.Price},
  {title: SortByTypeTitle.Popular, id: SortByTypeID.Popular, value: SortByTypeValue.Popular},
] ;
