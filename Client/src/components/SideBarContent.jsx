import SideBarItem from './SideBarItem';

const SideBarItems = [
  'Search',
  'Messages',
  'My history',
  'My viewers',
  'Profile',
  'SignOut',
];

function SideBarContent() {
  return (
    <div className='flex flex-col w-full'>
      <ul className='mx-3'>
        {SideBarItems.map((item) => {
          return <SideBarItem key={item} text={item} />;
        })}
      </ul>
    </div>
  );
}

export default SideBarContent;
