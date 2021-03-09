import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ImagesCarousel from '../library/ImagesCarousel';
import Tag from '../library/Tag';
import RoundIconButton from '../library/RoundIconButton';
import { faUserEdit, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { getInterests } from '../utils/getInterests';

function ProfileComp(props) {
  const { images, edit, name, description, gender, sexuality, bio, tags } = props;

  const lookingFor = getInterests(sexuality);
  return (
    <div className='w-full bg-gray-50 items-center flex-grow flex flex-col'>
      <div className='bg-gray-100 sm:my-4 pb-4'>
        <div className='sticky -top-20 z-10 mt-16 w-full sm:max-w-md bg-gray-600 h-80 bg-cover bg-center'>
          <ImagesCarousel images={images} />
        </div>
        <div className='relative '>
          <div className='sticky bg-gray-100 top-60 z-10 pb-2'>
            {edit ? <RoundIconButton icon={faUserEdit} /> : null}
            <div className='w-full sm:max-w-md self-center pt-10 pb-2 px-6 font-bold text-2xl'>
              {name}
            </div>
            <div className='w-full sm:max-w-md self-center px-6 font-normal text-lg'>
              {description}
            </div>
            <div className='w-full sm:max-w-md self-center px-4 text-gray-700 text-sm pt-2'>
              <FontAwesomeIcon
                className='mx-2 text-gray-600'
                size='2x'
                icon={gender == 'M' ? faMars : faVenus}
              />
              Looking for
              {lookingFor}
            </div>
          </div>
          <div className='pt-4'>
            <div className='w-full sm:max-w-md self-center px-6 text-gray-700 text-lg py-2'>
              {bio}
            </div>
            <div className='w-full sm:max-w-md self-center px-6 text-gray-700  pb-2'>
              Tags:
            </div>
            <div className='w-full sm:max-w-md self-center px-6'>
              {tags.map((tag) => {
                return <Tag key={tag} text={tag} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
