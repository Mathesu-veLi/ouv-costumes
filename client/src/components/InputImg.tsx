import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';
import { ControllerRenderProps } from 'react-hook-form';

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
  initialImage?: File;
  w?: string;
  h?: string;
}

export function InputImg(props: IProps) {
  const [productImg, setProductImg] = useState<File | null>(null);
  useEffect(() => {
    if (props.initialImage) setProductImg(props.initialImage);
  }, [props.initialImage]);

  const w = !props.w ? '60' : props.w;
  const h = !props.h ? '60' : props.h;

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
        type="button"
        className={`w-${w} h-${h} p-0`}
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
