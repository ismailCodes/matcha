import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import NotificationItem from './NotificationItem';

function NotificationModal({
  notificationModalOpen,
  notificationModalVariants,
  setNotificationModalOpen,
}) {
  return (
    <motion.div
      className={`w-screen z-50 fixed top-12 right-0 flex flex-col justify-center py-4 px-2 overflow-scroll ${
        notificationModalOpen ? '' : 'hidden'
      }`}
      variants={notificationModalVariants}
      animate={notificationModalOpen ? 'open' : 'closed'}
    >
      {/* <div
        className='h-10 w-10 flex ml-auto'
        onClick={() => setNotificationModalOpen(false)}
      >
        <AiOutlineClose className='w-full h-full p-1 text-white cursor-pointer' />
      </div> */}
      <div className=' w-full bg-gray-50 rounded-xl py-3 px-2 flex flex-col'>
        <div className='text-xl px-3 pb-4'>Notifications</div>
        <ul className='px-3'>
          <NotificationItem type='view' object='Simo life' time='2' />
          <NotificationItem type='like' object='Simo life' time='3' />
          <NotificationItem type='view' object='Simo life' time='9' />
          <NotificationItem type='view' object='Simo life' time='14' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
          <NotificationItem type='like' object='Simo life' time='22' />
        </ul>
      </div>
    </motion.div>
  );
}

export default NotificationModal;
