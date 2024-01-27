import { Link } from 'react-router-dom';
import favicon from '@/assets/favicon.png';
import { Button } from './ui/button';

export function Header() {
  return (
    <>
      <header className="relative flex justify-between items-center p-7 mb-8 bg-slate-950 w-full">
        <Link to="/" className='mx-10'>
          <img src={favicon} alt="logo" />
        </Link>

        <div className="flex gap-32">
          <Link className="transition hover:text-gray-400" to="/">
            Home
          </Link>
          <Link className="transition hover:text-gray-400" to="#">
            Produtos
          </Link>
          <Link className="transition hover:text-gray-400" to="#">
            Contatos
          </Link>
        </div>

        <div className="flex gap-10">
          <Button variant="outline">Login</Button>
          <Button variant="outline">Cadastro</Button>
        </div>
      </header>
    </>
  );
}

//TODO: add user name with a dropdown to logout
