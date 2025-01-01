import { useState } from 'react';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';

export function InputImg() {
  const [productImg, setProductImg] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="productImg"
        onChange={(e) => {
          if (e.target.files) setProductImg(e.target.files[0]);
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
