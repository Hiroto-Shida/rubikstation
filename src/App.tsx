import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/Index/container";
import { NotFoundPage } from "./pages/NotFound/container";
import { RubicModelPage } from "./pages/RubicModel/container";
import { ReleasePage } from "./pages/Release/container";
import { ProcedurePage } from "./pages/Procedure/container";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<IndexPage />} />
        <Route path={`/rubic-model`} element={<RubicModelPage />} />
        <Route path={`/procedure/`} element={<ProcedurePage />} />
        <Route path={`/procedure/:step`} element={<ProcedurePage />} />
        <Route path={`/release`} element={<ReleasePage />} />
        <Route path={`/*`} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
