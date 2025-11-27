import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pill, Warehouse, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const dashboardStats = [
    { title: "Pending Prescriptions", value: "15", icon: Pill, href: "/pharmacist/prescriptions" },
    { title: "Inventory Status", value: "Healthy", icon: Warehouse, href: "/pharmacist/inventory" },
    { title: "Low Stock Alerts", value: "3", icon: AlertTriangle, href: "/pharmacist/inventory" },
]

export default function PharmacistDashboardPage() {
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
            <CardTitle>Prescriptions to Dispense</CardTitle>
             <CardDescription>Queue of prescriptions waiting for fulfillment.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for prescription queue */}
            <p className="text-muted-foreground">A list of prescriptions to be dispensed will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
