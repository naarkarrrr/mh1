import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart2, Siren, Package, List } from 'lucide-react';
import Link from 'next/link';

const adminStats = [
    { title: "Active SOS Alerts", value: "3", icon: Siren, href: "/admin/sos-dashboard", color: "text-red-500" },
    { title: "Predicted Surges (24h)", value: "2", icon: BarChart2, href: "/admin/surge-dashboard" },
    { title: "Low Inventory Items", value: "8", icon: Package, href: "/admin/inventory" },
    { title: "Staff Schedules Pending", value: "1", icon: List, href: "/admin/resource-planner" },
]

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
            <Link href={stat.href} key={stat.title}>
                <Card className="hover:bg-muted transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={cn("h-4 w-4 text-muted-foreground", stat.color)} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stat.color || ''}`}>{stat.value}</div>
                    <p className="text-xs text-muted-foreground">Click to view details</p>
                </CardContent>
                </Card>
            </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Activity feed will be displayed here.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-sm">
                    <span>AI Services</span>
                    <span className="text-green-500 font-semibold">Operational</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2">
                    <span>Blockchain Ledger</span>
                    <span className="text-green-500 font-semibold">Synchronized</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2">
                    <span>Notification Service</span>
                    <span className="text-green-500 font-semibold">Active</span>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}
