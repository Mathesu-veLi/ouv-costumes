export function getProducts() {
    const productsJson = fetch(
        'http://192.168.100.5:3000/api/products',
        {
            method: 'GET',
        },
    ).then((products => products.json().then(productsArray => productsArray)));

    return productsJson
}
