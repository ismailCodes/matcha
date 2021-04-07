import Logo from '../components/Logo';
import LgMenu from '../components/LgMenu';
import SmMenu from '../components/SmMenu';
import { BiMenu } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SideBarContent from './SideBarContent';

const variants = {
  open: { x: 0 },
  closed: { x: '-100vw' },
};

function Navbar({ type }) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`w-full flex justify-between bg-${type} h-16 items-center px-3 z-50`}
    >
      <div className='flex justify-start text-gray-50 w-1/3 relative'>
        <BiMenu
          className={`h-10 w-10 ${open ? 'hidden' : ''}`}
          onClick={() => setOpen(true)}
        />
        <motion.div
          initial='closed'
          animate={open ? 'open' : 'closed'}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          variants={variants}
          className={`absolute h-screen w-72 bg-gray-50 bg-opacity-60 z-40`}
          style={{
            backdropFilter: 'blur(20px)',
            borderRadius: '10px',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          }}
        >
          <SideBarContent open={open} setOpen={setOpen} />
        </motion.div>
      </div>
      <Logo />
      {/* <LgMenu /> */}
      <SmMenu />
    </nav>
  );
}

export default Navbar;
