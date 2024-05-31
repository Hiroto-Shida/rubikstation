import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout/container";
import { ProcedurePagePresenter } from "./presenter";

export const ProcedurePage = () => {
  const { step } = useParams();

  return (
    <Layout>
      <ProcedurePagePresenter step={step} />
    </Layout>
  );
};
