import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import larbi from '../images/larbi.jpg';

function Profile() {
  return (
    <Layout>
      <div className='w-full h-full items-center flex flex-col sm:pt-4'>
        <div className='w-full sm:max-w-md bg-gray-600 h-96 relative bg-cover bg-center'>
          <img src={larbi} alt='larbi' className='object-cover w-full h-full' />
          <button className='rounded-full bg-red-500 absolute bottom-0 left-4 transform translate-y-1/2 h-20 w-20 shadow-lg border-2'>
            <FontAwesomeIcon
              className='mx-3 text-gray-50 hover:text-white'
              size='2x'
              icon={faUserEdit}
            />
          </button>
        </div>
        <div className='w-full sm:max-w-md self-center pt-12 pb-2 px-6 font-bold text-2xl'>
          Laarbi LHILALI
        </div>
        <div className='w-full sm:max-w-md self-center px-6 font-normal text-lg'>
          Managing director at 1337 FIL
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

<comp>
  <comp2></comp2>
</comp>;
