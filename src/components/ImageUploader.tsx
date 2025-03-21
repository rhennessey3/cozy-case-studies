
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  imageUrl?: string; // Changed from currentImageUrl to imageUrl for consistency
  label?: string;
  className?: string;
  aspectRatio?: string; // Added aspect ratio prop
}

const ImageUploader = ({ 
  onImageUploaded, 
  imageUrl, // Updated prop name
  label = 'Image', 
  className,
  aspectRatio 
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    setUploading(true);
    
    try {
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('case-study-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('case-study-images')
        .getPublicUrl(filePath);
        
      if (urlData) {
        onImageUploaded(urlData.publicUrl);
        toast.success('Image uploaded successfully');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="font-medium">{label}</label>
      <div className="flex flex-col gap-2">
        {preview && (
          <div className={cn(
            "relative w-full h-48 mb-2 border rounded-md overflow-hidden",
            aspectRatio && `aspect-${aspectRatio}`
          )}>
            <img 
              src={preview} 
              alt="Preview" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
          </Button>
          
          {preview && (
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => {
                setPreview(null);
                onImageUploaded('');
              }}
            >
              Remove Image
            </Button>
          )}
          
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
