'use server';

/**
 * @fileOverview Extracts structured data from a prescription image using OCR.
 *
 * This flow is designed to align with an enterprise-grade Hospital Management System.
 * It takes a prescription image and outputs structured data according to a predefined schema,
 * including fields like drug name, dosage, frequency, duration, and route.
 *
 * @exports {
 *   processPrescriptionImage: (input: ProcessPrescriptionImageInput) => Promise<ProcessPrescriptionImageOutput>;
 *   ProcessPrescriptionImageInput: The input type for the flow.
 *   ProcessPrescriptionImageOutput: The output type for the flow.
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
      "The prescription image as a data URI. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

/**
 * Output schema for the processPrescriptionImage flow, designed for enterprise HMS.
 */
const ProcessPrescriptionImageOutputSchema = z.object({
  prescriptions: z
    .array(
      z.object({
        drug_name: z.string().describe('The name of the medication.'),
        dosage: z.string().describe('The prescribed dosage (e.g., "500 mg", "1 tablet").'),
        frequency: z.string().describe('How often to take the medication (e.g., "2x/day", "Once daily").'),
        duration: z.string().optional().describe('For how long the medication should be taken (e.g., "5 days", "1 month").'),
        route: z.string().optional().describe('The administration route (e.g., "Oral", "IV", "Topical").'),
      })
    )
    .describe('An array of structured prescription objects extracted from the image.'),
});

export type ProcessPrescriptionImageInput = z.infer<
  typeof ProcessPrescriptionImageInputSchema
>;
export type ProcessPrescriptionImageOutput = z.infer<
  typeof ProcessPrescriptionImageOutputSchema
>;

/**
 * Processes the prescription image and extracts structured medication details.
 *
 * @param input - The input object containing the prescription image as a data URI.
 * @returns A promise that resolves to the structured prescription data.
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
  prompt: `You are an expert OCR system for medical prescriptions. Analyze the following image and extract all medication details.

   Image: {{media url=image}}

   Extract the following fields for each medication found:
   - drug_name
   - dosage
   - frequency
   - duration (if mentioned)
   - route (if mentioned)

   Return the information as a structured JSON object, following the specified output schema. Be precise and handle variations in handwriting. If a field is not present, omit it.
  `,
});

/**
 * Genkit flow for extracting structured data from a prescription image using OCR.
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
