
import React from 'react';
import ImageUploader from '@/components/ImageUploader';

interface CaseStudyImagesTabProps {
  form: {
    introImage: string;
    challengeImage: string;
    approachImage: string;
    solutionImage: string;
    resultsImage: string;
    conclusionImage: string;
  };
  handleImageUploaded: (field: string, imageUrl: string) => void;
}

const CaseStudyImagesTab: React.FC<CaseStudyImagesTabProps> = ({ 
  form, 
  handleImageUploaded 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploader
          label="Introduction Image"
          currentImageUrl={form.introImage}
          onImageUploaded={(url) => handleImageUploaded('introImage', url)}
        />
        
        <ImageUploader
          label="Challenge Image"
          currentImageUrl={form.challengeImage}
          onImageUploaded={(url) => handleImageUploaded('challengeImage', url)}
        />
        
        <ImageUploader
          label="Approach Image"
          currentImageUrl={form.approachImage}
          onImageUploaded={(url) => handleImageUploaded('approachImage', url)}
        />
        
        <ImageUploader
          label="Solution Image"
          currentImageUrl={form.solutionImage}
          onImageUploaded={(url) => handleImageUploaded('solutionImage', url)}
        />
        
        <ImageUploader
          label="Results Image"
          currentImageUrl={form.resultsImage}
          onImageUploaded={(url) => handleImageUploaded('resultsImage', url)}
        />
        
        <ImageUploader
          label="Conclusion Image"
          currentImageUrl={form.conclusionImage}
          onImageUploaded={(url) => handleImageUploaded('conclusionImage', url)}
        />
      </div>
    </div>
  );
};

export default CaseStudyImagesTab;
