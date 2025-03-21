
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
  alignment = 'left' // Default to left alignment if not specified
}) => {
  // Debug output to help troubleshoot alignment issues
  React.useEffect(() => {
    console.log(`Rendering AlignmentSection with alignment: ${alignment}`, {
      title,
      contentLength: content?.length || 0,
      hasImage: !!imageUrl
    });
  }, [title, content, imageUrl, alignment]);

  // Normalize alignment value
  const normalizedAlignment = alignment?.toLowerCase() === 'right' ? 'right' : 'left';
  
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${normalizedAlignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
          <div className="w-full md:w-1/2">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title || 'Section image'} 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">No image provided</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>}
            {content ? (
              <div className="prose max-w-none">
                {content.split('\n').map((paragraph, i) => (
                  paragraph ? <p key={i} className="text-gray-700">{paragraph}</p> : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No content provided</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlignmentSection;
