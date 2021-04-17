import Logo from '../components/Logo';
import LgMenu from '../components/LgMenu';
import SmMenu from '../components/SmMenu';
import { BiMenu } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SideBarContent from './SideBarContent';

const variants = {
  init: {
    opacity: 0,
    width: '94%',
  },
  closed: {
    opacity: 0,
    height: 0,
    y: '-50vh',
  },
  open: {
    opacity: 1,
    width: '94%',
    y: 55,
    transition: {
      type: 'tween',
      // duration: 0.2,
    },
  },
};

function Navbar({ notificationModalOpen, setNotificationModalOpen }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`w-full flex justify-between bg-transparent absolute top-0 h-16 items-center px-3 z-50`}
    >
      <div className='flex justify-start relative text-gray-50 w-1/3'>
        <BiMenu
          className={`h-10 w-10 p-1 ${
            open ? 'bg-gray-50 rounded-full text-roseMatcha' : ''
          }`}
          onClick={() => setOpen(!open)}
        />
        <motion.div
          initial='init'
          animate={open ? 'open' : 'closed'}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          variants={variants}
          className={`fixed bg-gray-50 bg-opacity-60 top-1 ${open ? '' : 'hidden'}`}
          style={{
            backdropFilter: 'blur(20px)',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          }}
        >
          <SideBarContent />
        </motion.div>
      </div>
      <Logo />
      <SmMenu
        notificationModalOpen={notificationModalOpen}
        setNotificationModalOpen={setNotificationModalOpen}
      />
    </nav>
  );
}

export default Navbar;
