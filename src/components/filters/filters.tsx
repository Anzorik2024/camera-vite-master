import {useState, ChangeEvent, KeyboardEvent } from 'react';
import FilterByPrice from '../filter-by-price/filter-by-price';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { UserInput } from '../../types/filter';
import { resetFilters, setCurrentFilterCategory } from '../../store/filter-slice/filter-slice';
import { FilterByCategory } from '../../const/filter-by-category';
import { getCurrentFilterByCategory } from '../../store/selectors';
function Filters(): JSX.Element {

  // useEffect(() => {
  //   if (categoryFilter === 'Все') {
  //     setProducts(initialProducts); // Показываем все товары
  //   } else {
  //     const filteredProducts = initialProducts.filter(
  //       (product) => product.category === categoryFilter
  //     );
  //     setProducts(filteredProducts);
  //   }
  // }, [categoryFilter, initialProducts]); - пример для фильтрации по категории


  const dispatch = useAppDispatch();
  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);
  const [bottomPrice, setBottomPrice] = useState<UserInput>('');
  const [topPrice, setTopPrice] = useState<UserInput>('');

  const handleFormReset = () => {
    dispatch(resetFilters());// поменять поведении перед сдачечей
    setBottomPrice('');
    setTopPrice('');
  };

  const handleCategoryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioInput = event.target;
    const value = radioInput.dataset.value as string;
    if (value) {
      dispatch(setCurrentFilterCategory(value));
    }
  };

  const handleCategoryInputKeyDown = (event: KeyboardEvent) => {
    const radioInput = event.target as HTMLInputElement;;
    const value = radioInput.dataset.value as string;
    if (event.key === 'Enter') {
      if (value) {
        dispatch(setCurrentFilterCategory(value));
      }
    }
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
            {Object.entries(FilterByCategory).map(([name, category]) => (
              <div className="custom-radio catalog-filter__item" key={name}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={name}
                    checked={category === currentFilterByCategory}
                    data-value={category}
                    onChange={handleCategoryInputChange}
                    onKeyDown={handleCategoryInputKeyDown}
                  />
                  <span className="custom-radio__icon">
                  </span>
                  <span className="custom-radio__label">
                    {category}
                  </span>
                </label>
              </div>
            ))}
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
