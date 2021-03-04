import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMortarPestle,
  faBell,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

function Layout(/*Component, props*/) {
  return (
    <header className='text-gray-200 body-font bg-indigo-700 w-full'>
      <div className='flex p-2 md:p-4 flex-row items-center w-full justify-between'>
        <div className='flex w-1/3 sm:w-auto justify-center title-font font-medium items-center text-gray-200 sm:mr-8 px-3 order-2 sm:order-1'>
          <FontAwesomeIcon size='2x' icon={faMortarPestle} />
          <span className='ml-3 text-xl hidden sm:block'>MATCHA</span>
        </div>
        <div className='md:ml-auto w-1/3 sm:w-auto flex flex-wrap justify-end items-center text-base sm:justify-center order-3 sm:order-2 sm:mr-3'>
          <FontAwesomeIcon
            className='mx-3 hover:text-gray-300'
            size='2x'
            icon={faEnvelope}
          />
          <FontAwesomeIcon
            className='mx-3 hover:text-gray-300'
            size='2x'
            icon={faBell}
          />
        </div>
        <div className='flex w-1/3 sm:w-auto flex-row items-center order-1 sm:order-3'>
          <div className='group inline-block '>
            <div className='w-12 h-12 flex items-center'>
              <img
                className='rounded-full border hover:border-red-500 border-gray-100 shadow-sm hidden sm:block'
                src='https://randomuser.me/api/portraits/women/81.jpg'
                alt='user image'
              />
              <FontAwesomeIcon
                className='mx-3 hover:text-gray-300 block sm:hidden'
                size='2x'
                icon={faCog}
              />
            </div>
            <ul className='absolute hidden text-gray-700 pt-2 group-hover:block sm:-ml-12'>
              <li className=''>
                <a
                  className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                  href='#'
                >
                  Profile
                </a>
              </li>
              <li className=''>
                <a
                  className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                  href='#'
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Layout;
