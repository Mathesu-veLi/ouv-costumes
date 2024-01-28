import favicon from '@/assets/favicon.png';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { Button } from './ui/button';

export function Header() {
  const Links = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Produtos',
      path: '/products',
    },
    {
      name: 'Contatos',
      path: '/contacts',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-center w-full">
      <div
        className={`relative flex justify-center lg:gap-40 gap-10 items-center mt-5 mb-8 py-3 ${
          isOpen ? 'border-x border-t rounded-t-lg' : 'border rounded-lg'
        } border-zinc-800 px-12 lg:border lg:border-slate-900 lg:shadow lg:shadow-slate-900 lg:rounded-2xl`}
      >
        <div className="z-20 flex gap-10 items-center bg-inherit bg-zinc-950">
          <a href="/" className="lg:w-20 lg:mx-8">
            <img src={favicon} alt="logo" />
          </a>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 lg:hidden flex justify-center items-center"
          >
            {isOpen ? <MdClose /> : <FaBars />}
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row lg:border-none items-center justify-center gap-4 lg:gap-20 absolute lg:static z-10 lg:opacity-100 transition-all duration-500 ease-in-out border-x border-b lg:p-0 p-3 bg-zinc-950 left-0 w-full rounded-b-md ${
            isOpen ? 'top-12 opacity-100' : 'opacity-0 -top-56'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-20 justify-center items-center">
            {Links.map((link) => {
              return (
                <li key={link.name} className="my-5">
                  <a href={link.path}>{link.name}</a>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-2 lg:gap-7 p-1">
            <Button variant="outline">
              <a href="/login">Login</a>
            </Button>
            <Button variant="outline">
              <a href="/register">Cadastro</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

//TODO: add user name with a dropdown to logout
