import React from 'react';
import { AiFillFire } from 'react-icons/ai';

function Logo({ type }) {
  return (
    <div className='w-1/3 h-full flex justify-center items-center'>
      <AiFillFire className='text-white h-10 w-10' />
    </div>
  );
}

export default Logo;
