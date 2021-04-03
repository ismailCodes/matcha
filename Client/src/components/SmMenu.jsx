import React from 'react';
import { BiBell, BiMessageRounded, BiSearchAlt2 } from 'react-icons/bi';
import RoundedIcon from '../library/RoundedIcon';

function SmMenu() {
  const iconsClass = 'h-10 w-10 px-1';
  return (
    <ul className='flex text-gray-50 font-thin'>
      <RoundedIcon Icon={BiSearchAlt2} iconClass={iconsClass} />
      <RoundedIcon Icon={BiMessageRounded} iconClass={iconsClass} />
      <RoundedIcon Icon={BiBell} iconClass={iconsClass} />
    </ul>
  );
}

export default SmMenu;
