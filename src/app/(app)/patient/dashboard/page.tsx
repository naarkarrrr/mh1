'use client';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bell, MessageSquare, Upload, ShieldAlert, FileText, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { href: '/patient/alerts', title: 'My Alerts', description: 'View recent health advisories', icon: Bell, count: 2 },
  { href: '/patient/medbot', title: 'MedBot Assistant', description: 'Ask questions about your health', icon: MessageSquare },
  { href: '/patient/upload-prescription', title: 'Upload Prescription', description: 'Scan a new prescription', icon: Upload },
  { href: '/patient/sos', title: 'Emergency SOS', description: 'Request immediate assistance', icon: ShieldAlert },
];

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const patientName = user ? user.name.split(' ')[0] : 'there';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Welcome back, {patientName}!</h1>
        <p className="text-muted-foreground">Here's your health summary for today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Link href={link.href} key={link.title}>
            <Card className="h-full hover:bg-muted/80 transition-colors flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                <link.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  {link.count && <div className="text-2xl font-bold">{link.count} New</div>}
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of your recent health activities on VitalLens.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-accent/20 rounded-full"><Pill className="h-4 w-4 text-accent-foreground"/></div>
                        <div>New prescription for <span className="font-semibold">Amoxicillin</span> added.</div>
                        <div className="ml-auto text-muted-foreground text-xs">2 days ago</div>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-accent/20 rounded-full"><FileText className="h-4 w-4 text-accent-foreground"/></div>
                        <div>Consultation notes from <span className="font-semibold">Dr. Evelyn Reed</span> are available.</div>
                        <div className="ml-auto text-muted-foreground text-xs">5 days ago</div>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
