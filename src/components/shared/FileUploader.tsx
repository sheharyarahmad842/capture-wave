import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.svg', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col justify-center items-center bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {fileUrl ? (
        <>
          <div className='flex flex-1 w-full justify-center p-5 lg:p-10'>
            <img
              src={fileUrl}
              className='rounded-[24px] h-60 lg:h-[480px] object-cover object-top w-full'
            />
          </div>
          <p className='text-center text-light-4 text-[14px] border-t border-t-dark-4 w-full p-4'>
            Click or drag a photo to replace
          </p>
        </>
      ) : (
        <div className='h-70 lg:h-[480px] bg-dark-3 rounded-xl flex flex-col justify-center items-center p-7'>
          <img
            src='/assets/icons/file-upload.svg'
            alt='Upload file'
            width={96}
            height={77}
          />
          <h3 className='mt-5 mb-2 text-light-1 font-semibold text-[20px] leading-[140%]'>
            Drag photo here
          </h3>
          <p className='text-[14px] text-light-4'>SVG, PNG, JPG, JPEG</p>
          <Button
            variant='default'
            className='bg-dark-4 h-12 text-light-1 p-4 mt-6'
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
