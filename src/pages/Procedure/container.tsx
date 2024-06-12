import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout/container";
import { ProcedurePagePresenter } from "./presenter";
import { useEffect } from "react";

export const ProcedurePage = () => {
  const { step } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <Layout>
      <ProcedurePagePresenter step={step} />
    </Layout>
  );
};
