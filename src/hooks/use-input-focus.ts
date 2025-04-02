import {useEffect} from 'react';

const useInputFocus = (isOpen:boolean, inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (inputRef.current) {
      if (inputRef.current) {
        inputRef.current.style.visibility = isOpen ? 'visible' : 'hidden';
        inputRef.current?.focus();
      }
    }
  }, [isOpen, inputRef]);
};
export default useInputFocus;
