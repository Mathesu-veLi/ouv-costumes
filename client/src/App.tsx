import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './containers/About';
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

  routes.push({
    path: '/',
    element: <Home />,
  })
  routes.push({
    path: '/about',
    element: <About />,
  })
  routes.push({
    path: '/login',
    element: <Login />,
  })
  routes.push({
    path: '/register',
    element: <Register />,
  })

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
