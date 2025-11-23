
import React from 'react';

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.889-.496 1.976-1.229 2.948-2.21c.973-.98 1.803-2.118 2.37-3.413C17.165 11.479 17.5 9.818 17.5 8a7.5 7.5 0 00-15 0c0 1.818.335 3.479.992 4.795a12.998 12.998 0 002.37 3.413c.972.98 2.059 1.714 2.948 2.21.254.146.468.269.654.369a5.741 5.741 0 00.281.14l.018.008.006.003zM10 8a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export default LocationIcon;
