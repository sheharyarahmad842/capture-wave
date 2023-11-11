import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { convertFileToUrl } from '@/lib/utils';

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
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
    <div {...getRootProps()} className='mt-10'>
      <input {...getInputProps()} className='cursor-pointer' />
      <div className='flex flex-1 items-center gap-4 w-full cursor-pointer'>
        <img
          src={fileUrl}
          className='w-24 h-24 rounded-full object-cover object-top'
        />
        <p className='text-primary-500 text-base font-semibold'>
          Change Profile Photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
