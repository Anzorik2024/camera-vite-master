import {useState } from 'react';
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
  const [isCharacteristicsActive, setisCharacteristicsActive] = useState<boolean>(false);
  const [isDescriptionActive, setisDescriptionActive] = useState<boolean>(true);

  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  ////

  const handleCharacteristicsButtonClick = () => {
    setisCharacteristicsActive(true);
    setisDescriptionActive(false);
    navigate({
      pathname: `${AppRoute.Product}/${id}`,
      search: `?${ComponentName.Tab}=${TabType.Features as string}`,
    });
  };

  const handleDescriptionButtonClick = () => {
    setisDescriptionActive(true);
    setisCharacteristicsActive(false);
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
          isActive={isCharacteristicsActive}
          title={TabsButtonsTitles.Characteristics}
        />
        <TabButton
          onClick={handleDescriptionButtonClick}
          isActive={isDescriptionActive}
          title={TabsButtonsTitles.Description}
        />
      </div>
      <div className="tabs__content">
        <TabCharacteristics
          camera={camera}
          isActive={isCharacteristicsActive}
        />
        <TabDescription
          description={camera.description}
          isActive={isDescriptionActive}
        />
      </div>
    </div>
  );
}

export default Tabs;
