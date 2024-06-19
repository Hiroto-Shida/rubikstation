import { InspectionSwitchPresenter } from "./presenter";
import { useInspectionStore } from "../../../stores/inspectionStore";
import { useRef, useState } from "react";

export const InspectionSwitch = () => {
  const { inspection, setInspection } = useInspectionStore();
  const [animate, setAnimate] = useState(false);
  const timeRef = useRef<NodeJS.Timeout>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    setInspection(event.target.checked);

    setAnimate(true);
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      setAnimate(false);
    }, 1000); // アニメーションの時間に合わせる
  };

  return (
    <InspectionSwitchPresenter
      handleChange={handleChange}
      inspection={inspection}
      animate={animate}
    />
  );
};
