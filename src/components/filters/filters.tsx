import {useState } from 'react';
import FilterByPrice from '../filter-by-price/filter-by-price';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UserInput } from '../../types/filter';
import { resetFilters } from '../../store/filter-slice/filter-slice';
function Filters(): JSX.Element {

  const dispatch = useAppDispatch();

  const [bottomPrice, setBottomPrice] = useState<UserInput>('');
  const [topPrice, setTopPrice] = useState<UserInput>('');

  const handleFormReset = () => {
    dispatch(resetFilters());
    setBottomPrice('');
    setTopPrice('');
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" onReset={handleFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterByPrice
            bottomPrice={bottomPrice}
            topPrice={topPrice}
            onBottomPriceChange={setBottomPrice}
            onTopPriceChange={setTopPrice}
          />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-radio catalog-filter__item">
              <label>
                <input type="radio" name="category" value="photocamera" checked/><span className="custom-radio__icon"></span><span className="custom-radio__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-radio catalog-filter__item">
              <label>
                <input type="radio" name="category" value="videocamera"/><span className="custom-radio__icon"></span><span className="custom-radio__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
