import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import defaultImage from '../images/defaultImage.png';

function ImagesCarousel({ images }) {
  return (
    <Carousel
      className='h-full'
      showThumbs={false}
      showArrows
      showStatus={false}
      stopOnHover={true}
      autoPlay={false}
    >
      {images.map((image, index, originalArray) => {
        return originalArray.length == 0 ? (
          <img
            src={defaultImage}
            alt='larbi'
            className='object-cover w-full h-full'
          />
        ) : (
          <img src={image} alt='larbi' className='object-cover w-full h-full' />
        );
      })}
    </Carousel>
  );
}

export default ImagesCarousel;
