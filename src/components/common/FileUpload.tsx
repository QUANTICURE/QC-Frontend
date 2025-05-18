import React, { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  label?: string;
  helpText?: string;
  onChange?: (files: File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.pdf,.csv,.vcf,.fasta',
  multiple = false,
  maxSize = 10, // 10MB default
  label = 'Upload file',
  helpText,
  onChange,
  className = '',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    
    const fileArray = Array.from(fileList);
    validateAndSetFiles(fileArray);
  };

  const validateAndSetFiles = (fileArray: File[]) => {
    setError(null);
    
    // Check file size
    const oversizedFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`File${oversizedFiles.length > 1 ? 's' : ''} exceeds the ${maxSize}MB limit`);
      return;
    }
    
    const newFiles = multiple ? [...files, ...fileArray] : fileArray;
    setFiles(newFiles);
    
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const fileList = e.dataTransfer.files;
    if (!fileList) return;
    
    const fileArray = Array.from(fileList);
    validateAndSetFiles(fileArray);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <File className="text-red-500" size={20} />;
      case 'csv':
        return <File className="text-green-500" size={20} />;
      case 'vcf':
      case 'fasta':
        return <File className="text-blue-500" size={20} />;
      default:
        return <File className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>}
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all
          ${isDragging 
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center py-3">
          <Upload size={24} className="text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drag and drop files here, or <span className="text-cyan-600">browse</span>
          </p>
          {helpText && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {helpText}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle size={16} className="mr-1" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-2 px-3 text-sm bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <div className="flex items-center space-x-2 truncate">
                  {getFileIcon(file.name)}
                  <span className="truncate max-w-[150px] md:max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <Button 
                  variant="text" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label="Remove file"
                >
                  <X size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;