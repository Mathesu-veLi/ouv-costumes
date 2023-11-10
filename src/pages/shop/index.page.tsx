import { useEffect, useState } from 'react';
import { getProducts } from './modules/getProducts';
import { Showcase, Title } from './styled';

import Image from 'next/image';

import { Container } from 'react-bootstrap';

import { GlobalStyle } from './style.global';

export default function Shop() {
    const [productsArray, setProductsArray] = useState([]);

    useEffect(() => {
        getProducts().then((products) => setProductsArray(products));
    }, []);

    return (
        <>
            <Container>
                <Title className="text-center mt-5">Produtos</Title>

                <div className="row d-flex justify-content-center">
                    {productsArray.map(
                        (
                            product: {
                                id: number;
                                name: string;
                                price: number;
                                imagePath: string;
                            },
                            index,
                        ) => (
                            <Showcase key={index} className="m-5 row gx-4">
                                <div className="image col">
                                    <Image
                                        src={`/products/${product.imagePath}`}
                                        alt=""
                                        width={230}
                                        height={230}
                                    />
                                </div>
                                <div className="about">
                                    <h2 className="m-0">{product.name}</h2>
                                    <h3 className="m-0">
                                        R${Number(product.price).toFixed(2)}
                                    </h3>
                                </div>
                            </Showcase>
                        ),
                    )}
                </div>
            </Container>
            <GlobalStyle />
        </>
    );
}
