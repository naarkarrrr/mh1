import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, User, FileText } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const patients = [
  { id: 'patient-001', name: 'Alex Ray', condition: 'Post-op recovery', avatarId: 'patient-avatar-1' },
  { id: 'patient-002', name: 'Casey Becker', condition: 'Asthma exacerbation', avatarId: 'patient-avatar-2' },
];

const alerts = [
  { id: 1, text: "Lab results for Alex Ray are in.", time: "15m ago" },
  { id: 2, text: "Patient Casey Becker reports high pollen count effects.", time: "1h ago" },
];

export default function DoctorDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Doctor's Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Assigned Patients</CardTitle>
            <CardDescription>Your patient list for today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {patients.map((patient) => {
              const avatar = PlaceHolderImages.find(p => p.id === patient.avatarId);
              return (
                <Link href={`/doctor/patient/${patient.id}`} key={patient.id}>
                    <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar>
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={patient.name} />}
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="font-semibold">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">View EHR</Button>
                    </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar size={20}/> Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p><strong>9:00 AM:</strong> Rounds - General Ward</p>
                    <p><strong>11:00 AM:</strong> Consultation - Alex Ray</p>
                    <p><strong>2:00 PM:</strong> Team Meeting - ICU</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell size={20}/> Pending Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {alerts.map(alert => (
                        <div key={alert.id} className="text-sm">
                            <p className="text-foreground">{alert.text}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
