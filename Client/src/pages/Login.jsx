/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import login from '../images/login.jpeg';

function Login() {
  const [hidden, setHidden] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const email_errors = {
    required: {
      value: true,
      message: 'email is required',
    },
    maxLength: {
      value: 255,
      message: 'email should be less than 255 characters',
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'please insert a valid email',
    },
  };

  const password_errors = {
    required: 'password is required',
    maxLength: {
      value: 255,
      message: 'password should be less than 255 characters',
    },
    minLength: {
      value: 8,
      message: 'password should be at least 6 characters',
    },
  };

  return (
    <div className='lg:flex'>
      <div className='lg:w-1/2 xl:max-w-screen-md'>
        <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
          <h2
            className='text-center text-4xl text-red-500 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold'
          >
            Log in
          </h2>
          <div className='mt-12'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className='text-sm font-bold text-gray-700 tracking-wide mt-4'>
                  Email Address
                </div>
                <input
                  name='email'
                  className='my-2 px-4 w-full text-base py-2  border-b border-gray-300 focus:outline-none focus:border-red-500'
                  type=''
                  placeholder='mike@gmail.com'
                  ref={register(email_errors)}
                />
                {errors.email && (
                  <p className='text-red-400 pt-1 text-sm'>{errors.email.message}</p>
                )}
              </div>
              <div className='mt-8 relative'>
                <div className='flex justify-between items-center'>
                  <div className='text-sm font-bold text-gray-700 tracking-wide'>
                    Password
                  </div>
                </div>
                <div className='flex items-center relative'>
                  <input
                    name='password'
                    className='my-2 px-4 w-full flex-grow flex-shrink text-base py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
                    type={hidden ? 'password' : 'text'}
                    placeholder='Enter your password'
                    ref={register(password_errors)}
                  />
                  <span
                    className='absolute right-2'
                    onClick={() => setHidden(!hidden)}
                  >
                    <label className='bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label select-none'>
                      {hidden ? 'show' : 'hide'}
                    </label>
                  </span>
                </div>
                {errors.password && (
                  <p className='text-red-400 pt-1 text-sm'>
                    {errors.password.message}
                  </p>
                )}
                <div className='right-0 absolute'>
                  <a
                    className='text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer'
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className='mt-10'>
                <button
                  className='bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg'
                  type='submit'
                >
                  Log In
                </button>
              </div>
            </form>
            <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
              Don&apos;t have an account ?
              <a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
                <Link to='/register'>Register</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen'>
        <img src={login} className='object-cover w-full h-full' />
      </div>
    </div>
  );
}

export default Login;
