import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Link as LinkIcon, Pill } from 'lucide-react';


const patientData = {
  id: 'patient-001',
  name: 'Alex Ray',
  age: 34,
  gender: 'Male',
  bloodType: 'O+',
  avatarId: 'patient-avatar-1',
};

const prescriptions = [
    { id: 'presc-001', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', date: '2023-10-01', hash: '0x1a2b...c3d4' },
    { id: 'presc-002', name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', date: '2023-10-18', hash: '0x5e6f...7g8h', conflict: 'Potential mild interaction with Lisinopril.' },
];

const medicalHistory = [
    {id: 'hist-005', type: 'Consultation Note', date: '2023-10-01', summary: 'Follow-up for hypertension.', hash: '0x9i0j...k1l2'},
    {id: 'hist-004', type: 'Lab Results', date: '2023-09-25', summary: 'Blood panel results normal.', hash: '0x3m4n...o5p6'},
]


export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const avatar = PlaceHolderImages.find(p => p.id === patientData.avatarId);
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
             <Avatar className="h-24 w-24 border">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={patientData.name} />}
                <AvatarFallback className="text-3xl">{patientData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold font-headline">{patientData.name}</h1>
                <p className="text-muted-foreground">Patient ID: {patientData.id}</p>
                 <div className="flex gap-4 mt-2 text-sm">
                    <span>Age: {patientData.age}</span>
                    <span>Gender: {patientData.gender}</span>
                    <span>Blood Type: {patientData.bloodType}</span>
                </div>
            </div>
        </div>

        <Tabs defaultValue="prescriptions">
            <TabsList>
                <TabsTrigger value="prescriptions"><Pill className="mr-2 h-4 w-4"/>Prescriptions</TabsTrigger>
                <TabsTrigger value="history"><FileText className="mr-2 h-4 w-4"/>Medical History</TabsTrigger>
            </TabsList>
            <TabsContent value="prescriptions">
                <Card>
                    <CardHeader>
                        <CardTitle>Prescription History</CardTitle>
                        <CardDescription>All prescriptions are logged on the blockchain for auditability.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Medicine</TableHead>
                                    <TableHead>Dosage</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Blockchain Hash</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prescriptions.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">
                                            {p.name}
                                            {p.conflict && <Badge variant="destructive" className="ml-2 text-xs">Conflict</Badge>}
                                        </TableCell>
                                        <TableCell>{p.dosage}</TableCell>
                                        <TableCell>{p.frequency}</TableCell>
                                        <TableCell>{p.date}</TableCell>
                                        <TableCell className="font-mono text-xs flex items-center gap-2">{p.hash} <LinkIcon size={12}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="history">
                 <Card>
                    <CardHeader>
                        <CardTitle>Medical Records</CardTitle>
                         <CardDescription>All records are logged on the blockchain for auditability.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Summary</TableHead>
                                    <TableHead>Blockchain Hash</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medicalHistory.map(h => (
                                     <TableRow key={h.id}>
                                        <TableCell className="font-medium">{h.type}</TableCell>
                                        <TableCell>{h.date}</TableCell>
                                        <TableCell>{h.summary}</TableCell>
                                        <TableCell className="font-mono text-xs flex items-center gap-2">{h.hash} <LinkIcon size={12}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
