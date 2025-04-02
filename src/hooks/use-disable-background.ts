import {useEffect} from 'react';

const useDisableBackground = (modalOpen : boolean) => {
  useEffect(() => {
    if (modalOpen && typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

};

export default useDisableBackground;
