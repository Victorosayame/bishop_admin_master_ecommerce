
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }
  return (
    <div>
      <div className='mb-4 flex flex-wrap items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='absolute top-2 right-2 z-10 rounded'>
              <Button 
                type='button'
                onClick={() => onRemove(url)} 
                size="icon"
                className='bg-red-1 text-white rounded hover:bg-red-1 hover:opacity-70'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>

          <Image 
            src={url}
            alt='collection'
            className='object-cover rounded-lg'
            fill
          />
          </div>
        ))}
      </div>
    <CldUploadWidget uploadPreset="v6tfu4gd" onSuccess={onUpload}>
  {({ open }) => {
    return (
      <Button 
        type='button'
        onClick={() => open()}
        variant="secondary"
        className='bg-grey-1 text-white hover:text-white rounded hover:bg-grey-1 hover:opacity-80'
      > 
        <Plus className='h-4 w-4 mr-2' />
        Upload Image
      </Button>
    );
  }}
</CldUploadWidget>
</div>
  )
}

export default ImageUpload