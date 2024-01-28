import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './containers/Home';
import { Header } from './components/Header';
import { Login } from './containers/Login';
import { Register } from './containers/Register';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ];
  
  return (
    <>
      <BrowserRouter>
        <Header />
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
