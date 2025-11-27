// prescription-ocr.ts
'use server';

/**
 * @fileOverview Extracts data from a prescription image using OCR.
 *
 * @remarks
 * This flow takes an image of a prescription as input and uses OCR to extract
 * medication details. The extracted information is then returned as a
 * structured JSON object.
 *
 * @exports {
 *   processPrescriptionImage: (input: ProcessPrescriptionImageInput) => Promise<ProcessPrescriptionImageOutput>;
 *   ProcessPrescriptionImageInput: z.infer<typeof ProcessPrescriptionImageInputSchema>;
 *   ProcessPrescriptionImageOutput: z.infer<typeof ProcessPrescriptionImageOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the processPrescriptionImage flow.
 */
const ProcessPrescriptionImageInputSchema = z.object({
  image: z
    .string()
    .describe(
      "The prescription image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

/**
 * Output schema for the processPrescriptionImage flow.
 */
const ProcessPrescriptionImageOutputSchema = z.object({
  medicines: z
    .array(
      z.object({
        name: z.string().describe('The name of the medicine.'),
        dosage: z.string().describe('The dosage of the medicine.'),
        frequency: z.string().describe('The frequency of the medicine.'),
      })
    )
    .describe('An array of medicines extracted from the prescription.'),
});

export type ProcessPrescriptionImageInput = z.infer<
  typeof ProcessPrescriptionImageInputSchema
>;
export type ProcessPrescriptionImageOutput = z.infer<
  typeof ProcessPrescriptionImageOutputSchema
>;

/**
 * Processes the prescription image and extracts medication details.
 *
 * @param input - The input object containing the prescription image.
 * @returns A promise that resolves to the extracted medication details.
 */
export async function processPrescriptionImage(
  input: ProcessPrescriptionImageInput
): Promise<ProcessPrescriptionImageOutput> {
  return prescriptionOcrFlow(input);
}

const prescriptionOcrPrompt = ai.definePrompt({
  name: 'prescriptionOcrPrompt',
  input: {schema: ProcessPrescriptionImageInputSchema},
  output: {schema: ProcessPrescriptionImageOutputSchema},
  prompt: `Extract the medicine names, dosages, and frequencies from the prescription image.

   Image: {{media url=image}}
   Return the information as a structured JSON object.
  `,
});

/**
 * Genkit flow for extracting data from a prescription image using OCR.
 */
const prescriptionOcrFlow = ai.defineFlow(
  {
    name: 'prescriptionOcrFlow',
    inputSchema: ProcessPrescriptionImageInputSchema,
    outputSchema: ProcessPrescriptionImageOutputSchema,
  },
  async input => {
    const {output} = await prescriptionOcrPrompt(input);
    return output!;
  }
);
