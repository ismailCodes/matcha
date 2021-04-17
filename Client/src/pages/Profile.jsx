import { loremIpsum } from '../data/loremIpsum';
import Navbar from '../components/Navbar';
import women1 from '../images/women1.jpg';
import ProfileContainer from 'src/components/ProfileContainer';
import adriana1 from 'src/images/adriana1.jpg';
import adriana2 from 'src/images/adriana2.jpg';
import adriana3 from 'src/images/adriana3.jpg';
import adriana4 from 'src/images/adriana4.png';
import { useState } from 'react';

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
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div
      className={`flex flex-col ${editModalOpen ? 'overflow-hidden' : ''}`}
      style={{
        minHeight: '300px',
      }}
    >
      <Navbar
        notificationModalOpen={notificationModalOpen}
        setNotificationModalOpen={setNotificationModalOpen}
      />
      <ProfileContainer
        profile={profile}
        notificationModalOpen={notificationModalOpen}
        setNotificationModalOpen={setNotificationModalOpen}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
}

export default Profile;
