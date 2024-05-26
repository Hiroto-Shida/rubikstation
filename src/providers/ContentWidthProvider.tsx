import { useState, useEffect, createContext, ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  contentRef: RefObject<HTMLElement>;
};

export const ContentWidthContext = createContext<number>(0);

export const ContentWidthProvider = ({ children, contentRef }: Props) => {
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    });

    const observedElement = contentRef.current;
    if (observedElement) {
      resizeObserver.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        resizeObserver.unobserve(observedElement);
      }
    };
  }, [contentRef]);

  return (
    <ContentWidthContext.Provider value={contentWidth}>{children}</ContentWidthContext.Provider>
  );
};
