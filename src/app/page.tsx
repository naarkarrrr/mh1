'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Hospital } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Hospital className="h-16 w-16 animate-pulse text-primary" />
        <h1 className="text-2xl font-semibold">HMS-Core</h1>
        <p className="text-muted-foreground">Loading Your Dashboard...</p>
      </div>
    </div>
  );
}
