import React, { ReactNode } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface SectionProps {
  title: string;
  children: ReactNode;
  wrapperClassName?: string;
  id?: string; // Added ID for navigation
}

const Section: React.FC<SectionProps> = ({ title, children, wrapperClassName, id }) => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

  return (
    <section 
      id={id}
      ref={ref}
      className={`scroll-mt-32 mb-12 transition duration-700 ease-out transform-gpu ${isVisible ? 'opacity-100 translate-y-0 section-visible' : 'opacity-0 translate-y-8'}`}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-5 flex items-center">
        <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          {title}
        </span>
        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 flex-grow ml-4"></div>
      </h2>
      <div className={wrapperClassName || "space-y-4 stagger-children"}>
        {children}
      </div>
    </section>
  );
};

export default Section;