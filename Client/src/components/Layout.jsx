import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUserLock,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

function Layout(/*Component, props*/) {
  return (
    <header className='text-gray-200 body-font bg-indigo-700 w-full'>
      <div className='flex p-2 md:p-4 flex-row items-center w-full justify-between'>
        <div className='flex title-font order-3 sm:order-none font-medium items-center text-gray-200 mr-8'>
          <FontAwesomeIcon size='2x' icon={faUserLock} />
          <span className='ml-3 text-xl hidden sm:block'>MATCHA</span>
        </div>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center px-3'>
          <a className='mr-5 hover:text-gray-300 hidden sm:block'>Browse</a>
          {/* <a className='mr-5 hover:text-gray-300'>Messages</a> */}
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
        </nav>
        {/*profile*/}
        <div className='flex order-4 flex-row items-center'>
          <div className='group inline-block '>
            <div className='w-12 h-12'>
              <img
                className='rounded-full border hover:border-red-500 border-gray-100 shadow-sm'
                src='https://randomuser.me/api/portraits/women/81.jpg'
                alt='user image'
              />
            </div>
            <ul className='absolute hidden text-gray-700 pt-2 group-hover:block -ml-12'>
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
