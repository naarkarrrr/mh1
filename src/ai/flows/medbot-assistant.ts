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
  ehrData: z.string().optional().describe('The patient EHR data, if available.'),
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

  Respond to the patient's query with accurate and helpful information.

  If available, use the patient's EHR data to provide personalized responses.
  EHR Data: {{{ehrData}}}

  Query: {{{query}}}
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
