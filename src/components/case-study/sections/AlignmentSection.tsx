
import React from 'react';

interface AlignmentSectionProps {
  title: string;
  content: string;
  imageUrl: string;
  alignment: string;
}

const AlignmentSection: React.FC<AlignmentSectionProps> = ({
  title,
  content,
  imageUrl,
  alignment
}) => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
          <div className="w-full md:w-1/2">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="w-full md:w-1/2">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>}
            {content && <div className="prose max-w-none">{content}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlignmentSection;
