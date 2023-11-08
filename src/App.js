import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./layout/Header";
import './sass/styles.scss';
// import View from './pages/View';

function App() {

  return (
    <div id="app">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="view" element={<View />} /> */}
      </Routes>
    </div>
  );
}

export default App;
