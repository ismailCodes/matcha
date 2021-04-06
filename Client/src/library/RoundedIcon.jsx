import React from 'react';

function RoundedIcon({ Icon, iconClass, setNotificationModalOpen }) {
  return (
    <div
      className='rounded-full mx-1'
      onClick={() => setNotificationModalOpen(true)}
    >
      <Icon className={iconClass} />
    </div>
  );
}

export default RoundedIcon;
