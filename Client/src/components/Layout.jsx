import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMortarPestle,
  faBell,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import larbi from '../images/larbi.jpg';
import DropDownMenu from '../library/DropDownMenu';

function Layout({ children }) {
  return (
    <div className='w-full h-full flex flex-col flex-grow bg-gray-50'>
      <header className='fixed top-0 z-50 text-gray-200 flex items-center body-font bg-gray-900 w-full h-16'>
        <nav className='flex p-1 md:p-2 flex-row items-center w-full justify-between'>
          <div className='flex w-1/3 sm:w-auto justify-center title-font font-medium items-center text-gray-200 sm:mr-8 px-3 order-2 sm:order-1'>
            <FontAwesomeIcon
              className='h-6 transform -translate-y-0.5'
              size='2x'
              icon={faMortarPestle}
            />
            <span className='ml-3 text-xl hidden sm:block'>MATCHA</span>
          </div>
          <div className='sm:ml-auto w-1/3 sm:w-auto flex flex-wrap justify-end items-center text-base sm:justify-center order-3 sm:order-2 sm:mr-3'>
            <FontAwesomeIcon
              className='mx-1 sm:mx-2 hover:text-gray-300 h-6'
              size='2x'
              icon={faEnvelope}
            />
            <FontAwesomeIcon
              className='mx-1 sm:mx-2 hover:text-gray-300 h-6'
              size='2x'
              icon={faBell}
            />
          </div>
          <div className='flex w-1/3 sm:w-auto flex-row items-center order-1 sm:order-3'>
            <div className='group inline-block '>
              <div className='w-12 h-12 flex items-center'>
                <img
                  className='object-cover border rounded-full border-gray-100 shadow-sm hidden sm:block w-10 h-10'
                  src={larbi}
                  alt='user image'
                />
                <FontAwesomeIcon
                  className='h-6 mx-3 hover:text-gray-300 block sm:hidden'
                  size='2x'
                  icon={faCog}
                />
              </div>
              <DropDownMenu elements={['Profile', 'Sign-Out']} />
            </div>
          </div>
        </nav>
      </header>
      {children}
      <footer className='fixed bottom-0 w-full flex justify-center text-xs text-gray-500 bg-gray-100 shadow-inner'>
        Sma9lo &copy; 2021
      </footer>
    </div>
  );
}

export default Layout;
