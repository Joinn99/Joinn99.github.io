
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SystemIcon from './icons/SystemIcon';
import type { Theme } from '../types';

interface HeaderProps {
    name: string;
}

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const themes: { name: Theme; icon: React.ReactElement }[] = [
    { name: 'light', icon: <SunIcon className="w-5 h-5" /> },
    { name: 'dark', icon: <MoonIcon className="w-5 h-5" /> },
    { name: 'system', icon: <SystemIcon className="w-5 h-5" /> },
  ];

  const currentTheme = themes.find(t => t.name === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {currentTheme?.icon}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          {themes.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => {
                setTheme(name);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm capitalize ${
                theme === name
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {icon}
              <span className="ml-2">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useAppContext();

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'zh' : 'en');
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold text-sm transition-colors"
            aria-label="Toggle language"
        >
            {language === 'en' ? '中文' : 'EN'}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header className="sticky top-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            {name}
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
