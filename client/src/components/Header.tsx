import favicon from '@/assets/favicon.png';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';

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
      <div className="relative flex justify-center lg:gap-40 gap-10 items-center mt-5 mb-8 py-3 bg-slate-950 px-10 lg:border lg:border-slate-900 lg:shadow lg:shadow-slate-900 rounded-md">
        <div className="z-20 flex gap-10 items-center bg-inherit">
          <a href="/" className="lg:w-20">
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
          className={`flex justify-center lg:gap-20 absolute lg:static z-10 transition-all duration-500 ease-in-out bg-inherit lg:p-0 p-4 left-0 w-full rounded-md ${
            isOpen ? 'top-[3.5em]' : '-top-[280px]'
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
        </div>

        {/*<div className="lg:flex gap-10">
          <Button variant="outline">Login</Button>
          <Button variant="outline">Cadastro</Button>
        </div>*/}
      </div>
    </header>
  );
}

//TODO: add user name with a dropdown to logout
