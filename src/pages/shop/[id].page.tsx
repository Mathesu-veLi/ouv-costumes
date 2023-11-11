import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProduct } from './modules/getProducts';

export default function Product() {
    const [product, setProduct] = useState({
        id: null,
        name: null,
        price: null,
        imagePath: null,
    });

    const { id } = useRouter().query;

    useEffect(() => {
        if (id) {
            getProduct(Number(id)).then((product) => {
                return setProduct(product);
            });
        }
    }, [id]);

    return <h1>{product.id}</h1>;
}
