interface Product {
    userId: number;
    id: number;
    quantity: number;
}

export default function addProductToCart(
    userId: number,
    productsArray: Array<Product>,
    productId: number,
    quantity: number,
) {
    const productAlreadyInCart = productsArray.some(
        (product: { id: number }) => product.id === productId,
    );

    if (productAlreadyInCart) {
        return fetch(`http://192.168.100.5:3000/api/cart/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({
                productId,
                productsArray,
                quantity,
            }),
        }).then(async (response) => {
            return await response.json();
        });
    }

    return fetch(`http://192.168.100.5:3000/api/cart/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            productId,
            quantity,
        }),
    }).then(async (response) => {
        return await response.json();
    });
}
