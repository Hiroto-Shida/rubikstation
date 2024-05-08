import './App.css';
import { Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages/Index/container';
import { NotFoundPage } from './pages/NotFound/container';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;