import React from 'react';

function Tag({ color, text }) {
  return (
    <button className={`${color} text-white p-1 rounded-md px-2 m-1 text-sm`}>
      {text}
    </button>
  );
}

export default Tag;
