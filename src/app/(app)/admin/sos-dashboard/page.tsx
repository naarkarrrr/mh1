import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PhoneForwarded, History, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const activeAlerts = [
    { id: 'SOS-0129', time: '2 mins ago', location: '123 Main St, Cityville', patient: 'John Doe', status: 'Dispatched' },
    { id: 'SOS-0128', time: '5 mins ago', location: '456 Oak Ave, Townburg', patient: 'Jane Smith', status: 'Acknowledged' },
    { id: 'SOS-0127', time: '15 mins ago', location: '789 Pine Ln, Villagetown', patient: 'Peter Jones', status: 'Resolved' },
]

export default function SosDashboardPage() {
  const sosMapImage = PlaceHolderImages.find((img) => img.id === 'sos-map');

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Emergency SOS Dashboard</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active SOS Alerts
                <div className="text-2xl font-bold text-red-500">{activeAlerts.filter(a => a.status !== 'Resolved').length}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAlerts.map(alert => (
                <div key={alert.id} className="p-4 border rounded-lg flex items-start justify-between gap-4">
                    <div>
                        <div className="font-bold">{alert.patient} <span className="font-mono text-xs text-muted-foreground">{alert.id}</span></div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <MapPin size={14}/> {alert.location}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{alert.time}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                         <Badge variant={alert.status === 'Resolved' ? 'default' : alert.status === 'Dispatched' ? 'secondary' : 'destructive'}
                         className={alert.status === 'Dispatched' ? 'bg-yellow-400/20 text-yellow-700' : ''}
                         >
                            {alert.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                            <PhoneForwarded size={14} className="mr-2"/>
                            Dispatch Team
                        </Button>
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Alert Locations</CardTitle>
                    <CardDescription>Live map of incoming SOS signals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-square w-full overflow-hidden rounded-lg border">
                        {sosMapImage && (
                        <Image
                            src={sosMapImage.imageUrl}
                            alt={sosMapImage.description}
                            width={800}
                            height={600}
                            className="h-full w-full object-cover"
                            data-ai-hint={sosMapImage.imageHint}
                        />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
