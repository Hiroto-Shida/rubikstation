import { ComponentProps } from "react";
import { Arrow } from "./container";
import { Outlines } from "@react-three/drei";

type Props = ComponentProps<typeof Arrow>;

const OneArrow = ({ xOrZ, index }: { xOrZ: number; index: number }) => {
  const meshColor = "#ffffff";
  const outlineColor = "#001b33";
  const outlineScale = 1.2;
  const x = index === 0 ? 0 : xOrZ;
  const z = index === 0 ? xOrZ : 0;
  return (
    <>
      <mesh position={[x, 1, z]}>
        <coneGeometry args={[0.4, 1, 10]} />
        <meshStandardMaterial color={meshColor} emissive={meshColor} />
        <Outlines visible={true} color={outlineColor} scale={outlineScale} />
      </mesh>
      <mesh position={[x, -0.2, z]}>
        <cylinderGeometry args={[0.15, 0.15, 2.3, 10]} />
        <meshStandardMaterial color={meshColor} emissive={meshColor} />
        <Outlines visible={true} color={outlineColor} scale={outlineScale} />
      </mesh>
    </>
  );
};

export const ArrowPresenter = ({ index, moveChar }: Props) => {
  return (
    <>
      {moveChar && moveChar.includes("y") ? (
        <>
          <OneArrow xOrZ={-1} index={index} />
          <OneArrow xOrZ={0} index={index} />
          <OneArrow xOrZ={1} index={index} />
        </>
      ) : (
        <OneArrow xOrZ={0} index={index} />
      )}
    </>
  );
};
