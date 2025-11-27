'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppRootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'patient':
          router.replace('/patient/dashboard');
          break;
        case 'doctor':
          router.replace('/doctor/dashboard');
          break;
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        default:
          router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="w-full space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
