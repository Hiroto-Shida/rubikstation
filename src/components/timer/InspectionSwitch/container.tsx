import { InspectionSwitchPresenter } from "./presenter";
import { useInspectionStore } from "../../../stores/inspectionStore";
import { useRef, useState } from "react";

export const InspectionSwitch = () => {
  const { inspection, setInspection } = useInspectionStore();
  // const [checked, setChecked] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<string>("");
  const timeRef = useRef<NodeJS.Timeout>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInspection(event.target.checked);
    setActiveClass("visible");

    clearTimeout(timeRef.current);
    // visibleに一旦して反映させた後、時間差でフェードアウトをつける
    timeRef.current = setTimeout(() => {
      setActiveClass("fade");
    }, 50);
  };

  return (
    <InspectionSwitchPresenter
      handleChange={handleChange}
      inspection={inspection}
      // checked={checked}
      activeClass={activeClass}
    />
  );
};
