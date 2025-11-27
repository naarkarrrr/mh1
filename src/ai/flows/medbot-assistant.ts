'use server';

/**
 * @fileOverview A MedBot assistant AI agent. This agent allows patients to ask questions about their health conditions and medications.
 *
 * - medBotAssistant - A function that handles patient queries and provides information and support.
 * - MedBotAssistantInput - The input type for the medBotAssistant function.
 * - MedBotAssistantOutput - The return type for the medBotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedBotAssistantInputSchema = z.object({
  query: z.string().describe('The question or request from the patient.'),
  patientEHR: z.object({
      allergies: z.array(z.string()).optional().describe('List of known allergies.'),
      chronic_conditions: z.array(z.string()).optional().describe('List of chronic conditions like diabetes, hypertension.'),
      prescriptions: z.array(z.object({
        drug_name: z.string(),
        dosage: z.string(),
        frequency: z.string(),
      })).optional().describe('List of current prescriptions.')
    }).optional().describe('A summary of the patient\'s Electronic Health Record.')
});
export type MedBotAssistantInput = z.infer<typeof MedBotAssistantInputSchema>;

const MedBotAssistantOutputSchema = z.object({
  response: z.string().describe('The MedBot response to the patient query.'),
});
export type MedBotAssistantOutput = z.infer<typeof MedBotAssistantOutputSchema>;

export async function medBotAssistant(input: MedBotAssistantInput): Promise<MedBotAssistantOutput> {
  return medBotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medBotAssistantPrompt',
  input: {schema: MedBotAssistantInputSchema},
  output: {schema: MedBotAssistantOutputSchema},
  prompt: `You are a MedBot assistant providing information and support to patients.

  Respond to the patient's query with accurate and helpful information. Your tone should be empathetic and clear.

  If available, use the patient's EHR data to provide personalized and safe responses.
  Patient's Chronic Conditions: {{#each patientEHR.chronic_conditions}}{{{this}}}{{/each}}
  Patient's Allergies: {{#each patientEHR.allergies}}{{{this}}}{{/each}}
  Patient's Prescriptions: {{#each patientEHR.prescriptions}}{{this.drug_name}} ({{this.dosage}}, {{this.frequency}}){{/each}}

  Patient Query: {{{query}}}

  Provide a helpful response. Do not diagnose, but you can provide information based on the data you have. If asked for medical advice, gently decline and advise consulting a doctor.
  `,
});

const medBotAssistantFlow = ai.defineFlow(
  {
    name: 'medBotAssistantFlow',
    inputSchema: MedBotAssistantInputSchema,
    outputSchema: MedBotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
