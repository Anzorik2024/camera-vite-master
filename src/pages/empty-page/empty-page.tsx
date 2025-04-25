import { WarningMessage } from '../../const/warning-message';
import './empty-page.css';

type EmptyPageProps = {
  message: WarningMessage;
}

function EmptyPage({message}: EmptyPageProps): JSX.Element {
  return (
    <div className='empty-page'>
      <h1 className='title'>{message}</h1>
    </div>
  );
}

export default EmptyPage;
