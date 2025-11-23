
import React from 'react';
import Section from './Section';
import LinkIcon from './icons/LinkIcon';
import GithubIcon from './icons/GithubIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import type { Publication } from '../types';

interface PublicationsSectionProps {
  title: string;
  data: Publication[];
  id?: string;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      {data.map((pub, index) => (
        <div 
          key={index} 
          className="group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-500/50 hover:shadow-md hover:-translate-y-0.5"
          style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 50ms)`} as React.CSSProperties}
        >
          <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{pub.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">{pub.authors}</p>
          <div className="flex justify-between items-center mt-3 border-t border-gray-100 dark:border-gray-700 pt-2">
            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{pub.venue}</p>
            <div className="flex items-center space-x-2">
              {pub.link && (
                <a 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Paper link"
                  className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-0.5 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  <LinkIcon className="w-3 h-3 mr-1"/>
                  Paper
                </a>
              )}
              {pub.code && (
                <a 
                  href={pub.code} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-0.5 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  <GithubIcon className="w-3 h-3 mr-1"/>
                  Code
                </a>
              )}
              {pub.data && (
                <a 
                  href={pub.data} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Dataset"
                  className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-0.5 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  <DatabaseIcon className="w-3 h-3 mr-1"/>
                  Data
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
};

export default PublicationsSection;