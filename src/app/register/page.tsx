'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeartPulse } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen relative">
      <div className="flex items-center justify-center py-12 z-10 lg:col-span-2">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
             <div className="flex items-center justify-center gap-3">
                <HeartPulse className="h-10 w-10 text-primary" />
                <h1 className="text-5xl font-bold font-headline text-glow-primary">VitalLens</h1>
            </div>
            <p className="text-balance text-muted-foreground text-lg">
              Create your secure health account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required className="bg-white/5 border-white/20"/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required className="bg-white/5 border-white/20"/>
                </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-white/5 border-white/20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="bg-white/5 border-white/20"/>
            </div>
            <Button type="submit" className="w-full h-12 text-lg neon-button-primary">
              Create an account
            </Button>
            <Button variant="outline" className="w-full h-12 text-lg bg-transparent border-white/20 hover:bg-white/10 hover:text-white">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-accent hover:text-glow-accent">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
