import '../search-form/search-form.css';
import { KeyboardEvent,SyntheticEvent, useEffect, useRef } from 'react';

import { Camera } from '../../types/camera';

type ListItemProps = {
  item: Camera;
  isFocused: boolean;
  onNavigateToCurrentProductPage: (id: number) => void;
}

function ListItemSearch({item, isFocused, onNavigateToCurrentProductPage}: ListItemProps): JSX.Element {
  const liRef = useRef<HTMLLIElement>(null);

  const handleListItemClick = (event: SyntheticEvent) => {
    const product = event.target as HTMLLIElement;
    const productId = Number(product.dataset.id);

    onNavigateToCurrentProductPage(productId);
  };

  const handleListItemKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const product = event.target as HTMLLIElement;
      const productId = Number(product.dataset.id);

      onNavigateToCurrentProductPage(productId);
    }
  };

  useEffect(() => {
    if(isFocused) {
      liRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <li
      tabIndex={isFocused ? -1 : 0}
      className={`form-search__select-item ${ isFocused ? 'form-search__select-item--active' : ''}`}
      data-id={item.id}
      onClick={handleListItemClick}
      onKeyDown={handleListItemKeydown}
      data-testid='list-item'
      ref={liRef}
    >
      {item.name}
    </li>
  );
}

export default ListItemSearch;
