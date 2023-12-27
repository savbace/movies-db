import { useRef, useState, useEffect, MutableRefObject } from "react";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(): HookReturnType {
  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  function callbackFn(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setEntry(entry);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return function () {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  return [targetRef, entry];
}
