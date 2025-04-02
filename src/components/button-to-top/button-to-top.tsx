
function ButtonToTop(): JSX.Element {
  const handleButtonToTopClick = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <a
      className="up-btn"
      onClick={handleButtonToTopClick}
      data-testid="up-btn"
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  );
}

export default ButtonToTop;
