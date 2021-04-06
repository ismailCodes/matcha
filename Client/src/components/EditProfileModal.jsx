import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const password_errors = {
  maxLength: {
    value: 255,
    message: 'password should be less than 255 characters',
  },
  minLength: {
    value: 8,
    message: 'password should be at least 6 characters',
  },
};

function EditProfileModal({ editModalOpen, modalVariants, setEditModalOpen }) {
  const [hidden, setHidden] = useState(true);
  const { register, handleSubmit, errors } = useForm();

  return (
    <motion.div
      className={`h-screen w-screen z-50 bg-gray-900 bg-opacity-40 fixed top-0 flex justify-center py-4 px-2 ${
        editModalOpen ? '' : 'hidden'
      }`}
      variants={modalVariants}
      animate={editModalOpen ? 'open' : 'closed'}
    >
      <div className='h-full w-full bg-gray-50 rounded-xl py-3 px-2 flex flex-col'>
        <div className='px-3'>
          <div className='text-xl pt-3'>Edit profile</div>
          <hr className='my-3 border border-roseMatcha w-20' />

          <div className='text-gray-800 text-base'>Change your password</div>

          <div className='flex items-center relative'>
            <input
              name='password1'
              className='my-2 px-4 w-full bg-transparent flex-grow flex-shrink text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
              type={hidden ? 'password' : 'text'}
              placeholder='Your current password'
              ref={register(password_errors)}
            />
            <span className='absolute right-2' onClick={() => setHidden(!hidden)}>
              <label className='rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label select-none'>
                {hidden ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </label>
            </span>
          </div>
          {errors.password && (
            <p className='text-red-400 pt-1 text-sm'>{errors.password.message}</p>
          )}

          <div className='flex items-center relative'>
            <input
              name='password2'
              className='my-2 px-4 w-full bg-transparent flex-grow flex-shrink text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
              type={hidden ? 'password' : 'text'}
              placeholder='Your new password'
              ref={register(password_errors)}
            />
            <span className='absolute right-2' onClick={() => setHidden(!hidden)}>
              <label className='rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label select-none'>
                {hidden ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </label>
            </span>
          </div>
          {errors.password && (
            <p className='text-red-400 pt-1 text-sm'>{errors.password.message}</p>
          )}

          <div className='flex items-center relative'>
            <input
              name='password3'
              className='my-2 px-4 w-full bg-transparent flex-grow flex-shrink text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
              type={hidden ? 'password' : 'text'}
              placeholder='Confirm you new password'
              ref={register(password_errors)}
            />
            <span className='absolute right-2' onClick={() => setHidden(!hidden)}>
              <label className='rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label select-none'>
                {hidden ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </label>
            </span>
          </div>
          {errors.password && (
            <p className='text-red-400 pt-1 text-sm'>{errors.password.message}</p>
          )}

          {/* <hr className='my-3 border border-roseMatcha w-20' /> */}

          <div className='text-gray-800 text-base mt-3'>
            Edit your personal informations
          </div>

          <div className='flex items-center relative'>
            <input
              name='firstName'
              className='my-2 px-4 w-full bg-transparent flex-grow flex-shrink text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
              type='text'
              placeholder='First Name'
              // ref={register(password_errors)}
            />
          </div>
          {/* {errors.password && (
            <p className='text-red-400 pt-1 text-sm'>{errors.password.message}</p>
          )} */}

          <div className='flex items-center relative'>
            <input
              name='lastName'
              className='my-2 px-4 w-full bg-transparent flex-grow flex-shrink text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-red-500 pr-16'
              type='text'
              placeholder='Last Name'
              // ref={register(password_errors)}
            />
          </div>
          {/* {errors.password && (
            <p className='text-red-400 pt-1 text-sm'>{errors.password.message}</p>
          )} */}

          <div className='flex items-center relative bg-transparent'>
            <select
              name='gender'
              className='w-full my-2 py-2 px-4  bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-500'
              defaultValue=''
            >
              <option value='' disabled defaultValue hidden>
                Gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>

          <div className='flex items-center relative bg-transparent'>
            <select
              name='sexuality'
              className='w-full my-2 py-2 px-4  bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-500'
              defaultValue=''
            >
              <option value='' disabled defaultValue hidden>
                I like ..
              </option>
              <option value='male'>Males</option>
              <option value='female'>Females</option>
              <option value='female'>Both</option>
            </select>
          </div>

          <div className='flex flex-col justify-center relative bg-transparent my-2'>
            <label htmlFor='description' className='py-2'>
              Biography
            </label>
            <textarea
              style={{ resize: 'none' }}
              name='bio'
              rows='4'
              className='bg-transparent w-full border shadow-lg p-2 rounded-lg'
            ></textarea>
          </div>
          <div className='flex items-end justify-end mt-8'>
            <div
              className='text-roseMatcha border border-roseMatcha px-3 py-1 rounded-lg mx-2 w-20 text-center '
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </div>
            <div className='bg-roseMatcha border border-roseMatcha px-3 py-1 rounded-lg mx-2 text-gray-50 w-20 text-center'>
              Save
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EditProfileModal;
