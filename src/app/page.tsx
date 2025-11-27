'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        switch (user.role) {
          case 'patient':
            router.push('/patient/dashboard');
            break;
          case 'doctor':
            router.push('/doctor/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
          default:
            router.push('/login');
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="space-y-4 p-8">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </div>
  );
}
