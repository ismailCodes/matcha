import Logo from '../components/Logo';
import LgMenu from '../components/LgMenu';
import SmMenu from '../components/SmMenu';
import { BiMenu } from 'react-icons/bi';
import { motion } from 'framer-motion';

function Navbar({ type }) {
  return (
    <nav
      className={`w-full flex justify-between bg-${type} h-16 items-center px-3 z-30`}
    >
      <div className='flex justify-start text-red-50 w-1/3'>
        <BiMenu className='h-10 w-10' />
      </div>
      <Logo />
      {/* <LgMenu /> */}
      <SmMenu />
    </nav>
  );
}

export default Navbar;
