import { useEffect,useState, ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasMaxPrice,getCamerasMinPrice } from '../../store/selectors';
import { UserInput } from '../../types/filter';
import { QueryKey } from '../../const/query-key';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {setBottomPrice,setTopPrice} from '../../store/filter-slice/filter-slice';
import { getUserEnteredBottomPrice, getUserEnteredTopPrice } from '../../store/selectors';

type FilterByPriceProps = {
  bottomPrice: UserInput;
  topPrice: UserInput;
  onBottomPriceChange: (bottomPrice: UserInput) => void;
  onTopPriceChange: (topPrice: UserInput) => void;
}
function FilterByPrice({bottomPrice, topPrice, onBottomPriceChange, onTopPriceChange}: FilterByPriceProps): JSX.Element {

  const dispatch = useAppDispatch();

  const minPrice = useAppSelector(getCamerasMinPrice);
  const maxPrice = useAppSelector(getCamerasMaxPrice);

  const numBottomPrice = Number(bottomPrice);
  const numTopPrice = Number(topPrice);

  const [isBottomPriceInvalid, setBottomPriceInvalid] = useState<boolean>(false);
  const [isTopPriceInvalid, setTopPriceInvalid] = useState<boolean>(false);

  const getValidBottomPrice = () => {
    if (numBottomPrice !== 0) {
      if (numBottomPrice < minPrice) {
        return minPrice;
      }
      if (numBottomPrice > maxPrice && numTopPrice === 0) {
        return maxPrice;
      }
      if ((numBottomPrice > numTopPrice || numBottomPrice > maxPrice) && numTopPrice !== 0) {
        return numTopPrice;
      }

      return bottomPrice;
    } else {
      return minPrice;
    }
  };

  const getValidTopPrice = () => {
    if(numTopPrice === 0) {
      console.log('здесь сделать повышение');// изменить наверное это
      return maxPrice;
    }
    if (numTopPrice > maxPrice && numTopPrice !== 0) {
      console.log('Первая проверка топ цены');
      return maxPrice;
    }
    if (numTopPrice < minPrice && numBottomPrice === 0) {
      console.log('Вторая проверка топ цены');
      return minPrice;
    }
    if ((numTopPrice < numBottomPrice || numTopPrice < minPrice) && numBottomPrice !== 0) {
      console.log('Третья проверка топ цены',numTopPrice);
      return numBottomPrice;
    }


    return numTopPrice;
  };

  const handlePriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value as UserInput;
    const filterType = event.target.dataset.query as QueryKey;
    const isNotValid = Number(price) <= 0;

    switch(filterType) {
      case QueryKey.BottomPrice : {
        if (isNotValid) {
          setBottomPriceInvalid(true);
          onBottomPriceChange('');
          return;
        }

        setBottomPriceInvalid(false);
        onBottomPriceChange(price);
        break;
      }

      case QueryKey.TopPrice :
        if(isNotValid) {
          setTopPriceInvalid(true);
          onTopPriceChange('');
          return;
        }

        setTopPriceInvalid(false);
        onTopPriceChange(price);
        break;
    }
  };

  const handlePriceInputBlur = (event: SyntheticEvent) => {
    const currentInput = event.target as HTMLInputElement;
    const filterType = currentInput.dataset.query as QueryKey;

    switch(filterType) {
      case QueryKey.BottomPrice: {
        const validBottomPrice = getValidBottomPrice();

        if (validBottomPrice) {
          onBottomPriceChange(validBottomPrice);

          dispatch(setBottomPrice(validBottomPrice)); // тестирую для фильтрации!!!
        }

        break;
      }

      case QueryKey.TopPrice: {
        const validTopPrice = getValidTopPrice();

        if (validTopPrice) {
          onTopPriceChange(validTopPrice);
          dispatch(setTopPrice(validTopPrice));// тестирую для фильтрации!!!
        }

        break;
      }
    }

    if (numBottomPrice === 0) {
      onBottomPriceChange('');
      setBottomPriceInvalid(false);
    }
    if (numTopPrice === 0) {
      onTopPriceChange('');
      setTopPriceInvalid(false);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      input.blur();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className={`custom-input ${isBottomPriceInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="price"
              placeholder={`${minPrice}`}
              value={bottomPrice}
              onChange={handlePriceInputChange}
              data-query={QueryKey.BottomPrice}
              onBlur={handlePriceInputBlur}
              onKeyDown={handleInputKeyDown}
            />
          </label>
        </div>
        <div className={`custom-input ${isTopPriceInvalid ? 'is-invalid' : '' }`}>
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`${maxPrice}`}
              onChange={handlePriceInputChange}
              data-query={QueryKey.TopPrice}
              onBlur={handlePriceInputBlur}
              onKeyDown={handleInputKeyDown}
              value={topPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}


export default FilterByPrice;
