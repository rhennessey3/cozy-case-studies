
import React from 'react';

interface ParagraphItem {
  title: string;
  content: string;
}

interface FourParagraphsSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  paragraphs: ParagraphItem[];
}

const FourParagraphsSection: React.FC<FourParagraphsSectionProps> = ({
  title,
  subtitle,
  imageUrl,
  paragraphs
}) => {
  // Filter out paragraphs with no content
  const validParagraphs = paragraphs.filter(para => para.title || para.content);

  if (validParagraphs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
        </div>
        
        {imageUrl && (
          <div className="mb-12">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full max-h-96 object-cover rounded-lg shadow-md mx-auto"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {validParagraphs.map((para, index) => (
            <div key={index} className="mb-6">
              {para.title && (
                <h3 className="text-xl font-semibold mb-3">{para.title}</h3>
              )}
              {para.content && (
                <p className="text-gray-700">{para.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourParagraphsSection;
