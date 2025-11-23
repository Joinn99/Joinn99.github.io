import React from 'react';
import Section from './Section';
import type { Education } from '../types';

interface EducationSectionProps {
  title: string;
  data: Education[];
  id?: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      {data.map((item, index) => (
        <div 
          key={index} 
          className="flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 50ms)`} as React.CSSProperties}
        >
          <img src={item.image} alt={item.school} className="w-10 h-10 rounded-md object-contain bg-white p-0.5 mt-1 flex-shrink-0 shadow-sm" />
          <div className="flex-grow">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base">{item.school}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{item.time}</p>
            </div>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{item.degree}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>
            {item.advisor && (
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Advisor: {item.advisorUrl ? (
                  <a href={item.advisorUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                    {item.advisor}
                  </a>
                ) : (
                  item.advisor
                )}
              </p>
            )}
            {item.area && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1"><span className="font-medium">Focus:</span> {item.area}</p>}
          </div>
        </div>
      ))}
    </Section>
  );
};

export default EducationSection;