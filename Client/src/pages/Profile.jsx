import { loremIpsum } from '../data/loremIpsum';
import Navbar from '../components/Navbar';
import women1 from '../images/women2.jpg';
import ProfileContainer from 'src/components/ProfileContainer';
import adriana1 from 'src/images/adriana1.jpg';
import adriana2 from 'src/images/adriana2.jpg';
import adriana3 from 'src/images/adriana3.jpg';
import adriana4 from 'src/images/adriana4.png';

const profile = {
  cover: women1,
  edit: true,
  name: 'Larbi LHILALI',
  description: 'Managing director at 1337 FIL',
  gender: 'M',
  sexuality: 'M',
  bio: loremIpsum,
  tags: [
    'administration',
    'mainstream',
    'pattern',
    'addition',
    'trait',
    'orange',
    'minute',
    'silk',
  ],
  fameRate: 98216,
  status: 'online',
  pictures: [adriana1, adriana2, adriana3, adriana4, women1],
};

function Profile() {
  return (
    <div
      className='flex flex-col h-full'
      style={{
        minHeight: '300px',
      }}
    >
      <Navbar type='transparent fixed' />
      <ProfileContainer profile={profile} />
    </div>
  );
}

export default Profile;
