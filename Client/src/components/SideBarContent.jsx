import { AiOutlineClose } from 'react-icons/ai';
import SideBarItem from './SideBarItem';

const SideBarItems = [
  'Search',
  'Messages',
  'My history',
  'My viewers',
  'Profile',
  'SignOut',
];

function SideBarContent({ open, setOpen }) {
  return (
    <div className='flex flex-col w-full h-10'>
      <div className='h-10 w-10 flex' onClick={() => setOpen(!open)}>
        <AiOutlineClose
          className='w-full h-full p-1 text-roseMatcha cursor-pointer'
          onClick={() => setOpen(false)}
        />
      </div>
      <ul className='mx-3'>
        {SideBarItems.map((item) => {
          return <SideBarItem key={item} text={item} />;
        })}
      </ul>
    </div>
  );
}

export default SideBarContent;
