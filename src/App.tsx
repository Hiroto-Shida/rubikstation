import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/Index/container";
import { NotFoundPage } from "./pages/NotFound/container";
import { RubicModelPage } from "./pages/RubicModel/container";

function App() {
  console.log(`VITE_BASE_URL = ${import.meta.env.VITE_BASE_URL}`);
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<IndexPage />} />
        <Route path={`/rubic-model/`} element={<RubicModelPage />} />
        <Route path={`/*`} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
