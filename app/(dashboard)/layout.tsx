import Header from '../_components/layout/header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      <div className="pt-5">{children}</div>
    </div>
  );
}

export default Layout;
