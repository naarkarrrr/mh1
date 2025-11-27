'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { patientNavLinks, doctorNavLinks, adminNavLinks } from '@/lib/nav-links';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Sidebar() {
  const { user } = useAuth();

  const navLinks =
    user?.role === 'patient'
      ? patientNavLinks
      : user?.role === 'doctor'
      ? doctorNavLinks
      : adminNavLinks;

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 glass-pane">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-72 p-0 glass-pane !border-r-white/20">
             <nav className="flex-1 flex flex-col gap-4 p-4">
                <Link
                href="#"
                className="flex items-center gap-2 text-2xl font-semibold font-headline px-2 text-glow-primary"
              >
                <HeartPulse className="h-7 w-7 text-primary" />
                <span>VitalLens</span>
              </Link>
                {navLinks.map((link) => (
                  <SidebarLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
                ))}
              </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 xl:w-72">
        <div className="flex h-full max-h-screen flex-col gap-2 glass-pane !rounded-none !border-l-0 !border-t-0 !border-b-0 !border-r-white/10">
          <div className="flex h-14 items-center border-b border-white/10 px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold font-headline text-2xl text-glow-primary">
              <HeartPulse className="h-7 w-7 text-primary" />
              <span className="">VitalLens</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <SidebarLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-white hover:bg-white/10 text-base',
        isActive && 'bg-primary/20 text-primary font-bold shadow-glow-primary-sm'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive && 'text-primary')} />
      {label}
    </Link>
  );
}
