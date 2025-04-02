type TabDescriptionProps = {
  description: string;
  isActive: boolean;
}
function TabDescription({description, isActive}: TabDescriptionProps): JSX.Element {
  return (
    <div className={`tabs__element ${isActive ? 'is-active' : ''}`}>
      <div className="product__tabs-text">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TabDescription;
