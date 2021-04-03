import { loremIpsum } from '../data/loremIpsum';
import Navbar from '../components/Navbar';
import women1 from '../images/women1.jpg';
import ProfileContainer from '../components/ProfileContainer';

const profile = {
  cover: women1,
  edit: true,
  name: 'Larbi LHILALI',
  description: 'Managing director at 1337 FIL',
  gender: 'M',
  sexuality: 'M',
  bio: loremIpsum,
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8'],
  fameRate: 98216,
  status: 'online',
};

function Profile() {
  return (
    <div
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
