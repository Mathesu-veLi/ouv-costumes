export default function addProductToCart(
    userId: number,
    productId: number,
    quantity: number,
) {
    return fetch('http://192.168.100.5:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            productId,
            quantity,
        }),
    }).then(async (response) => await response.json());
}
