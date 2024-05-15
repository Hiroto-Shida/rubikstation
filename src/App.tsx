import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/Index/container";
import { NotFoundPage } from "./pages/NotFound/container";
import { RubicModelPage } from "./pages/RubicModel/container";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={import.meta.env.VITE_BASE_URL} element={<IndexPage />} />
        <Route
          path={`${import.meta.env.VITE_BASE_URL}/rubic-model`}
          element={<RubicModelPage />}
        />
        <Route
          path={`${import.meta.env.VITE_BASE_URL}/*`}
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
