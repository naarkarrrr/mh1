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
  { href: '/patient/sos', title: 'Emergency SOS', description: 'Request immediate assistance', icon: ShieldAlert, special: true },
];

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const patientName = user ? user.name.split(' ')[0] : 'there';

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 animate-fade-in-blur">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-glow-primary">Welcome back, {patientName}!</h1>
        <p className="text-lg text-muted-foreground">Here is your personal health command center.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
            <Link href={link.href} key={link.title} className="h-full">
                <Card className={`glass-pane h-full flex flex-col group ${link.special ? 'border-status-danger/50 shadow-glow-danger-lg' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">{link.title}</CardTitle>
                    <link.icon className={`h-5 w-5 ${link.special ? 'text-status-danger' : 'text-accent'} transition-transform group-hover:scale-125`} />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <div>
                    {link.count && <div className="text-3xl font-bold text-glow-accent">{link.count} New</div>}
                    <p className="text-xs text-muted-foreground/80">{link.description}</p>
                    </div>
                </CardContent>
                </Card>
            </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <Card className="glass-pane">
            <CardHeader>
                <CardTitle className="text-xl font-headline">Recent Activity</CardTitle>
                <CardDescription>A log of your recent health activities on VitalLens.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-sm p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="p-2 bg-accent/20 rounded-full shadow-glow-accent"><Pill className="h-5 w-5 text-accent"/></div>
                        <div>New prescription for <span className="font-semibold text-white">Amoxicillin</span> added.</div>
                        <div className="ml-auto text-muted-foreground text-xs">2 days ago</div>
                    </li>
                    <li className="flex items-center gap-4 text-sm p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="p-2 bg-accent/20 rounded-full shadow-glow-accent"><FileText className="h-5 w-5 text-accent"/></div>
                        <div>Consultation notes from <span className="font-semibold text-white">Dr. Evelyn Reed</span> are available.</div>
                        <div className="ml-auto text-muted-foreground text-xs">5 days ago</div>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
