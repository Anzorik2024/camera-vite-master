import { SocialItems } from '../../const/social-items';


function SocialList(): JSX.Element {
  return(
    <ul className="social">
      {Object.values(SocialItems).map((title) => (
        <li className="social__item" key={title}>
          <a
            className="link"
            href={`https://${title}.com`}
            aria-label={`Переход на страницу ${title}`}
          >
            <svg width={20} height={20} aria-hidden="true">
              <use xlinkHref={`#icon-${title}`} />
            </svg>
          </a>
        </li>))}
    </ul>
  );
}

export default SocialList;
