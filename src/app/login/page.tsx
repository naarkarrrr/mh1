'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, Role } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeartPulse } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2">
                <HeartPulse className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline">VitalLens</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Select a role to log in to the system
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              onClick={() => login('patient')}
              className="w-full"
            >
              Login as Patient
            </Button>
            <Button
              onClick={() => login('doctor')}
              variant="secondary"
              className="w-full"
            >
              Login as Doctor
            </Button>
            <Button
              onClick={() => login('admin')}
              variant="outline"
              className="w-full"
            >
              Login as Admin
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={bgImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
