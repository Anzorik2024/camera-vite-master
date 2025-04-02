import { useEffect, RefObject } from 'react';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) => {

  useEffect(() => {
    const listener = (event: Event) => {
      const popup = ref?.current;
      if (!popup || popup.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('pointerdown', listener);

    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, handler]);
};


export default useOnClickOutside;
