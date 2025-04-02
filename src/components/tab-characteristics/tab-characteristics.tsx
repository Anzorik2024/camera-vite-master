import { capitalizeFirstLetter } from '../../utils/format';
import { Camera } from '../../types/camera';


type TabCharacteristicsProps = {
  camera: Camera;
  isActive: boolean;
}
function TabCharacteristics({camera, isActive}: TabCharacteristicsProps): JSX.Element {
  const { category, type, vendorCode, level } = camera;

  return (
    <div className={`tabs__element ${isActive ? 'is-active' : ''}`}>
      <ul className="product__tabs-list">
        <li className="item-list">
          <span className="item-list__title">Артикул:</span>
          <p className="item-list__text">{vendorCode}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Категория:</span>
          <p className="item-list__text">{capitalizeFirstLetter(category)}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Тип камеры:</span>
          <p className="item-list__text">{capitalizeFirstLetter(type)}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Уровень:</span>
          <p className="item-list__text">{capitalizeFirstLetter(level)}</p>
        </li>
      </ul>
    </div>
  );
}

export default TabCharacteristics;
