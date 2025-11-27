import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Bot } from 'lucide-react';

const inventoryItems = [
  { name: 'N95 Masks', id: 'mask-n95', stock: 1500, status: 'Low', lastOrdered: '2023-10-15' },
  { name: 'Ventilators', id: 'vent-01', stock: 45, status: 'Stocked', lastOrdered: '2023-09-20' },
  { name: 'Oxygen Cylinders (Large)', id: 'oxy-lg', stock: 80, status: 'Stocked', lastOrdered: '2023-10-05' },
  { name: 'Saline Solution (1L)', id: 'sal-1l', stock: 50, status: 'Critical', lastOrdered: '2023-10-18' },
  { name: 'ICU Bed', id: 'icu-bed', stock: 20, status: 'Stocked', lastOrdered: '2023-08-01' },
];

const procurementLog = [
    { id: "proc-0012", item: "N95 Masks", quantity: 5000, date: "2023-10-15", hash: "0xabc...def" },
    { id: "proc-0011", item: "Saline Solution (1L)", quantity: 200, date: "2023-10-18", hash: "0x123...456" },
]

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Inventory AI & Supply Chain</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Current Inventory</CardTitle>
                <CardDescription>Live stock levels for critical items.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Stock Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Ordered</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {inventoryItems.map((item) => (
                        <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>
                            <Badge
                            variant={item.status === 'Critical' ? 'destructive' : item.status === 'Low' ? 'secondary' : 'default'}
                            className={item.status === 'Low' ? 'bg-yellow-400/20 text-yellow-700' : ''}
                            >
                            {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{item.lastOrdered}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={20} />
                Shortage Prediction
              </CardTitle>
              <CardDescription>AI-powered shortage alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">N95 Masks</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">Predicted shortage in 5 days. Recommended reorder quantity: 10,000 units.</p>
               </div>
               <div className="p-4 bg-red-100/50 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
                    <p className="font-semibold text-red-800 dark:text-red-300">Saline Solution (1L)</p>
                    <p className="text-sm text-red-700 dark:text-red-400">Critical shortage imminent. Predicted shortage in 2 days. Expedite order immediately.</p>
               </div>
              <Button className="w-full">
                Run New Prediction
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle>Procurement Log (Blockchain)</CardTitle>
                <CardDescription>Auditable log of all procurement actions.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Blockchain Hash</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {procurementLog.map((log) => (
                        <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.id}</TableCell>
                        <TableCell>{log.item}</TableCell>
                        <TableCell>{log.quantity}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell className="font-mono text-xs">{log.hash}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
