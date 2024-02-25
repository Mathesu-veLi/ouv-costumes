export function formatToPrice(price: number) {
  return price
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace(',', '.');
}
