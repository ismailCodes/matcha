import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RoundIconButton({ icon }) {
  return (
    <button className='rounded-full bg-gradient-to-bl from-red-500 to-pink-600 absolute top-0 left-4 transform -translate-y-1/2 h-16 w-16 shadow-lg border-2'>
      <FontAwesomeIcon
        className='mx-3 text-gray-50 hover:text-white'
        size='2x'
        icon={icon}
      />
    </button>
  );
}

export default RoundIconButton;
