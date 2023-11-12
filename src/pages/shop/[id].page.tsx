import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProduct } from './modules/getProducts';

import Image from 'next/image';

import { GlobalStyle } from './styles/style.global';
import { ProductDiv } from './styles/styled.product';
import { toast } from 'react-toastify';
import { Title } from './styles/styled.index';
import addProductToCart from './modules/addProductToCart';

export default function Product() {
    interface IProduct {
        id: number;
        name: string;
        price: number;
        imagePath: string;
        description: string[];
    }

    const [product, setProduct] = useState<IProduct>({
        id: 0,
        name: '',
        price: 0,
        imagePath: '',
        description: [''],
    });

    const [quantity, setQuantity] = useState(1);

    const router = useRouter();
    const productId = router.query.id;

    useEffect(() => {
        async function callProduct() {
            const productObtained = await getProduct(Number(productId));
            productObtained.description = (
                productObtained.description as string
            ).split(';');

            setProduct(productObtained);
        }

        if (productId) {
            callProduct();
        }
    }, [productId]);

    if (!product) {
        router.push('/shop');
        return toast.error('Product not found');
    } else if (!product.id) return null;

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                        return addProductToCart(id, product.id, quantity);
                }}
                className="d-flex justify-content-center align-items-center flex-column mt-5"
            >
                <Title>{product.name}</Title>
                <ProductDiv>
                    <Image
                        src={`/products/${product.imagePath}`}
                        alt="Product Image"
                        width={400}
                        height={400}
                    />
                    <div className="about">
                        <ul>
                            {product.description.map((attributes, index) => {
                                if (attributes)
                                    return <li key={index}>{attributes}</li>;
                            })}
                        </ul>
                        <h3>R${Number(product.price).toFixed(2)}</h3>
                        <div className="d-flex justify-content-center align-items-center flex-row-revert">
                            <button type="submit">Adicionar ao carrinho</button>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                </ProductDiv>
            </form>
            <GlobalStyle />
        </>
    );
}
