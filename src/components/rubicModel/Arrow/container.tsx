import { ArrowPresenter } from "./presenter";
import * as THREE from "three";

export type ArrowType = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

type Props = {
  index: number;
  moveChar: string | undefined;
};

export const Arrow = ({ index, moveChar }: Props) => {
  return <ArrowPresenter index={index} moveChar={moveChar} />;
};
