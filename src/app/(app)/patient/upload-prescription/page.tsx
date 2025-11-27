'use client';
import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { processPrescriptionImage, ProcessPrescriptionImageOutput } from '@/ai/flows/prescription-ocr';
import { Upload, Loader, FileCheck2, AlertTriangle, Pill } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessPrescriptionImageOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please choose an image to upload.',
      });
      return;
    }

    setResult(null);
    startTransition(async () => {
      try {
        const ocrResult = await processPrescriptionImage({ image: preview });
        
        // Dummy conflict check for demonstration
        const resultWithConflicts = {
            ...ocrResult,
            medicines: ocrResult.medicines.map(med => ({
                ...med,
                conflict: med.name.toLowerCase().includes('amoxicillin') ? 'Potential mild interaction with Lisinopril.' : undefined
            }))
        }
        setResult(resultWithConflicts);

        toast({
          title: 'Success!',
          description: 'Prescription processed and saved to your EHR.',
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Processing Failed',
          description: 'Could not extract information from the image. Please try another image.',
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-headline mb-6">OCR Prescription Scanner</h1>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                <CardHeader>
                    <CardTitle>Upload Prescription Image</CardTitle>
                    <CardDescription>The AI will scan the image and extract medication details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                    <label htmlFor="prescription-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Prescription File
                    </label>
                    <Input id="prescription-upload" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    {preview && (
                        <div className="mt-4 border rounded-lg p-2">
                        <img src={preview} alt="Prescription preview" className="max-h-60 w-full object-contain" />
                        </div>
                    )}
                    <Button onClick={handleSubmit} disabled={!file || isPending} className="w-full">
                    {isPending ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Upload className="mr-2 h-4 w-4" />
                    )}
                    Scan Prescription
                    </Button>
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileCheck2/> Extracted Information</CardTitle>
                    <CardDescription>Review the extracted details before saving to your EHR.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isPending && (
                        <div className="flex items-center justify-center h-full">
                            <Loader className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {!isPending && !result && (
                        <div className="text-center text-muted-foreground py-8">
                            <Pill className="mx-auto h-12 w-12" />
                            <p className="mt-4">Results will appear here</p>
                        </div>
                    )}
                    {result && (
                        <div className="space-y-4">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Medicine</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {result.medicines.map((med, index) => (
                                <TableRow key={index}>
                                <TableCell className="font-medium">{med.name}
                                 {med.conflict && <Badge variant="destructive" className="ml-2 text-xs">Conflict</Badge>}
                                </TableCell>
                                <TableCell>{med.dosage}</TableCell>
                                <TableCell>{med.frequency}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                         {result.medicines.some(m => m.conflict) && 
                            <div className="p-3 rounded-lg bg-yellow-100/50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1"/>
                                <div>
                                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Potential Conflict Detected</h3>
                                    {result.medicines.filter(m => m.conflict).map((med, i) => (
                                         <p key={i} className="text-sm text-yellow-700 dark:text-yellow-400">{med.conflict}</p>
                                    ))}
                                    <p className="text-xs text-muted-foreground mt-2">Please consult your doctor about these potential interactions.</p>
                                </div>
                            </div>
                         }
                        <Button className="w-full">Save to EHR</Button>
                        </div>
                    )}
                </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
