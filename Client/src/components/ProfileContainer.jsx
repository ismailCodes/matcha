import { useColor } from 'color-thief-react';
import FameRateButton from './FameRateButton.jsx';
import EditButton from './EditButton';
import { ImLocation } from 'react-icons/im';
import { motion } from 'framer-motion';
import CarouselItem from 'src/components/CarouselItem';
import Tag from 'src/library/Tag';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import NotificationModal from './NotificationModal.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { useRef } from 'react';

const modalVariants = {
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

const notificationModalVariants = {
  init: {
    opacity: 0,
  },
  closed: {
    opacity: 0,
    height: 0,
    top: 60,
  },
  open: {
    opacity: 1,
    width: '100%',
    height: '100vh',
  },
};

const reportModalVariants = {
  closed: {
    opacity: 0,
    y: '5vh',
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

function rgbToRgba(rgbArray, alpha, loading) {
  let [r, g, b] = loading ? [0, 0, 0] : rgbArray;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ProfileContainer({
  edit,
  profile,
  notificationModalOpen,
  setNotificationModalOpen,
  editModalOpen,
  setEditModalOpen,
}) {
  const { cover, fameRate, status, pictures, tags } = profile;
  const { data, loading } = useColor(cover, 'rgbArray');
  const [pictureModalOpen, setPictureModalOpen] = useState(false);
  const [currentPicure, setCurrentPicture] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  let isDragging = useRef(false);

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
        <EditProfileModal
          editModalOpen={editModalOpen}
          modalVariant={modalVariants}
          setEditModalOpen={setEditModalOpen}
        />

        {/* picture modal */}
        <motion.div
          className={`h-screen w-screen z-50 bg-gray-900 bg-opacity-70 fixed top-0 flex flex-col justify-center py-4 px-2 ${
            pictureModalOpen ? '' : 'hidden'
          }`}
          variants={modalVariants}
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

      {/* notifications Modal */}
      <NotificationModal
        notificationModalOpen={notificationModalOpen}
        setNotificationModalOpen={setNotificationModalOpen}
        notificationModalVariants={notificationModalVariants}
      />

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

        {/* Carousel */}
        <motion.div
          className='flex py-5 overflow-hidden'
          drag='x'
          dragConstraints={{ left: negate(getDragRate()), right: getDragRate() }}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={() => {
            setTimeout(() => {
              isDragging.current = false;
            }, 150);
            console.log(isDragging.current);
          }}
        >
          {pictures.map((img) => (
            <CarouselItem
              key={pictures.indexOf(img)}
              image={img}
              setCurrentPicture={setCurrentPicture}
              setPictureModalOpen={setPictureModalOpen}
              index={pictures.indexOf(img)}
              isDragging={isDragging}
            />
          ))}
        </motion.div>

        {/* tags */}
        <div className='w-11/12 mb-3 flex flex-wrap justify-center bg-transparent'>
          {tags.map((tag) => {
            return <Tag key={tag} text={tag} />;
          })}
        </div>

        {/* report modal */}
        <div className='w-11/12 flex relative'>
          <motion.div
            className={`bg-gray-50 bg-opacity-60 absolute z-50 bottom-1 w-full h-40 pb-4 ${
              reportOpen ? '' : 'hidden'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              borderRadius: '10px',
              border: '1px solid rgba( 255, 255, 255, 0.18 )',
            }}
            variants={reportModalVariants}
            animate={reportOpen ? 'open' : 'closed'}
          >
            <ul>
              <li>
                <div
                  className='h-8 w-8 flex'
                  onClick={() => setReportOpen(!reportOpen)}
                >
                  <AiOutlineClose
                    className='w-full h-full p-1 text-roseMatcha cursor-pointer'
                    onClick={() => setReportOpen(false)}
                  />
                </div>
              </li>
              <li className='text-center text-roseMatcha text-base py-2'>Report</li>
              <li className='text-center text-roseMatcha text-base py-2'>Block</li>
              <li className='text-center text-roseMatcha text-base py-2'>Dislike</li>
            </ul>
          </motion.div>
          <div
            className='h-10 w-10 bg-gray-500 mx-1 rounded-xl flex items-center justify-center transform rotate-90'
            onClick={() => setReportOpen(true)}
          >
            <div className='transform -translate-y-1 text-gray-50 font-bold text-lg'>
              ...
            </div>
          </div>
          <div className='flex items-center justify-center h-10 bg-roseMatcha flex-grow mx-1 rounded-xl text-gray-50 text-lg font-bold'>
            <div>Like</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileContainer;
