import { RefObject, useEffect } from 'react';

export default function useTrapFocus(firstRefElement: RefObject<HTMLElement> | null, lastRefElement: RefObject<HTMLElement> | null, isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const handleTabKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstRefElement?.current) {
              lastRefElement?.current?.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastRefElement?.current) {
              firstRefElement?.current?.focus();
              event.preventDefault();
            }
          }
        }
      };
      document.addEventListener('keydown', handleTabKeyDown);
      return () => {
        document.removeEventListener('keydown', handleTabKeyDown);
      };
    }
  }, [isOpen, firstRefElement, lastRefElement]);
}

