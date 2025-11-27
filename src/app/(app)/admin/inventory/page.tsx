import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Bot } from 'lucide-react';

const inventoryItems = [
  { item_id: 'mask-n95', item_name: 'N95 Masks', quantity_available: 1500, min_required: 1000, reorder_level: 1200, supplier_id: 'sup-01', lead_time_days: 7 },
  { item_id: 'vent-01', item_name: 'Ventilators', quantity_available: 45, min_required: 30, reorder_level: 35, supplier_id: 'sup-02', lead_time_days: 30 },
  { item_id: 'oxy-lg', item_name: 'Oxygen Cylinders (Large)', quantity_available: 80, min_required: 50, reorder_level: 60, supplier_id: 'sup-03', lead_time_days: 5 },
  { item_id: 'sal-1l', item_name: 'Saline Solution (1L)', quantity_available: 50, min_required: 100, reorder_level: 80, supplier_id: 'sup-01', lead_time_days: 3 },
  { item_id: 'icu-bed', item_name: 'ICU Bed', quantity_available: 20, min_required: 15, reorder_level: 18, supplier_id: 'sup-04', lead_time_days: 45 },
];

const getStatus = (item: typeof inventoryItems[0]) => {
    if (item.quantity_available < item.min_required) return 'Critical';
    if (item.quantity_available <= item.reorder_level) return 'Low';
    return 'Stocked';
}

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
                        <TableHead>Available</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {inventoryItems.map((item) => {
                        const status = getStatus(item);
                        return (
                            <TableRow key={item.item_id}>
                            <TableCell className="font-medium">{item.item_name}</TableCell>
                            <TableCell>{item.quantity_available}</TableCell>
                            <TableCell>{item.reorder_level}</TableCell>
                            <TableCell>
                                <Badge
                                variant={status === 'Critical' ? 'destructive' : status === 'Low' ? 'secondary' : 'default'}
                                className={status === 'Low' ? 'bg-yellow-400/20 text-yellow-700' : ''}
                                >
                                {status}
                                </Badge>
                            </TableCell>
                            </TableRow>
                        );
                    })}
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
