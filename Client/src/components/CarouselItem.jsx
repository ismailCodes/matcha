import React from 'react';

function CarouselItem({ image }) {
  return (
    <div
      className='rounded-xl mx-1 shadow-lg'
      style={{
        backgroundImage: `url(${image})`,
        width: '160px',
        height: '160px',
        backgroundSize: 'cover',
      }}
    />
  );
}

export default CarouselItem;
