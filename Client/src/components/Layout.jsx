import React from 'react';

function Layout(/*Component, props*/) {
  return (
    <header className='text-gray-200 body-font bg-indigo-700'>
      <div className='container mx-auto flex  p-5 flex-row items-center justify-between'>
        <a className='flex title-font font-medium items-center text-gray-200 mr-8'>
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            width='48px'
            height='48px'
            viewBox='0 0 512 512'
            className='text-white'
            xmlSpace='preserve'
            fill='white'
          >
            <path
              id='template'
              d='M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9
	c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8
	c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8
	c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z'
            />
          </svg>
          <span className='ml-3 text-xl'>MATCHA</span>
        </a>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <a className='mr-5 hover:text-gray-300'>Browse</a>
          <a className='mr-5 hover:text-gray-300'>Messages</a>
        </nav>
        <div className='flex flex-row items-center'>
          <div className='group inline-block relative'>
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
