import { IProduct } from '@/interfaces/IProduct';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Product(props: IProduct) {
  useEffect(() => {
    console.log(props.name.length);
  });
  return (
    <Link to={`/product/${props.id}`}>
      <div className="rounded-lg shadow-lg flex flex-col justify-center items-center px-2 py-5 border flex-1 flex-grow my-4">
        <img src={props.img} alt="banner" className="w-36 h-36 rounded-sm" />
        <div className="pt-3 text-center flex flex-col gap-2 justify-center">
          <h2 className="text-md max-w-32 min-h-12 flex justify-center items-center">
            {props.name.length > 26
              ? `${props.name.substring(0, 26)}...`
              : props.name}
          </h2>
          <p className="text-sm text-gray-400">
            {props.price
              .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
              .replace(',', '.')}
          </p>
        </div>
      </div>
    </Link>
  );
}
