'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Loader, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PatientSosPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const { toast } = useToast();

  const handleSos = () => {
    setStatus('sending');
    
    // Simulate getting location and sending to Firestore
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('SOS triggered at:', { latitude, longitude });

        // Simulate API call
        setTimeout(() => {
          setStatus('sent');
          toast({
            title: "SOS Alert Sent",
            description: "Help is on the way. Your location has been shared with the emergency response team.",
          });
        }, 2000);
      },
      (error) => {
        console.error("Error getting location:", error);
        setStatus('idle');
        toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not get your location. Please ensure location services are enabled.",
        });
      }
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Emergency SOS</CardTitle>
          <CardDescription>Press and hold the button below for 3 seconds if you need immediate medical assistance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Button
            onClick={handleSos}
            disabled={status !== 'idle'}
            className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg animate-pulse focus:animate-none"
            aria-label="Activate Emergency SOS"
          >
            {status === 'idle' && <ShieldAlert className="h-24 w-24" />}
            {status === 'sending' && <Loader className="h-24 w-24 animate-spin" />}
            {status === 'sent' && <CheckCircle className="h-24 w-24" />}
          </Button>
          <div className="mt-6 h-6">
            {status === 'idle' && <p className="text-muted-foreground">Press for help</p>}
            {status === 'sending' && <p className="text-primary animate-pulse">Sending alert...</p>}
            {status === 'sent' && <p className="text-green-600 font-semibold">Alert sent successfully!</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
