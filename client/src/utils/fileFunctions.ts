export async function createFileObjectFromImage(imagePath: string) {
  const blob = await (await fetch(imagePath)).blob();
  const imageFile = new File([blob], 'product.jpg', { type: blob.type });
  return imageFile;
}
