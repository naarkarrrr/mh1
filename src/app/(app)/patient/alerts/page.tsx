import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Wind, CloudRain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const alerts = [
  { 
    id: 1, 
    title: 'High AQI Warning', 
    message: 'Air Quality Index is currently 125 (Unhealthy for Sensitive Groups). It is recommended to limit outdoor activities if you have respiratory conditions.',
    timestamp: '2 hours ago',
    icon: Wind,
    severity: 'High'
  },
  { 
    id: 2, 
    title: 'High Pollen Count', 
    message: 'Pollen count is high today. Please take your allergy medication as prescribed and consider wearing a mask outdoors.',
    timestamp: '1 day ago',
    icon: CloudRain,
    severity: 'Medium'
  },
];

export default function PatientAlertsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold font-headline mb-6">My Health Alerts</h1>
        <Card>
          <CardHeader>
            <CardTitle>Proactive Advisories</CardTitle>
            <CardDescription>Personalized alerts based on your health profile and local conditions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <alert.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{alert.title}</p>
                      <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'}>{alert.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Bell className="mx-auto h-12 w-12" />
                <p className="mt-4">No new alerts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
