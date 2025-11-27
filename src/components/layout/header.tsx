import UserNav from '@/components/auth/user-nav';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Hospital } from 'lucide-react';
import { adminNavLinks, defaultNavLinks, doctorNavLinks, labTechnicianNavLinks, nurseNavLinks, pharmacistNavLinks } from '@/lib/nav-links';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="lg:hidden">
          {/* Mobile header content appears in sidebar */}
       </div>

      <div className="flex-1">
        {/* Can add a search bar or breadcrumbs here */}
      </div>
      
      <UserNav />
    </header>
  );
}
