'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { HeartPulse } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // User is logged in, redirect to the main app page
        // which will handle role-based redirection.
        router.push('/patient/dashboard'); // Or a generic '/app' route
      }
    }
  }, [user, loading, router]);

  // Show a loading screen while checking auth status
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <HeartPulse className="h-16 w-16 animate-pulse text-primary" />
        <h1 className="text-2xl font-headline text-glow-primary">VitalLens</h1>
        <p className="text-muted-foreground">Authenticating Interface...</p>
      </div>
    </div>
  );
}
