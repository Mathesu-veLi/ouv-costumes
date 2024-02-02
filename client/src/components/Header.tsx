import favicon from '@/assets/favicon.png';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { HeaderDropdown } from './HeaderDropdown';

interface IHeaderLink {
  name: string;
  path: string;
}

export function Header() {
  const Links: IHeaderLink[] = [];

  Links.push({ name: 'Home', path: '/' });
  Links.push({ name: 'Products', path: '/products' });
  Links.push({ name: 'Contact', path: '/contact' });

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { name } = useUserStore().userData;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="flex absolute justify-center w-full">
      <div
        className={`relative flex justify-center lg:gap-40 gap-10 items-center mt-5 mb-8 py-3 ${
          isOpen ? 'border-x border-t rounded-t-lg' : 'border rounded-lg'
        } px-12 lg:border lg:shadow-lg lg:shadow-violet-900 lg:rounded-2xl`}
      >
        <div className="z-20 flex gap-10 items-center bg-inherit bg-zinc-950">
          <Link to="/" className="lg:w-20 lg:mx-8">
            <img src={favicon} alt="logo" />
          </Link>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 lg:hidden flex justify-center items-center"
          >
            {isOpen ? <MdClose /> : <FaBars />}
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row lg:border-none items-center justify-center gap-4 lg:gap-20 absolute lg:static z-10 lg:opacity-100 transition-all duration-500 ease-in-out border-x border-b lg:p-0 p-3 bg-zinc-950 left-0 w-full rounded-b-md ${
            isOpen ? 'top-12 opacity-100' : 'opacity-100 -top-80'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-20 justify-center items-center">
            {Links.map((link) => {
              return (
                <li
                  key={link.name}
                  className="my-5 hover:text-gray-400 transition"
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              );
            })}
          </ul>

          {!name ? (
            <div className="flex gap-2 lg:gap-7 p-1">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          ) : (
            <HeaderDropdown userName={name} />
          )}
        </div>
      </div>
    </header>
  );
}

//TODO: add user name with a dropdown to logout
