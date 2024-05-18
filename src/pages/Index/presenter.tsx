import { Scramble } from "../../components/scramble/Scramble/container";
import { Timer } from "../../components/timer/Timer/container";

export const IndexPagePresenter = () => {
  return (
    <>
      <Timer />
      <Scramble />
    </>
  );
};
