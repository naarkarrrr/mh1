import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bed, HeartPulse, ListChecks } from 'lucide-react';
import Link from 'next/link';

const dashboardStats = [
    { title: "Bed Occupancy", value: "85%", icon: Bed, href: "/nurse/beds" },
    { title: "Vitals to Record", value: "4", icon: HeartPulse, href: "/nurse/vitals" },
    { title: "Pending Tasks", value: "8", icon: ListChecks, href: "/nurse/tasks" },
]

export default function NurseDashboardPage() {
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
            <CardTitle>My Tasks</CardTitle>
             <CardDescription>Tasks for your current shift.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for task list */}
            <p className="text-muted-foreground">A list of tasks, such as administering medication or recording vitals, will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
