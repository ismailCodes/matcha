import React from 'react';

function RoundedIcon({ Icon, iconClass }) {
  return (
    <div className='rounded-full mx-1'>
      <Icon className={iconClass} />
    </div>
  );
}

export default RoundedIcon;
