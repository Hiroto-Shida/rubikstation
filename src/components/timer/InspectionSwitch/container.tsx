import { InspectionSwitchPresenter } from "./presenter";
import { useInspectionStore } from "../../../stores/inspectionStore";
import { useContext, useRef, useState } from "react";
import Cookies from "js-cookie";
import { TimerStateContext } from "../../../providers/TimerStateProvider";

export const InspectionSwitch = () => {
  const timerState = useContext(TimerStateContext);
  const { inspection, setInspection } = useInspectionStore();
  const [activeClass, setActiveClass] = useState<string>("");
  const timeRef = useRef<NodeJS.Timeout>();

  const storeToCookie = (isInspection: boolean) => {
    const cookieIsInspection = Cookies.get("inspection");
    if (!cookieIsInspection) {
      Cookies.set("inspection", `${inspection}`);
    }

    if (cookieIsInspection !== `${isInspection}`) {
      Cookies.set("inspection", `${isInspection}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInspection(event.target.checked);
    storeToCookie(event.target.checked);

    clearTimeout(timeRef.current);
    // visibleに一旦して反映させた後、時間差でフェードアウトをつける
    setActiveClass("visible");
    timeRef.current = setTimeout(() => {
      setActiveClass("fade");
    }, 50);
    timeRef.current = setTimeout(() => {
      setActiveClass("");
    }, 1000);
  };

  return (
    <InspectionSwitchPresenter
      handleChange={handleChange}
      inspection={inspection}
      activeClass={activeClass}
      timerState={timerState}
    />
  );
};
