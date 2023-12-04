function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-60 px-4">
      <div className="flex gap-1 flex-col">{children}</div>
    </div>
  );
}

export default Sidebar;
