import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './containers/Home';
import { Header } from './components/Header';
import { Login } from './containers/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
