import { useState, useEffect, useRef,} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { selectCameras } from '../../store/selectors';
import { Cameras } from '../../types/camera';
import ListItemSearch from '../list-item-search/list-item-search';
import useKeyPress from '../../hooks/use-key-press';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { AppRoute } from '../../const/app-route';

function SearchForm () : JSX.Element {
  const [query, setQuery] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [foundCameras, setFilteredCameras] = useState<Cameras | []>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const camerasCatalog = useAppSelector(selectCameras);

  useEffect(() => {
    if (query.length >= 3) {
      const filteredCameras = camerasCatalog.filter((camera) =>
        camera.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCameras(filteredCameras);
      setFocusedIndex(-1); // Сброс активного индекса при новом фильтре
    }
  }, [query, camerasCatalog]);

  const searchCamerasAmount = foundCameras.length;
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');

  useEffect(() => {
    if (searchCamerasAmount && arrowUpPressed) {
      setFocusedIndex((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [arrowUpPressed, searchCamerasAmount]);

  useEffect(() => {
    if (searchCamerasAmount && arrowDownPressed) {
      setFocusedIndex((prevState) => (prevState < searchCamerasAmount - 1 ? prevState + 1 : prevState));
    }
  }, [arrowDownPressed, searchCamerasAmount]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setIsListOpen(value.length >= 3);
    setFocusedIndex(-1); // Сброс активного индекса при изменении запроса
  };

  const resetDropdown = () => {
    setQuery('');
    setIsListOpen(false);
    setFilteredCameras([]);
    setFocusedIndex(-1); // Сброс активного индекса
  };

  const handleResetButtonClick = () => {
    resetDropdown();
  };

  const navigateToCurrentProductPage = (id: number) => {
    navigate(`${AppRoute.Product}/${id}`);
    resetDropdown();
  };

  useOnClickOutside(searchRef, resetDropdown);
  useKeydownEscClose(resetDropdown);

  return (
    <div
      className={`form-search ${query.length ? 'list-opened' : ''}`}
      ref={searchRef}
    >
      <form >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={query}
            onChange={handleInputChange}
            // onKeyDown={handleInputKeyDown}
          />
        </label>
        {isListOpen && foundCameras.length > 0 && (
          <ul
            className="form-search__select-list scroller"
            tabIndex={-1}
          >
            {foundCameras.map((camera, index) => {
              const isFocused = index === focusedIndex;

              return(
                < ListItemSearch
                  key={camera.id}
                  isFocused={isFocused}
                  onNavigateToCurrentProductPage={navigateToCurrentProductPage}
                  item={camera}
                />
              );
            })}
          </ul>
        )}

      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleResetButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;

