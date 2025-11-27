import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const currentSchedule = [
    { shift: "Morning (7am-3pm)", staff: "Dr. Smith, RN Jones, RN-Trainee Lee", area: "ER"},
    { shift: "Afternoon (3pm-11pm)", staff: "Dr. Chen, RN Patel", area: "ICU"},
    { shift: "Night (11pm-7am)", staff: "Dr. Williams, RN Davis", area: "General Ward"},
]

export default function ResourcePlannerPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Agentic Resource Planner</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={20} />
                AI Planner Agent
              </CardTitle>
              <CardDescription>Input current resources to optimize schedule.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="staff-list">Staff List (comma-separated)</Label>
                <Input id="staff-list" placeholder="Dr. A, Nurse B, ..." defaultValue="Dr. Smith, Dr. Chen, Dr. Williams, RN Jones, RN Patel, RN Davis, RN-Trainee Lee" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bed-count">Total Bed Count</Label>
                <Input id="bed-count" type="number" placeholder="150" defaultValue="200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ventilator-count">Ventilator Count</Label>
                <Input id="ventilator-count" type="number" placeholder="30" defaultValue="45" />
              </div>
              <Button className="w-full">
                Generate Optimal Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generated Schedule</CardTitle>
              <CardDescription>Optimized staff and resource allocation for the next 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Shift</TableHead>
                        <TableHead>Assigned Staff</TableHead>
                        <TableHead>Area</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentSchedule.map(item => (
                        <TableRow key={item.shift}>
                            <TableCell>{item.shift}</TableCell>
                            <TableCell>{item.staff}</TableCell>
                            <TableCell>{item.area}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4 w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Export to Google Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
