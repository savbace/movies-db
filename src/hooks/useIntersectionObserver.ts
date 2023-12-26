import { useRef, useState, useEffect, MutableRefObject } from "react";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export function useIntersectionObserver(): [MutableRefObject<null>, boolean] {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  function callbackFn(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return function () {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  return [containerRef, isVisible];
}
