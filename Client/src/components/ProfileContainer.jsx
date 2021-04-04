import { useColor } from 'color-thief-react';
import FameRateButton from './FameRateButton.jsx';
import { motion } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

function rgbToRgba(rgbArray, alpha, loading) {
  let [r, g, b] = loading ? [0, 0, 0] : rgbArray;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ProfileContainer({ profile }) {
  const { cover, fameRate, status } = profile;
  const { data, loading } = useColor(cover, 'rgbArray');
  const [hidden, setHidden] = useState(false);

  return (
    <motion.div
      animate={{ y: 0 }}
      transition={{
        ease: 'easeOut',
        duration: 1.5,
        delay: 0.1,
      }}
      initial={{ y: -50 }}
    >
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
        <div
          className={`absolute h-screen w-2/3 bg-red-400 top-0 z-50 ${
            hidden ? 'hidden' : ''
          }`}
        >
          <div className='flex flex-col w-full h-16'>
            <div className='h-16 w-16 flex' onClick={() => setHidden(!hidden)}>
              <AiOutlineClose className='w-full h-full p-4 text-gray-50' />
            </div>
          </div>
        </div>
        <FameRateButton fameRate={fameRate} status={status} />
      </div>
    </motion.div>
  );
}

export default ProfileContainer;
