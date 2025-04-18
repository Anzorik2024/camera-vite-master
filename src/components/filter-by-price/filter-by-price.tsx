import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasMaxPrice,getCamerasMinPrice } from '../../store/selectors';
function FilterByPrice(): JSX.Element {

  const minPrice = useAppSelector(getCamerasMinPrice);
  const maxPrice = useAppSelector(getCamerasMaxPrice);


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`${minPrice}`}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`${maxPrice}`}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}


export default FilterByPrice;
