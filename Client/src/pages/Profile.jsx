import Layout from '../components/Layout';
import larbi from '../images/larbi.jpg';
import larbi2 from '../images/larbi2.jpg';
import larbi3 from '../images/larbi3.jpeg';
import { loremIpsum } from '../data/loremIpsum';
import ProfileComp from '../components/Profiler';

const profile = {
  images: [larbi, larbi2, larbi3],
  edit: true,
  name: 'Larbi LHILALI',
  description: 'Managing director at 1337 FIL',
  gender: 'M',
  sexuality: 'F',
  bio: loremIpsum,
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8'],
};

function Profile() {
  return (
    <Layout>
      <ProfileComp {...profile} />
    </Layout>
  );
}

export default Profile;

<comp>
  <comp2></comp2>
</comp>;
