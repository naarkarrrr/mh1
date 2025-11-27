'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Hospital } from 'lucide-react';

export default function AppRootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${user.role}/dashboard`);
    } else if (!loading && !user) {
        router.replace('/login');
    }
  }, [user, loading, router]);
  
  // Render a loading state while waiting for redirection
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <Hospital className="h-12 w-12 animate-pulse text-primary" />
        <p className="text-muted-foreground">Loading HMS Core...</p>
      </div>
    </div>
  );
}
