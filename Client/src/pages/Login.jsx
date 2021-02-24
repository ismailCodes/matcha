/* eslint-disable no-console */
// import { useForm } from 'react-hook-form';

function Login() {
  // const { register, handleSubmit /*, watch, errors*/ } = useForm();
  // const onSubmit = (data) => console.log(data);
  return (
    <div className='lg:flex'>
      <div className='lg:w-1/2 xl:max-w-screen-md'>
        <div className='py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'>
          <div className='cursor-pointer flex items-center'>
            <div className='text-2xl text-red-600 tracking-wide ml-2 font-semibold'>
              MATCHA
            </div>
          </div>
        </div>
        <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
          <h2
            className='text-center text-4xl text-red-500 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold'
          >
            Log in
          </h2>
          <div className='mt-12'>
            <form>
              <div>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Email Address
                </div>
                <input
                  className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500'
                  type=''
                  placeholder='mike@gmail.com'
                />
              </div>
              <div className='mt-8'>
                <div className='flex justify-between items-center'>
                  <div className='text-sm font-bold text-gray-700 tracking-wide'>
                    Password
                  </div>
                  <div>
                    <a
                      className='text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer'
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-500'
                  type=''
                  placeholder='Enter your password'
                />
              </div>
              <div className='mt-10'>
                <button
                  className='bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                                shadow-lg'
                >
                  Log In
                </button>
              </div>
            </form>
            <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
              Don&apos;t have an account ?
              <a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className='hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen'
        style={{
          backgroundImage:
            'url(' +
            'https://images.unsplash.com/photo-1612972412954-c7dd0e42ba4b' +
            ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
}

export default Login;
