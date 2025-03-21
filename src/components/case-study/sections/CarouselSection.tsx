
import React from 'react';

interface CarouselItemProps {
  title: string;
  content: string;
  image: string;
}

interface CarouselSectionProps {
  title: string;
  items: CarouselItemProps[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  items
}) => {
  // Filter out items with no content
  const validItems = items.filter(item => item.title || item.content || item.image);

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {validItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {item.image && (
                <div className="mb-4 aspect-video overflow-hidden rounded-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {item.title && (
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              )}
              {item.content && (
                <p className="text-gray-700">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
