import React from 'react';

function CarouselItem({ index, image, setCurrentPicture, setPictureModalOpen }) {
  return (
    <div
      className='rounded-xl mx-1 shadow-lg'
      style={{
        backgroundImage: `url(${image})`,
        width: '160px',
        height: '160px',
        backgroundSize: 'cover',
      }}
      onClick={() => {
        setCurrentPicture(index);
        setPictureModalOpen(true);
      }}
    />
  );
}

export default CarouselItem;
