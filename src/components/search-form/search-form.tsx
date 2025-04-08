import { useState, useEffect} from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectCameras } from '../../store/selectors';
import { Cameras } from '../../types/camera';
import useKeyPress from '../../hooks/use-key-press';
function SearchForm () : JSX.Element {
  const [query, setQuery] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [foundCameras, setFilteredCameras] = useState<Cameras | []>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState<number | null> (null);
  const camerasCatalog = useAppSelector(selectCameras);

  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setIsListOpen(value.length >= 3);
    setCurrentProductIndex(null); // Сброс активного индекса при изменении запроса
  };

  const handleResetButtonClick = () => {
    setQuery('');
    setIsListOpen(false);
    setFilteredCameras([]);
    setCurrentProductIndex(null); // Сброс активного индекса
  };

  useEffect(() => {
    if (query.length >= 3) {
      const filteredCameras = camerasCatalog.filter((camera) =>
        camera.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCameras(filteredCameras);
      setCurrentProductIndex(null); // Сброс активного индекса при новом фильтре
    }
  }, [query, camerasCatalog]);

  useEffect(() => {
    if (foundCameras.length && arrowUpPressed) {
      setCurrentProductIndex((prevState) => (prevState !== null && prevState > 0 ? prevState - 1 : prevState));
    }
  }, [arrowUpPressed, foundCameras]);

  useEffect(() => {
    if (foundCameras.length && arrowDownPressed) {
      setCurrentProductIndex((prevState) => (prevState !== null && prevState < foundCameras.length - 1 ? prevState + 1 : prevState));
    }
  }, [arrowDownPressed, foundCameras]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      console.log(currentProductIndex);
    }

  };


  return (
    <div
      className={`form-search ${query.length ? 'list-opened' : ''}`}
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
            onKeyDown={handleInputKeyDown}
          />
        </label>
        {isListOpen && foundCameras.length > 0 && (
          <ul
            className="form-search__select-list scroller"
          >
            {foundCameras.map((camera) => (
              <li
                key={camera.id}
                className="form-search__select-item"
                tabIndex={0}
                // onClick={() => handleItemClick(product)}
              >
                {camera.name}
              </li>
            ))}
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

