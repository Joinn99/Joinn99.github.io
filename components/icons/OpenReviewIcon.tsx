import React from 'react';

const OpenReviewIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="12" />
    <text
      x="12"
      y="12"
      fill="white"
      fontSize="10"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="sans-serif"
    >
      OR
    </text>
  </svg>
);

export default OpenReviewIcon;