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
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center h-full animate-fade-in-blur">
      <Card className="w-full max-w-md text-center glass-pane shadow-glow-danger-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-headline text-glow-primary">Emergency SOS</CardTitle>
          <CardDescription>In case of a medical emergency, press and hold the button below to alert response teams.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Button
            onClick={handleSos}
            disabled={status !== 'idle'}
            className="w-48 h-48 rounded-full bg-status-danger/80 hover:bg-status-danger text-white shadow-glow-danger-lg transition-all duration-300 ease-in-out
                       enabled:hover:scale-105 enabled:active:scale-95 
                       disabled:opacity-50
                       data-[status=idle]:animate-pulse"
            aria-label="Activate Emergency SOS"
            data-status={status}
          >
            {status === 'idle' && <ShieldAlert className="h-24 w-24" />}
            {status === 'sending' && <Loader className="h-24 w-24 animate-spin" />}
            {status === 'sent' && <CheckCircle className="h-24 w-24" />}
          </Button>
          <div className="mt-6 h-6">
            {status === 'idle' && <p className="text-muted-foreground">Press for immediate help</p>}
            {status === 'sending' && <p className="text-status-warning animate-pulse">Sending Alert...</p>}
            {status === 'sent' && <p className="text-status-success font-semibold">Alert Sent Successfully!</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
