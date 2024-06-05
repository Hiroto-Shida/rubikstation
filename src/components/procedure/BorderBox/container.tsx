import { BorderBoxPresenter } from "./presenter";

export const BorderBox = ({ children }: { children: React.ReactNode }) => {
  return <BorderBoxPresenter>{children}</BorderBoxPresenter>;
};
