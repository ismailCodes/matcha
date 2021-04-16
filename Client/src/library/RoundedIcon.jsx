import React from 'react';

function RoundedIcon({
  Icon,
  iconClass,
  notificationModalOpen,
  setNotificationModalOpen,
}) {
  return (
    <div
      className='rounded-full mx-1'
      onClick={() => setNotificationModalOpen(!notificationModalOpen)}
    >
      <Icon className={iconClass} />
    </div>
  );
}

export default RoundedIcon;
