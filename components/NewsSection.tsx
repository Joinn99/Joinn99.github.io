
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from './Section';
import type { News } from '../types';

interface NewsSectionProps {
  title: string;
  data: News[];
  id?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="relative timeline-item mb-4"
              style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 100ms)`} as React.CSSProperties}
            >
              <span className="inline-block px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                {item.time}
              </span>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-snug">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({node, ...props}) => <a {...props} className="text-primary-600 dark:text-primary-400 hover:underline font-medium"/>,
                    p: ({node, ...props}) => <p {...props} className="my-0"/>
                  }}
                >
                  {item.news}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default NewsSection;