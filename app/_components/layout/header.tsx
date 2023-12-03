import AvatarUI from '../avatar';
import Logo from '../logo';

function Header() {
  return (
    <div className="px-4 pt-2 flex justify-between">
      <Logo />
      <AvatarUI />
    </div>
  );
}

export default Header;
