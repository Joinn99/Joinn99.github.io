
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const CursorSpotlight: React.FC = () => {
  const { theme } = useAppContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    // Only add event listener if dark mode is active to save resources
    if (!isDark) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  if (!isDark) {
    return null;
  }

  const spotlightStyle: React.CSSProperties = {
    background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(44, 114, 160, 0.15), transparent 80%)`,
  };

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition duration-300" 
      style={spotlightStyle}
    />
  );
};

export default CursorSpotlight;
