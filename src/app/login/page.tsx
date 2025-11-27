'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, Role } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeartPulse } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen relative">
      <div className="flex items-center justify-center py-12 z-10 lg:col-span-2">
        <div className="mx-auto grid w-[350px] gap-8">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-3">
                <HeartPulse className="h-10 w-10 text-primary" />
                <h1 className="text-5xl font-bold font-headline text-glow-primary">VitalLens</h1>
            </div>
            <p className="text-balance text-muted-foreground text-lg">
              The Future of Predictive Healthcare.
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              onClick={() => login('patient')}
              className="w-full h-12 text-lg neon-button-primary"
            >
              Login as Patient
            </Button>
            <Button
              onClick={() => login('doctor')}
              variant="secondary"
              className="w-full h-12 text-lg bg-accent/20 border border-accent text-accent hover:bg-accent/30 hover:shadow-glow-accent"
            >
              Login as Doctor
            </Button>
            <Button
              onClick={() => login('admin')}
              variant="outline"
              className="w-full h-12 text-lg bg-transparent border-white/20 hover:bg-white/10 hover:text-white"
            >
              Login as Admin
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline text-accent hover:text-glow-accent">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
