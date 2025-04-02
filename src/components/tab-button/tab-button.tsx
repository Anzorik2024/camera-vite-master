import { TabsButtonsTitles } from '../../const/tabs-buttons-titles';

type TabsProps = {
  onClick: () => void;
  isActive: boolean;
  title: TabsButtonsTitles;
}

function TabButton({onClick, isActive, title}: TabsProps): JSX.Element {
  const handleButtonClick = () => onClick();

  return (
    <button
      className={`tabs__control ${isActive ? 'is-active' : ''}`}
      type="button"
      onClick={handleButtonClick}
    >
      {title}
    </button>
  );
}

export default TabButton;
