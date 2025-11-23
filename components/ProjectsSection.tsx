
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Section from './Section';
import LinkIcon from './icons/LinkIcon';
import type { Project } from '../types';

interface ProjectsSectionProps {
  title: string;
  data: Project[];
  id?: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = (y / height - 0.5) * -10;
    const rotateY = (x / width - 0.5) * 10;

    cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
    cardRef.current.style.setProperty('--glare-x', `${x}px`);
    cardRef.current.style.setProperty('--glare-y', `${y}px`);
    cardRef.current.querySelector<HTMLElement>('.project-card-glare')?.style.setProperty('opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
    cardRef.current.querySelector<HTMLElement>('.project-card-glare')?.style.setProperty('opacity', '0');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--stagger-index': index,
        transitionDelay: `calc(var(--stagger-index) * 100ms)`,
        transformStyle: 'preserve-3d',
      } as React.CSSProperties}
      className="p-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 relative overflow-hidden group"
    >
      <div 
        style={{ transform: 'perspective(1000px) rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0)) scale(1.02)'}}
        className="transition-transform duration-100 ease-out"
      >
        <div className="project-card-glare"></div>
        <div className="flex flex-col md:flex-row md:space-x-6 items-start">
            
            {/* Image Container with Overlay */}
            <div 
                className="relative w-full md:w-1/3 h-48 md:h-40 mb-4 md:mb-0 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm group/image"
                style={{transform: 'translateZ(20px)'}}
            >
                 {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <p className="text-white text-sm font-semibold text-center">
                                {project.title}{project.subtitle ? `: ${project.subtitle}` : ''}
                            </p>
                        </div>
                    </a>
                 ) : (
                    <>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <p className="text-white text-sm font-semibold text-center">
                                {project.title}{project.subtitle ? `: ${project.subtitle}` : ''}
                            </p>
                        </div>
                    </>
                 )}
            </div>

            <div className="flex-1 flex flex-col w-full">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white" style={{transform: 'translateZ(40px)'}}>
                    {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {project.title}
                        <LinkIcon className="w-4 h-4 ml-2 opacity-60"/>
                    </a>
                    ) : (
                    project.title
                    )}
                </h3>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded" style={{transform: 'translateZ(30px)'}}>{project.time}</span>
              </div>
              
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3 mt-1" style={{transform: 'translateZ(20px)'}}>{project.collaborators}</p>
              
              <div className="prose prose-sm dark:prose-invert max-w-none flex-grow text-gray-600 dark:text-gray-300" style={{transform: 'translateZ(10px)'}}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({node, ...props}) => <a {...props} className="text-primary-600 dark:text-primary-400 hover:underline"/>,
                    p: ({node, ...props}) => <p {...props} className="my-1"/>
                  }}
                >
                  {project.description}
                </ReactMarkdown>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};


const ProjectsSection: React.FC<ProjectsSectionProps> = ({ title, data, id }) => {
  return (
    <Section title={title} id={id}>
      {data.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </Section>
  );
};

export default ProjectsSection;