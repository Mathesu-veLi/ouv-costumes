import { VoidFunction } from '@/interfaces/GenericVoidFunction';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

export async function createFileObjectFromImage(imagePath: string) {
  if (!imagePath) return;
  const blob = await (await fetch(imagePath)).blob();
  const imageFile = new File([blob], 'product.jpg', { type: blob.type });
  return imageFile;
}

interface UploadResponse {
  filename: string;
}

export async function uploadProductImage(
  image: File,
  token: string,
  setIsLoading: VoidFunction<boolean>,
) {
  const formData = new FormData();
  formData.append('image', image);

  if (image) {
    const res = await api
      .post<UploadResponse>('/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setIsLoading(false);
      });

    return res?.data.filename;
  }
}

export async function deleteProductImage(filename: string, token: string) {
  await api
    .delete(`/upload/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}
