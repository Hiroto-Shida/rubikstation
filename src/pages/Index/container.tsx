import { Layout } from "../../components/layout/Layout/container";
import { TimerStateProvider } from "../../providers/TimerStateProvider";
import { IndexPagePresenter } from "./presenter";

export const IndexPage = () => {
  return (
    <Layout>
      <TimerStateProvider>
        <IndexPagePresenter />
      </TimerStateProvider>
    </Layout>
  );
};
