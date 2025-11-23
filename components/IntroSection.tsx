

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GithubIcon from './icons/GithubIcon';
import ScholarIcon from './icons/ScholarIcon';
import OpenReviewIcon from './icons/OpenReviewIcon';
import EmailIcon from './icons/EmailIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import OrcidIcon from './icons/OrcidIcon';
import type { Intro, Photo } from '../types';

interface IntroSectionProps {
  data: Intro;
  photos: Photo[];
  sectionIds: { [key: string]: string };
}

// Define the specific order to match App.tsx structure
const ORDERED_SECTIONS = [
    'news', 
    'education', 
    'experience', 
    'projects', 
    'publications', 
    'awards', 
    'service', 
    'photos'
];

const SocialLink: React.FC<{ href?: string; children: React.ReactNode, label: string }> = ({ href, children, label }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-full"
    >
      {children}
    </a>
  );
};

const IntroSection: React.FC<IntroSectionProps> = ({ data, photos, sectionIds }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  // Background slideshow logic with Just-In-Time preloading
  useEffect(() => {
    if (!photos || photos.length === 0) return;

    // Preload only the first image initially to ensure quick start
    const firstImg = new Image();
    firstImg.src = photos[0].url;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => {
        const nextIndex = (prev + 1) % photos.length;
        
        // Just-In-Time Preload: Load the image for the *next* cycle
        const nextNextIndex = (nextIndex + 1) % photos.length;
        const img = new Image();
        img.src = photos[nextNextIndex].url;
        
        return nextIndex;
      });
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [photos]);

  // Optimized Scroll Spy Logic using requestAnimationFrame for throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
            const readingLine = 150; // Pixel distance from top to check for active section
            let currentActive = '';
            
            for (const sectionId of ORDERED_SECTIONS) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section contains the reading line
                    if (rect.top <= readingLine && rect.bottom > readingLine) {
                        currentActive = sectionId;
                        break; // Found the topmost visible section
                    }
                }
            }
            
            if (currentActive) {
                setActiveSection(currentActive);
            }
            
            ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPhotoUrl = photos && photos.length > 0 ? photos[currentPhotoIndex].url : null;

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group flex flex-col">
        
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 z-0">
         {currentPhotoUrl && (
             <>
                {photos.map((photo, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${photo.url})` }}
                    />
                ))}
             </>
         )}
         {/* Glassmorphism Blur Overlay */}
         <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md md:backdrop-blur-lg z-10 transition-all duration-500 group-hover:backdrop-blur-xl group-hover:bg-white/90 dark:group-hover:bg-gray-900/90"></div>
         
         {/* Gradient overlay for text readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-gray-900/20 dark:to-gray-900 z-10"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col p-6">
        
        {/* Profile Header - Fixed at top */}
        <div className="flex-none text-center md:text-left mb-6">
          <div className="relative inline-block group/avatar">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-google-red rounded-full blur opacity-25 group-hover/avatar:opacity-75 transition duration-1000 group-hover/avatar:duration-200"></div>
            <img
              src={data.avatar || "https://huggingface.co/datasets/Joinn/Page/resolve/main/Avatar/Venice.jpeg"}
              alt={data.name}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-4 tracking-tight">{data.name}</h1>
          <p className="text-base text-primary-600 dark:text-primary-400 mt-1 font-medium">{data.position}</p>
        </div>

        {/* Bio & Navigation - Scrollable Middle Area */}
        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                a: ({node, ...props}) => <a {...props} className="text-primary-600 dark:text-primary-400 font-medium hover:underline decoration-2 underline-offset-2"/>,
                }}
            >
                {data.description}
            </ReactMarkdown>
            </div>

            {/* Navigation (Desktop Only) */}
            <nav className="hidden md:block mt-6 mb-4 space-y-1">
                <p className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-2">Contents</p>
                {ORDERED_SECTIONS.map((key) => {
                    // Only render if we have a title for this section
                    const label = sectionIds[key];
                    if (!label) return null;

                    const isActive = activeSection === key;

                    return (
                        <a 
                            key={key}
                            href={`#${key}`}
                            className={`block py-1 px-3 text-sm border-l-2 transition-all duration-300 ${
                                isActive 
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400 pl-4 font-medium' 
                                : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:border-gray-300'
                            }`}
                        >
                            {label}
                        </a>
                    );
                })}
            </nav>
        </div>

        {/* Footer Socials - Fixed at bottom */}
        <div className="flex-none pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-center md:justify-start space-x-1 flex-wrap gap-y-2">
            <SocialLink href={data.links.github} label="GitHub"><GithubIcon className="w-5 h-5" /></SocialLink>
            <SocialLink href={data.links.googleScholar} label="Scholar"><ScholarIcon className="w-5 h-5" /></SocialLink>
            <SocialLink href={data.links.openReview} label="OpenReview"><OpenReviewIcon className="w-5 h-5" /></SocialLink>
            <SocialLink href={data.links.email ? `mailto:${data.links.email}`: undefined} label="Email"><EmailIcon className="w-5 h-5" /></SocialLink>
            <SocialLink href={data.links.linkedin} label="LinkedIn"><LinkedinIcon className="w-5 h-5" /></SocialLink>
            <SocialLink href={data.links.orcid} label="ORCID"><OrcidIcon className="w-5 h-5" /></SocialLink>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;