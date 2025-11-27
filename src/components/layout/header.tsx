import UserNav from '@/components/auth/user-nav';

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-end gap-4 border-b border-white/10 bg-transparent px-4 lg:h-[60px] lg:px-6 lg:justify-end">
      {/* Mobile header is mainly for the sidebar toggle, which is in the sidebar component */}
      <div className="w-full flex-1 lg:hidden">
        {/* Can add search or other mobile header elements here if needed */}
      </div>

      {/* Desktop header elements */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Can add search bar etc here */}
      </div>
      <UserNav />
    </header>
  );
}
