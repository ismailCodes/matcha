import React from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';

function NotificationItem({ type, object, time }) {
  return (
    <li
      className={`bg-gray-50 shadow-lg h-16 flex items-center rounded-md border-l-2 border-${
        type === 'view' ? 'blue-600' : 'roseMatcha'
      } my-2 transform hover:translate-x-2`}
    >
      <div className='h-16 w-16 flex justify-center items-center'>
        {type === 'view' ? (
          <FaRegEye className='w-full h-full p-4' />
        ) : (
          <AiTwotoneHeart className='w-full h-full p-4' />
        )}
      </div>
      <div
        className={`h-full w-full px-3 flex flex-col justify-between rounded-md py-2`}
      >
        <div className='font- text-gray-900'>
          {object} {type === 'view' ? 'viewed' : 'liked'} your profile
        </div>
        <div className='ml-auto text-gray-900 text-xs'>{time} minutes ago</div>
      </div>
    </li>
  );
}

export default NotificationItem;
