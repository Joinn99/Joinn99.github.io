import React from 'react';
import Section from './Section';
import type { Award } from '../types';

interface AwardsSectionProps {
  title: string;
  data: Award[];
  id?: string;
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      <ul className="space-y-1">
        {data.map((award, index) => (
          <li 
            key={index} 
            className="flex items-baseline text-gray-700 dark:text-gray-300 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 50ms)`} as React.CSSProperties}
          >
             <div className="w-1.5 h-1.5 rounded-full bg-google-yellow mr-3 flex-shrink-0 mt-1.5"></div>
            <div className="flex-grow">
                <span className="font-medium text-gray-900 dark:text-white text-sm block sm:inline">{award.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 block sm:inline sm:ml-1"> — {award.time}, {award.location}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default AwardsSection;