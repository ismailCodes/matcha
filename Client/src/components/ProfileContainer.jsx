import { useColor } from 'color-thief-react';
import FameRateButton from './FameRateButton.jsx';
import EditButton from './EditButton';
import { ImLocation } from 'react-icons/im';
import { motion } from 'framer-motion';
import CarouselItem from 'src/components/CarouselItem';
import Tag from 'src/library/Tag';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

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

function rgbToRgba(rgbArray, alpha, loading) {
  let [r, g, b] = loading ? [0, 0, 0] : rgbArray;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ProfileContainer({ profile }) {
  const { cover, fameRate, status, pictures, tags } = profile;
  const { data, loading } = useColor(cover, 'rgbArray');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pictureModalOpen, setPictureModalOpen] = useState(true);
  const [currentPicure, setCurrentPicture] = useState(0);

  const getDragRate = () => {
    if (pictures.length <= 2) return 0;
    return pictures.length * (pictures.length * 10);
  };

  const negate = (number) => (number > 0 ? -number : number);

  return (
    <>
      <div className='relative'>
        <div
          className='bg-fixed bg-cover user-cover'
          style={{
            backgroundImage: `linear-gradient(${rgbToRgba(
              data,
              0.3,
              loading
            )}, ${rgbToRgba(data, 0.3, loading)}), url(${cover})`,
            height: '35vh',
            backgroundRepeat: 'no-repeat',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)',
            zIndex: -100,
            boxShadow: 'inset 0px 30px 40px -10px #000',
          }}
        />
        <FameRateButton fameRate={fameRate} status={status} />
        <EditButton setEditModalOpen={setEditModalOpen} />

        {/* edit modal */}
        <motion.div
          className={`h-screen w-screen z-50 bg-gray-900 bg-opacity-40 absolute top-0 flex justify-center py-4 px-2 ${
            editModalOpen ? '' : 'hidden'
          }`}
          variants={editModalVariants}
          animate={editModalOpen ? 'open' : 'closed'}
        >
          <div className='h-full w-full bg-gray-50 rounded-xl py-3 px-2 flex flex-col'>
            <div className='text-xl px-3'>Edit profile</div>
            <div className='flex flex-grow items-end justify-end'>
              <div
                className='text-roseMatcha border border-roseMatcha px-3 py-1 rounded-lg mx-2 w-20 text-center '
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </div>
              <div className='bg-roseMatcha border border-roseMatcha px-3 py-1 rounded-lg mx-2 text-gray-50 w-20 text-center'>
                Save
              </div>
            </div>
          </div>
        </motion.div>

        {/* picture modal */}
        <motion.div
          className={`h-screen w-screen z-50 bg-gray-900 bg-opacity-70 absolute top-0 flex flex-col justify-center py-4 px-2 ${
            pictureModalOpen ? '' : 'hidden'
          }`}
          variants={editModalVariants}
          animate={pictureModalOpen ? 'open' : 'closed'}
        >
          <div className='h-10 w-10 flex' onClick={() => setPictureModalOpen(false)}>
            <AiOutlineClose className='w-full h-full p-1 text-white cursor-pointer' />
          </div>
          <div
            className='h-full w-full bg-transparent rounded-xl py-3 px-2 flex flex-grow'
            style={{
              backgroundImage: `url(${pictures[currentPicure]})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
      </div>

      {/* Personal Infos */}
      <div className='flex flex-col justify-center items-center py-2 overflow-hidden'>
        <div className='text-xl font-bold'>BullShit Champion</div>
        <div className='flex py-1'>
          <ImLocation className='inline mx-1' />
          <div className='text-sm'>4km Away</div>
        </div>
        {/* Gender Age Likes */}
        <div className='flex justify-between w-10/12 py-3'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='font-bold text-md'>Gender</div>
            <div className='text-sm'>Shemale</div>
          </div>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='font-bold text-md'>Age</div>
            <div className='text-sm'>69</div>
          </div>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='font-bold text-md'>Likes</div>
            <div className='text-sm'>All</div>
          </div>
        </div>
        <div className='w-11/12'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis
          condimentum orci, et rutrum libero ultricies ultrices.
        </div>
        <motion.div
          className='flex mt-4 overflow-hidden'
          drag='x'
          dragConstraints={{ left: negate(getDragRate()), right: getDragRate() }}
        >
          {pictures.map((img) => (
            <CarouselItem
              key={pictures.indexOf(img)}
              image={img}
              setCurrentPicture={setCurrentPicture}
              setPictureModalOpen={setPictureModalOpen}
              index={pictures.indexOf(img)}
            />
          ))}
        </motion.div>
        <div className='w-11/12 my-3 flex flex-wrap justify-center'>
          {tags.map((tag) => {
            return <Tag key={tag} text={tag} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProfileContainer;
