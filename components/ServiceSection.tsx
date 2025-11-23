import React from 'react';
import Section from './Section';
import type { Service } from '../types';

interface ServiceSectionProps {
  title: string;
  data: Service[];
  id?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      <ul className="space-y-1">
        {data.map((service, index) => (
          <li 
            key={index} 
            className="text-gray-700 dark:text-gray-300 transition-all duration-200 py-1.5 px-2 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 text-sm"
            style={{ '--stagger-index': index, transitionDelay: `calc(var(--stagger-index) * 50ms)`} as React.CSSProperties}
          >
             <span className="font-semibold text-gray-900 dark:text-white">{service.occupation}</span>
             <span className="mx-2 text-gray-400">|</span>
             <span className="text-primary-600 dark:text-primary-400 font-medium">{service.venue}</span>
             <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">({service.time})</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ServiceSection;