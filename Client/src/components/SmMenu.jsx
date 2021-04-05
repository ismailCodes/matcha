import React from 'react';
import { BiBell } from 'react-icons/bi';
import RoundedIcon from '../library/RoundedIcon';

function SmMenu() {
  const iconsClass = 'h-10 w-10 px-1';
  return (
    <ul className='flex justify-end text-gray-50 font-thin w-1/3'>
      <RoundedIcon Icon={BiBell} iconClass={iconsClass} />
    </ul>
  );
}

export default SmMenu;
