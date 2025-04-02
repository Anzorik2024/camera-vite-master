import { useRef, useState } from 'react';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useInputFocus from '../../hooks/use-input-focus';
import useTrapFocus from '../../hooks/use-trap-focus';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectCamera, getSelectPhoneOrder } from '../../store/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';
import PhoneNumberInput from '../phone-number-input/phone-number-input';


import { orderSliceAction } from '../../store/order-slice/order-slice';
import { useActionCreators } from '../../hooks/use-action-creators';
import { Order } from '../../types/order';


type BasketModalProps = {
  onCloseModal: () => void;
  isOpen: boolean;
}

function BasketModal({ onCloseModal, isOpen}: BasketModalProps) : JSX.Element {
  const selectedCamera = useAppSelector(getSelectCamera);
  const selectedPhone = useAppSelector(getSelectPhoneOrder);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const {sendOrderAction} = useActionCreators(orderSliceAction);

  const modalRef = useRef(null);
  const telInputRef = useRef<HTMLInputElement>(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  const initialOrderData = {
    camerasIds: [],
    coupon: null,
    tel: ''
  };

  const handleButtonOrderClick = () => {
    if(selectedPhone && selectedCamera) {
      const sendInitialOrderData : Order = {
        ...initialOrderData,
        camerasIds: [Number(selectedCamera.id)],
        tel: selectedPhone

      };
      sendOrderAction(sendInitialOrderData);
    }
  };

  useOnClickOutside(modalRef, handleModalCloseClick);
  useKeydownEscClose(handleModalCloseClick);
  useInputFocus(isOpen,telInputRef);
  useTrapFocus(telInputRef, buttonCloseRef,isOpen);

  return (
    <div className="modal__wrapper" data-testid='basket-modal'>
      <div className="modal__overlay"></div>
      <div className="modal__content" ref={modalRef}>
        <p className="title title--h4">Свяжитесь со мной</p>
        {selectedCamera && <BasketItemShort camera={selectedCamera}/>}
        <PhoneNumberInput inputRef={telInputRef} setIsButtonDisabled={setIsButtonDisabled} isOpen={isOpen}/>
        <div className="modal__buttons">
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonOrderClick} disabled={!isButtonDisabled} >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Заказать
          </button>
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalCloseClick} ref={buttonCloseRef}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BasketModal;
