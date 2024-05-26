import { ReactNode, useRef } from "react";
import { LayoutPresenter } from "./presenter";
import { ContentWidthProvider } from "../../../providers/ContentWidthProvider";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const contentRef = useRef<HTMLElement>(null); // メインコンテンツ領域のwidth

  return (
    <ContentWidthProvider contentRef={contentRef}>
      <LayoutPresenter contentRef={contentRef}>{children}</LayoutPresenter>
    </ContentWidthProvider>
  );
};
