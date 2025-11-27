import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Calendar, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const dashboardStats = [
    { title: "Assigned Patients", value: "12", icon: Users, href: "/doctor/patients" },
    { title: "Today's Appointments", value: "5", icon: Calendar, href: "/doctor/schedule" },
    { title: "Open Encounters", value: "3", icon: Stethoscope, href: "/doctor/patients" },
]

export default function DoctorDashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {dashboardStats.map((stat) => (
            <Link href={stat.href} key={stat.title}>
                <Card className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
                </Card>
            </Link>
        ))}
      </div>

       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
             <CardDescription>Your schedule for the rest of the day.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for appointments list */}
            <p className="text-muted-foreground">Appointments will be listed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Lab results and other important updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             {/* Placeholder for notifications */}
             <p className="text-muted-foreground">Notifications will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
