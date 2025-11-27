import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Bed, Warehouse, Bot } from 'lucide-react';
import Link from 'next/link';

const dashboardStats = [
    { title: "Active Staff", value: "128", icon: Users, href: "/admin/staff" },
    { title: "Bed Occupancy", value: "85%", icon: Bed, href: "/admin/beds" },
    { title: "Low Stock Items", value: "12", icon: Warehouse, href: "/admin/inventory" },
    { title: "AI System Status", value: "Nominal", icon: Bot, href: "/admin/ai" },
]

export default function AdminDashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <CardTitle>Hospital Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a more detailed chart or table */}
            <p className="text-muted-foreground">Live operational charts will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Recent significant events in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-5 w-5 text-primary"/>
                </div>
                <div className="text-sm">
                    <p className="font-medium">New staff member Dr. Emily Carter onboarded.</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="rounded-full bg-warning/10 p-2">
                    <Warehouse className="h-5 w-5 text-warning"/>
                </div>
                <div className="text-sm">
                    <p className="font-medium">Paracetamol stock is running low.</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
