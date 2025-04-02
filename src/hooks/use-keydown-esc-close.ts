import { useEffect } from 'react';

export const useKeydownEscClose = (onModalClose: () => void) => {
  useEffect(() => {
    const handleEventKeydown = (event: KeyboardEvent) => {
      if(event.key?.startsWith('Esc')) {
        event.preventDefault();

        onModalClose();
      }
    };

    document.addEventListener('keydown', handleEventKeydown);

    return () => document.removeEventListener('keydown', handleEventKeydown);
  }, [onModalClose]);
};
