import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faMars,
  faVenus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';

export const getInterests = (sexuality) => {
  if (sexuality == 'M') {
    return (
      <FontAwesomeIcon className='mx-2 text-gray-600' size='2x' icon={faMars} />
    );
  } else if (sexuality == 'F') {
    return (
      <FontAwesomeIcon className='mx-2 text-gray-600' size='2x' icon={faVenus} />
    );
  } else if (sexuality == 'MF' || sexuality == '') {
    return (
      <FontAwesomeIcon className='mx-2 text-gray-600' size='2x' icon={faVenusMars} />
    );
  } else {
    return (
      <FontAwesomeIcon
        className='mx-2 text-gray-600'
        size='2x'
        icon={faQuestionCircle}
      />
    );
  }
};
