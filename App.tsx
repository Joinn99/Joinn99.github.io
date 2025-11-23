import React, { useState, useEffect } from 'react';
import jsyaml from 'js-yaml';
import { useAppContext } from './contexts/AppContext';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import GallerySection from './components/GallerySection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AwardsSection from './components/AwardsSection';
import PublicationsSection from './components/PublicationsSection';
import ServiceSection from './components/ServiceSection';
import NewsSection from './components/NewsSection';
import CursorSpotlight from './components/CursorSpotlight';
import type { AppData, Language } from './types';

const AuroraBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
    <div 
      className="absolute top-[5vh] left-[10vw] w-[50vw] h-[50vw] bg-primary-300/30 dark:bg-primary-800/20 rounded-full filter blur-[100px] opacity-50 animate-[move-blob-1_20s_infinite_ease-in-out] will-change-[transform]"
    />
    <div 
      className="absolute bottom-[5vh] right-[10vw] w-[40vw] h-[40vw] bg-google-red/20 dark:bg-google-red/10 rounded-full filter blur-[80px] opacity-50 animate-[move-blob-2_25s_infinite_ease-in-out_5s] will-change-[transform]"
    />
    <div 
      className="absolute top-[30vh] right-[20vw] w-[45vw] h-[45vw] bg-google-yellow/20 dark:bg-google-yellow/10 rounded-full filter blur-[90px] opacity-40 animate-[move-blob-3_30s_infinite_ease-in-out_10s] will-change-[transform]"
    />
  </div>
);


const App: React.FC = () => {
  const { language } = useAppContext();
  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataFiles = [
      'sectionTitles', 'intro', 'photos', 'education', 
      'experience', 'projects', 'awards', 'publications', 'service', 'news'
    ];

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          dataFiles.map(file => fetch(`./data/${file}.yaml`))
        );
        
        for (const response of responses) {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }

        const yamlTexts = await Promise.all(responses.map(res => res.text()));
        const parsedData = yamlTexts.map(text => jsyaml.load(text));

        const rawData: { [key: string]: any } = dataFiles.reduce((acc, file, index) => {
          acc[file] = parsedData[index];
          return acc;
        }, {});
        
        setData(processData(rawData, language));

      } catch (err: any) {
        console.error("Could not load app data:", err);
        setError("Failed to load content. Please try refreshing the page.");
      }
    };

    fetchData();
  }, [language]);

  const processData = (rawData: { [key: string]: any }, lang: Language): AppData => {
    const pickLanguage = (item: any) => {
      if (!item) return {};
      const bilingual = item[lang];
      const common = { ...item };
      delete common.en;
      delete common.zh;
      return { ...common, ...bilingual };
    };

    const ensureArray = (item: any) => Array.isArray(item) ? item : [];

    return {
      sectionTitles: pickLanguage(rawData.sectionTitles),
      intro: pickLanguage(rawData.intro),
      photos: ensureArray(rawData.photos).map(pickLanguage),
      education: ensureArray(rawData.education).map(pickLanguage),
      experience: ensureArray(rawData.experience).map(pickLanguage),
      projects: ensureArray(rawData.projects).map(pickLanguage),
      awards: ensureArray(rawData.awards).map(pickLanguage),
      publications: ensureArray(rawData.publications).map(pickLanguage),
      service: ensureArray(rawData.service).map(pickLanguage),
      news: ensureArray(rawData.news).map(pickLanguage),
    };
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-800 dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <AuroraBackground />
      <CursorSpotlight />
      <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Header name={data.intro.name} />
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Sticky Intro & Nav */}
            <div className="w-full lg:w-[360px] flex-shrink-0 relative">
                <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
                    <IntroSection 
                        data={data.intro} 
                        photos={data.photos} 
                        sectionIds={data.sectionTitles}
                    />
                </div>
            </div>

            {/* Right Column: Main Content */}
            <div className="w-full lg:flex-grow space-y-16 pb-24">
              <NewsSection title={data.sectionTitles.news} data={data.news} id="news" />
              <EducationSection title={data.sectionTitles.education} data={data.education} id="education" />
              <ExperienceSection title={data.sectionTitles.experience} data={data.experience} id="experience" />
              <ProjectsSection title={data.sectionTitles.projects} data={data.projects} id="projects" />
              <PublicationsSection title={data.sectionTitles.publications} data={data.publications} id="publications" />
              <AwardsSection title={data.sectionTitles.awards} data={data.awards} id="awards" />
              <ServiceSection title={data.sectionTitles.service} data={data.service} id="service" />
              <GallerySection title={data.sectionTitles.photos} data={data.photos} id="photos" />
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default App;