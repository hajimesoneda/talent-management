import React from 'react';
import { useDropzone } from 'react-dropzone';
import { User } from 'lucide-react';
import { resizeImage } from '../../utils/imageUtils';

interface PhotoUploadProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ photoUrl, onPhotoChange }) => {
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const resizedImage = await resizeImage(file);
      onPhotoChange(resizedImage);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`w-16 h-16 rounded-full cursor-pointer flex items-center justify-center overflow-hidden
        ${isDragActive ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-200'}`}
    >
      <input {...getInputProps()} />
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Employee"
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-8 h-8 text-gray-400" />
      )}
    </div>
  );
};