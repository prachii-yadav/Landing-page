import { useEffect, useRef } from 'react';

/**
 * Calls `onEnter(element, index)` once when the element enters the viewport.
 * Returns a ref to attach to the element you want to observe.
 *
 * @param {Function} onEnter   - callback fired when element is visible
 * @param {object}   options   - IntersectionObserver options
 */
export function useIntersectionObserver(onEnter, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onEnter(el);
        observer.unobserve(el); // fire only once
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
