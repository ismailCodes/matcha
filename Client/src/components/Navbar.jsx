import Logo from '../components/Logo';
import LgMenu from '../components/LgMenu';
import SmMenu from '../components/SmMenu';

function Navbar({ type }) {
  return (
    <nav
      className={`w-full flex justify-between bg-${type} h-16 items-center px-3 z-40`}
    >
      <Logo />
      {/* <LgMenu /> */}
      <SmMenu />
    </nav>
  );
}

export default Navbar;
