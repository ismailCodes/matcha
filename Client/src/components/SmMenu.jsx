import React from 'react';
import { BiBell } from 'react-icons/bi';
import RoundedIcon from '../library/RoundedIcon';

const editModalVariants = {
  closed: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  open: {
    opacity: 1,
    width: '100%',
    height: '100vh',
    transition: {
      stiffness: 100,
    },
  },
};

function SmMenu({ notificationModalOpen, setNotificationModalOpen }) {
  const iconsClass = 'h-10 w-10 px-1';
  return (
    <ul className='flex justify-end text-gray-50 font-thin w-1/3'>
      <RoundedIcon
        Icon={BiBell}
        iconClass={iconsClass}
        notificationModalOpen={notificationModalOpen}
        setNotificationModalOpen={setNotificationModalOpen}
      />
    </ul>
  );
}

export default SmMenu;
