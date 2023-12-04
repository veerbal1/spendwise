import AvatarUI from '../avatar';
import Logo from '../logo';

function Header({ menu }: { menu: any }) {
  return (
    <div className="px-4 pt-2 flex justify-between">
      <div className="flex gap-2">
        <div className='md:hidden'>{menu}</div>
        <Logo />
      </div>
      <AvatarUI />
    </div>
  );
}

export default Header;
