import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';
import { ControllerRenderProps } from 'react-hook-form';
import { createFileObjectFromImage } from '@/utils/fileFunctions';

interface IProps {
  field: ControllerRenderProps<
    {
      name: string;
      image: File;
      price: number;
      stock: number;
    },
    'image'
  >;
  imagePath?: string;
}

export function InputImg(props: IProps) {
  const [productImg, setProductImg] = useState<File | null>(null);

  async function setProductImgPromise() {
    if (!productImg && props.imagePath) {
      const imageFile = await createFileObjectFromImage(props.imagePath);
      setProductImg(imageFile);
    }
  }

  useEffect(() => {
    setProductImgPromise();
  }, []);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="productImg"
        onChange={(e) => {
          if (e.target.files) setProductImg(e.target.files[0]);
          const file = e.target.files?.[0];
          props.field.onChange(file);
        }}
      />
      <Button
        variant="outline"
        className="w-36 h-36 p-0"
        onClick={() => {
          document.getElementById('productImg')?.click();
        }}
      >
        {!productImg ? (
          <FaPlus />
        ) : (
          <img
            src={URL.createObjectURL(productImg)}
            alt="Product Image"
            className="w-full h-full object-cover"
          />
        )}
      </Button>
    </div>
  );
}
