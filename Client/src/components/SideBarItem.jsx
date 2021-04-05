import React from 'react';

function SideBarItem({ text }) {
  return (
    <li className='py-2 text-roseMatcha text-md text-center transition duration-500 transform hover:scale-110 hover:bg-gray-50 hover:bg-opacity-30 cursor-pointer'>
      {text}
    </li>
  );
}

export default SideBarItem;
