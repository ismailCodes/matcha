import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ImagesCarousel from '../library/ImagesCarousel';
import Tag from '../library/Tag';
import RoundIconButton from '../library/RoundIconButton';
import { faUserEdit, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { getInterests } from '../utils/getInterests';
import ProfileDialogPopUp from './ProfileDialogPopUp';

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

function clsx(options) {
  var entries = Object.entries(options);

  const computedClassName = entries.filter(isTrue).map(getKey).join(' ');

  if (options.initialClass) {
    return `${options.initialClass} ${computedClassName}`;
  } else {
    return computedClassName;
  }

  function isTrue([, value]) {
    return value;
  }

  function getKey([key]) {
    return key;
  }
}

clsx({
  'h-full': true,
  'h-10': false,
});

function Bio(props) {
  const [showFullBio, setShowFullBio] = useState(false);
  const { bio } = props;

  return (
    <div
      className={clsx({
        initialClass:
          'w-full sm:max-w-md self-center px-6 text-gray-700 text-lg py-2',
        'h-80': showFullBio,
        'h-full': !showFullBio,
      })}
    >
      <p>{showFullBio ? bio : bio.split(' ').slice(0, 20).join(' ')}</p>
      <a
        className='text-blue-500 cursor-pointer'
        onClick={() => setShowFullBio(!showFullBio)}
      >
        {showFullBio ? 'See less' : 'See more'}
      </a>
    </div>
  );
}

function ProfileComp(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { images, edit, name, description, gender, sexuality, bio, tags } = props;

  const lookingFor = getInterests(sexuality);
  return (
    <div className='w-full bg-gray-100 items-center flex flex-col h-full'>
      <div className='mt-16 sm:mt-20 sm:shadow-xl pb-6'>
        <ProfileDialogPopUp open={open} handleClose={handleClose} />
        <div className='sticky -top-20 z-10 w-full sm:max-w-md bg-gray-600 h-80 bg-cover bg-center'>
          <ImagesCarousel images={images} />
        </div>
        <div className='relative bg-gray-100'>
          <div className='sticky bg-gray-100 top-60 z-10 pb-2'>
            {edit ? (
              <RoundIconButton icon={faUserEdit} onClick={handleClickOpen} />
            ) : null}
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
          <div>
            <Bio bio={bio} />
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
