import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { TabType } from '../../const/tabs-buttons';
import { AppRoute } from '../../const/app-route';
import { ComponentName } from '../../const/component-name';


import TabButton from '../tab-button/tab-button';
import TabDescription from '../tab-description/tab-description';
import TabCharacteristics from '../tab-characteristics/tab-characteristics';
import { TabsButtonsTitles } from '../../const/tabs-buttons';

import { Camera } from '../../types/camera';

type TabsProps = {
  camera: Camera;
}
function Tabs({camera}: TabsProps): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const isTabExist = Object.values(TabType).some((type) => type === tab);
  const isDescription = tab === TabType.Description;
  const isCharacteristics = tab === TabType.Features;

  const handleCharacteristicsButtonClick = () => {
    navigate({
      pathname: `${AppRoute.Product}/${id}`,
      search: `?${ComponentName.Tab}=${TabType.Features as string}`,
    });
  };

  const handleDescriptionButtonClick = () => {
    navigate({
      pathname: `${AppRoute.Product}/${id}`,
      search: `?${ComponentName.Tab}=${TabType.Description as string}`,
    });
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <TabButton
          onClick={handleCharacteristicsButtonClick}
          isActive={isCharacteristics}
          title={TabsButtonsTitles.Characteristics}
        />
        <TabButton
          onClick={handleDescriptionButtonClick}
          isActive={isDescription}
          title={TabsButtonsTitles.Description}
        />
      </div>
      <div className="tabs__content">
        {isTabExist && (
          <TabCharacteristics
            camera={camera}
            isActive={isCharacteristics}
          />
        )}
        {isTabExist && (
          <TabDescription
            description={camera.description}
            isActive={isDescription}
          />
        )}
      </div>
    </div>
  );
}

export default Tabs;
