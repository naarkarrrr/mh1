import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Microscope, FlaskConical, ListChecks } from 'lucide-react';
import Link from 'next/link';

const dashboardStats = [
    { title: "Pending Tests", value: "22", icon: FlaskConical, href: "/lab/tests" },
    { title: "Results to Enter", value: "8", icon: ListChecks, href: "/lab/results" },
    { title: "Equipment Status", value: "Optimal", icon: Microscope, href: "/lab/equipment" },
]

export default function LabDashboardPage() {
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

       <div className="grid gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Lab Test Queue</CardTitle>
             <CardDescription>List of tests waiting to be processed.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for lab test queue */}
            <p className="text-muted-foreground">A list of pending lab tests will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
