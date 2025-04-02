type IconStarProps = {
  isFull: boolean;
}
function IconStar({isFull}: IconStarProps): JSX.Element {
  return (
    <svg width={17} height={16} aria-hidden="true" data-testid="img-icon">
      <use xlinkHref={isFull ? '#icon-full-star' : '#icon-star'} data-testid="icon-use"/>
    </svg>
  );
}

export default IconStar;
