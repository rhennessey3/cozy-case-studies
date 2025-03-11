
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileType, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FontUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const fontFiles = fileArray.filter(file => 
        file.name.endsWith('.woff') || 
        file.name.endsWith('.woff2') || 
        file.name.endsWith('.ttf') || 
        file.name.endsWith('.otf')
      );
      
      if (fileArray.length !== fontFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Please upload only font files (.woff, .woff2, .ttf, .otf)",
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...fontFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      const fontFiles = fileArray.filter(file => 
        file.name.endsWith('.woff') || 
        file.name.endsWith('.woff2') || 
        file.name.endsWith('.ttf') || 
        file.name.endsWith('.otf')
      );
      
      if (fileArray.length !== fontFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Please upload only font files (.woff, .woff2, .ttf, .otf)",
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...fontFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files to save",
        description: "Please upload at least one font file",
        variant: "destructive",
      });
      return;
    }

    // For each file, let user download it
    files.forEach(file => {
      downloadFile(file);
    });

    toast({
      title: "Font files downloaded",
      description: "Please place these files in your src/assets/fonts directory",
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Font Uploader</h2>
      <p className="mb-4 text-gray-600">
        Upload your custom font files (.woff, .woff2, .ttf, .otf) here. 
        After uploading, you'll be able to download them and then manually place them in 
        the src/assets/fonts directory of your project.
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
        <p className="mb-2">Drag and drop your font files here, or click to select files</p>
        <Button
          variant="outline"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          Select Files
        </Button>
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".woff,.woff2,.ttf,.otf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
          <ul className="space-y-2 mb-4">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <FileType className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="text-destructive"
                >
                  <X className="h-5 w-5" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button onClick={handleSaveFiles} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Download Files
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-secondary rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Upload your font files using this uploader</li>
          <li>Download the files when prompted</li>
          <li>Add these files to your project's <code>src/assets/fonts</code> directory</li>
          <li>Update your <code>index.css</code> file with the correct font file names</li>
          <li>Update your <code>tailwind.config.ts</code> file with your custom font name</li>
        </ol>
      </div>
    </div>
  );
};

export default FontUploader;
