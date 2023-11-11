import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProduct } from './modules/getProducts';

import Image from 'next/image';

import { GlobalStyle } from './styles/style.global';
import { ProductDiv } from './styles/styled.product';
import { toast } from 'react-toastify';

export default function Product() {
    const [product, setProduct] = useState({
        id: null,
        name: null,
        price: null,
        imagePath: null,
    });

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function callProduct() {
            setProduct(await getProduct(Number(id)));
        }

        if (id) {
            callProduct();
        }
    }, [id]);

    if (!product) {
        router.push('/shop');
        return toast.error('Product not found')
    } else if (!product.id) return null

    return (
                <div className="about">{product.name}</div>
    );
}
