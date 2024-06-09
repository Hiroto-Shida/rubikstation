import { ComponentProps } from "react";
import { OllPresenter } from "./presenter";
import { Canvas } from "@react-three/fiber";

type Props = {
  status?: string;
  canvasStyle?: Pick<ComponentProps<typeof Canvas>, "style">["style"];
  canvasCamera?: Pick<ComponentProps<typeof Canvas>, "camera">["camera"];
};

export const OllModel = ({ status, canvasStyle, canvasCamera }: Props) => {
  return <OllPresenter status={status} canvasStyle={canvasStyle} canvasCamera={canvasCamera} />;
};
