import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { EditUserData } from './containers/EditUserData';
import { Home } from './containers/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Products } from './containers/Products';
import { Product } from './containers/Product';
import { PageNotFound } from './containers/PageNotFound';
import { Cart } from './containers/Cart';
import { Contact } from './containers/Contact';

interface IRoute {
  path: string;
  element: JSX.Element;
}

function App() {
  const routes: IRoute[] = [];

  routes.push({
    path: '/',
    element: <Home />,
  });

  routes.push({
    path: '/contact',
    element: <Contact />,
  });

  routes.push({
    path: '/products',
    element: <Products />,
  });

  routes.push({
    path: '/product/:id',
    element: <Product />,
  });

  routes.push({
    path: '/cart',
    element: <Cart />,
  });

  routes.push({
    path: '/login',
    element: <Login />,
  });

  routes.push({
    path: '/register',
    element: <Register />,
  });

  routes.push({
    path: '/edit',
    element: <EditUserData />,
  });

  routes.push({
    path: '*',
    element: <PageNotFound />,
  });

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer theme="dark" />
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
