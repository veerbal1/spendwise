import Header from '../_components/layout/header';
import Sidebar from './_components/sidebar';
import SlideSidebar from './_components/slide-sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header menu={<SlideSidebar />} />
      <div className="pt-5 p-5 flex gap-2">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
