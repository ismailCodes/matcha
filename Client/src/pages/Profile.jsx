import Layout from '../components/Layout';
import {
  faUserEdit,
  faMale,
  faFemale,
} from '@fortawesome/free-solid-svg-icons';
import larbi from '../images/larbi.jpg';
import RoundIconButton from '../library/RoundIconButton';
import { loremIpsum } from '../data/loremIpsum';
import Tag from '../library/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Profile() {
  return (
    <Layout>
      <div className='w-full items-center flex-grow flex flex-col'>
        <div className='bg-gray-100 sm:my-4'>
          <div className='sticky -top-20 z-10 mt-16 w-full sm:max-w-md bg-gray-600 h-80 bg-cover bg-center'>
            <img
              src={larbi}
              alt='larbi'
              className='object-cover w-full h-full'
            />
          </div>
          <div className='relative '>
            <div className='sticky bg-gray-100 top-60 z-10 pb-2'>
              <RoundIconButton icon={faUserEdit} />
              <div className='w-full sm:max-w-md self-center pt-10 pb-2 px-6 font-bold text-2xl'>
                Laarbi LHILALI
              </div>
              <div className='w-full sm:max-w-md self-center px-6 font-normal text-lg'>
                Managing director at 1337 FIL
              </div>
              <div className='w-full sm:max-w-md self-center px-4 text-gray-700 text-sm pt-2'>
                <FontAwesomeIcon
                  className='mx-2 text-gray-600 hover:text-white transform '
                  size='2x'
                  icon={faMale}
                />
                Looking for
                <FontAwesomeIcon
                  className='mx-2 text-gray-600 hover:text-white transform '
                  size='2x'
                  icon={faFemale}
                />
              </div>
            </div>
            <div className='pt-4'>
              <div className='w-full sm:max-w-md self-center px-6 text-gray-700 text-sm py-2'>
                {loremIpsum.repeat(3)}
              </div>
              <div className='w-full sm:max-w-md self-center px-6 text-gray-700  pb-2'>
                Tags:
              </div>
              <div className='w-full sm:max-w-md self-center px-6'>
                <Tag color='bg-red-400' text='tag1' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

<comp>
  <comp2></comp2>
</comp>;
