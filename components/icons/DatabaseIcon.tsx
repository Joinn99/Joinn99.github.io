
import React from 'react';

const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2c-5.523 0-10 1.79-10 4s4.477 4 10 4 10-1.79 10-4-4.477-4-10-4zm0 10c-5.523 0-10-1.79-10-4v4c0 2.21 4.477 4 10 4s10-1.79 10-4V8c0 2.21-4.477 4-10 4zm0 6c-5.523 0-10-1.79-10-4v4c0 2.21 4.477 4 10 4s10-1.79 10-4v-4c0 2.21-4.477 4-10 4z"/>
  </svg>
);

export default DatabaseIcon;