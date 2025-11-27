'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { HeartPulse } from 'lucide-react';

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
          // Fallback for any other case, though roles are well-defined.
          router.replace('/login');
      }
    } else if (!loading && !user) {
        router.replace('/login');
    }
  }, [user, loading, router]);
  
  // Render a loading state while waiting for redirection
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <HeartPulse className="h-16 w-16 animate-pulse text-primary" />
        <p className="text-muted-foreground">Initializing Secure Connection...</p>
      </div>
    </div>
  );
}
