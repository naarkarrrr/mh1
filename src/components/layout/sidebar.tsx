'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  adminNavLinks,
  doctorNavLinks,
  nurseNavLinks,
  pharmacistNavLinks,
  labTechnicianNavLinks,
  defaultNavLinks
} from '@/lib/nav-links';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Hospital } from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();

  const navLinks =
    user?.role === 'admin'
      ? adminNavLinks
      : user?.role === 'doctor'
      ? doctorNavLinks
      : user?.role === 'nurse'
      ? nurseNavLinks
      : user?.role === 'pharmacist'
      ? pharmacistNavLinks
      : user?.role === 'lab_technician'
      ? labTechnicianNavLinks
      : defaultNavLinks;

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-72 p-0 bg-background">
             <nav className="flex-1 flex flex-col gap-2 p-4">
                <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold px-2 mb-4"
              >
                <Hospital className="h-6 w-6 text-primary" />
                <span>HMS-Core</span>
              </Link>
                {navLinks.map((link) => (
                  <SidebarLink key={link.href} href={link.href} icon={link.icon} label={link.label} isMobile />
                ))}
              </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 border-r bg-card text-card-foreground">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Hospital className="h-6 w-6 text-primary" />
            <span className="">HMS-Core</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start p-4 text-sm font-medium">
            {navLinks.map((link) => (
              <SidebarLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ href, icon: Icon, label, isMobile }: { href: string; icon: LucideIcon; label: string, isMobile?: boolean }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
        isActive && 'bg-primary/10 text-primary font-semibold',
        isMobile ? 'text-base' : 'text-sm'
      )}
    >
      <Icon className={cn('h-4 w-4', isActive && 'text-primary')} />
      {label}
    </Link>
  );
}
