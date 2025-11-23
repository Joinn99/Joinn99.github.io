
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Section from './Section';
import LocationIcon from './icons/LocationIcon';
import EyeIcon from './icons/EyeIcon';
import { useAppContext } from '../contexts/AppContext';
import type { Photo } from '../types';

interface GallerySectionProps {
  title: string;
  data: Photo[];
  id?: string;
}

// Hook to detect desktop view for responsive column count
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const listener = () => setIsDesktop(media.matches);
    setIsDesktop(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return isDesktop;
};

const GallerySection: React.FC<GallerySectionProps> = ({ title, data, id }) => {
  const { language } = useAppContext();
  const [shuffledData, setShuffledData] = useState<Photo[]>([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<string[]>([]); // Store URLs to persist order across re-renders
  
  const isDesktop = useIsDesktop();

  // Shuffle data on mount, persist order on updates (e.g. language switch)
  useEffect(() => {
    if (!data || data.length === 0) return;

    const currentUrls = data.map(p => p.url);
    const prevUrls = orderRef.current;

    // Check if we already have an order for this set of photos
    const isSameSet = prevUrls.length > 0 && 
                      prevUrls.length === currentUrls.length && 
                      prevUrls.every(u => currentUrls.includes(u));

    if (isSameSet) {
      // Preserve existing order, but update object references (to get new language text)
      const dataMap = new Map(data.map(p => [p.url, p]));
      const reordered = prevUrls.map(url => dataMap.get(url)).filter(Boolean) as Photo[];
      setShuffledData(reordered);
    } else {
      // New initialization: Shuffle
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Save order
      orderRef.current = shuffled.map(p => p.url);
      setShuffledData(shuffled);
    }
  }, [data]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < shuffledData.length) {
            setVisibleItems(prev => Math.min(prev + 6, shuffledData.length));
        }
      },
      { rootMargin: '200px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [shuffledData, visibleItems]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxPhoto]);

  const visibleData = shuffledData.slice(0, visibleItems);
  const numColumns = isDesktop ? 2 : 1;

  // Memoize column distribution to prevent recalculation on every render
  const columns = useMemo(() => {
    const cols: Photo[][] = Array.from({ length: numColumns }, () => []);
    visibleData.forEach((photo, index) => {
      cols[index % numColumns].push(photo);
    });
    return cols;
  }, [visibleData, numColumns]);

  const ButtonStyle = "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-medium transition-all duration-200 border border-white/20 hover:border-white/40";

  return (
    <Section title={title} id={id}>
      
      {/* JS-based Masonry Layout */}
      <div className="flex gap-4 items-start">
        {columns.map((colPhotos, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {colPhotos.map((photo) => (
              <div 
                key={photo.url} 
                className="relative group overflow-hidden rounded-xl shadow-md bg-gray-200 dark:bg-gray-700 w-full"
              >
                <img 
                  src={photo.url} 
                  alt={photo.location} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out will-change-transform block"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold flex items-center text-sm drop-shadow-md">
                      <LocationIcon className="w-4 h-4 mr-1 text-primary-400 flex-shrink-0" />
                      {photo.location}
                    </p>
                    {photo.time && (
                        <p className="text-xs text-gray-200 ml-5 mb-3 font-medium drop-shadow-sm">{photo.time}</p>
                    )}
                    
                    <div className="flex items-center gap-2 ml-5">
                        <button
                            onClick={() => setLightboxPhoto(photo)}
                            className={ButtonStyle}
                        >
                            <EyeIcon className="w-3.5 h-3.5" />
                            {language === 'zh' ? '查看' : 'View'}
                        </button>
                        
                        {photo.coordinates && (
                            <a 
                                href={`https://www.google.com/maps/place/${photo.coordinates}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={ButtonStyle}
                            >
                                <LocationIcon className="w-3.5 h-3.5" />
                                {language === 'zh' ? '地图' : 'Map'}
                            </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader/Sensor */}
      <div ref={loaderRef} className="h-10 w-full flex justify-center items-center mt-4">
         {visibleItems < shuffledData.length && (
             <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
         )}
      </div>

      {/* Lightbox Portal */}
      {lightboxPhoto && createPortal(
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setLightboxPhoto(null)}
        >
            <button 
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-[10000] bg-white/10 rounded-full hover:bg-white/20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div 
                className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center" 
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={lightboxPhoto.url} 
                    alt={lightboxPhoto.location}
                    className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                />
                <div className="mt-6 text-center">
                    <h3 className="text-white text-xl font-semibold tracking-wide">{lightboxPhoto.location}</h3>
                    <p className="text-gray-400 text-sm mt-1 font-medium">{lightboxPhoto.time}</p>
                </div>
            </div>
        </div>,
        document.body
      )}
    </Section>
  );
};

export default GallerySection;
