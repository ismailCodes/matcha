import React from 'react';

function StatusButton({ status }) {
  return (
    <div className='relative'>
      <div
        className={`w-3 h-3 rounded-full bg-${
          status === 'online' ? 'green' : 'red'
        }-700 absolute -left-2 -top-1`}
      />
    </div>
  );
}

export default StatusButton;
