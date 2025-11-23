import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from './Section';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  title: string;
  data: Experience[];
  id?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      {data.map((item, index) => (
        <div 
          key={index} 
          className="group flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 50ms)`} as React.CSSProperties}
        >
          <img src={item.image} alt={item.company} className="w-10 h-10 rounded-md object-contain bg-white p-0.5 mt-1 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <div className="flex-grow">
            <div className="flex justify-between items-baseline flex-wrap">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base">{item.company}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
            </div>
            <div className="flex justify-between items-baseline flex-wrap mb-1">
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{item.position}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{item.location}</p>
            </div>
            
            {item.description && (
              <div className="mt-1 prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-snug">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({node, ...props}) => <a {...props} className="text-primary-600 dark:text-primary-400 hover:underline"/>,
                    p: ({node, ...props}) => <p {...props} className="my-0.5 text-sm"/>,
                    ul: ({node, ...props}) => <ul {...props} className="pl-4 list-disc marker:text-gray-300 dark:marker:text-gray-600 my-0"/>,
                    li: ({node, ...props}) => <li {...props} className="my-0 text-sm"/>
                  }}
                >
                  {item.description}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
    </Section>
  );
};

export default ExperienceSection;