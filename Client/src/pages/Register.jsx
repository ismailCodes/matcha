/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import register_img from '../images/register.jpeg';

function Register() {
  const [hidden, setHidden] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const firstNameErrors = {
    required: {
      value: true,
      message: 'first name is required',
    },
    maxLength: {
      value: 255,
      message: 'first name should be less than 255 characters',
    },
    minLength: {
      value: 2,
      message: 'first name should be at least 2 characters',
    },
    pattern: {
      value: /[a-z]/gi,
      message: 'first name can have only letters',
    },
  };

  const lastNameErrors = {
    required: {
      value: true,
      message: 'last name is required',
    },
    maxLength: {
      value: 255,
      message: 'last name should be less than 255 characters',
    },
    minLength: {
      value: 2,
      message: 'last name should be at least 2 characters',
    },
    pattern: {
      value: /[a-z]/gi,
      message: 'last name can have only letters',
    },
  };

  const emailErrors = {
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

  const passwordErrors = {
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
            Register
          </h2>
          <div className='mt-12'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex w-full flex-wrap lg:flex-nowrap'>
                <div className='w-full lg:w-6/12 mr-1'>
                  <div className='text-sm font-bold text-gray-700 tracking-wide mt-4'>
                    First name
                  </div>
                  <input
                    name='firstName'
                    className='w-full text-lg py-2  border-b border-gray-300 focus:outline-none focus:border-red-500'
                    type=''
                    placeholder='John'
                    ref={register(firstNameErrors)}
                  />
                  {errors.firstName && (
                    <p className='text-red-400 pt-1 text-sm'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className='w-full lg:w-6/12 ml-1'>
                  <div className='text-sm font-bold text-gray-700 tracking-wide mt-4'>
                    Last name
                  </div>
                  <input
                    name='lastName'
                    className='w-full text-lg py-2  border-b border-gray-300 focus:outline-none focus:border-red-500'
                    type=''
                    placeholder='Doe'
                    ref={register(lastNameErrors)}
                  />
                  {errors.lastName && (
                    <p className='text-red-400 pt-1 text-sm'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className='text-sm font-bold text-gray-700 tracking-wide mt-4'>
                  Email Address
                </div>
                <input
                  name='email'
                  className='w-full text-lg py-2  border-b border-gray-300 focus:outline-none focus:border-red-500'
                  type=''
                  placeholder='mike@gmail.com'
                  ref={register(emailErrors)}
                />
                {errors.email && (
                  <p className='text-red-400 pt-1 text-sm'>
                    {errors.email.message}
                  </p>
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
                    className='w-full flex-grow flex-shrink text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
                    type={hidden ? 'password' : 'text'}
                    placeholder='Enter your password'
                    ref={register(passwordErrors)}
                  />
                  <span
                    className='absolute right-0'
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
              </div>
              <div className='mt-10'>
                <button
                  className='bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg'
                  type='submit'
                >
                  Register
                </button>
              </div>
            </form>
            <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
              You have an account ?
              <span className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
                <Link to='/login'>Log in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen'>
        <img src={register_img} className='object-cover w-full h-full' />
      </div>
    </div>
  );
}

export default Register;
