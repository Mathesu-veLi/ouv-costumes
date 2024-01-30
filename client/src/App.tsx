import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './containers/Home';
import { Header } from './components/Header';
import { Login } from './containers/Login';
import { Register } from './containers/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IRoute {
  path: string;
  element: JSX.Element;
}

function App() {
  const routes: IRoute[] = [];

  function createRoute(path: string, element: JSX.Element): void {
    routes.push({ path, element });
  }

  createRoute('/', <Home />);
      element: <Login />,
  createRoute('/login', <Login />);
  createRoute('/register', <Register />);

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
