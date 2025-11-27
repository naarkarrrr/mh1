'use server';

/**
 * @fileOverview A flow to proactively send alerts to high-risk patients based on environmental conditions.
 *
 * - proactiveAlertsForHighRiskPatients - A function that sends proactive health advisories to patients based on AQI and weather data.
 * - ProactiveAlertsInput - The input type for the proactiveAlertsForHighRiskPatients function.
 * - ProactiveAlertsOutput - The return type for the proactiveAlertsForHighRiskPatients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveAlertsInputSchema = z.object({
  patientId: z.string().describe('The unique identifier for the patient (patient_id).'),
  aqi: z.number().describe('The Air Quality Index value.'),
  weatherCondition: z.string().describe('The current weather condition.'),
  patientEHR: z.object({
    allergies: z.array(z.string()).optional().describe('List of known allergies.'),
    chronic_conditions: z.array(z.string()).optional().describe('List of chronic conditions like diabetes, hypertension.'),
  }).describe('A summary of the patient\'s Electronic Health Record.'),
});
export type ProactiveAlertsInput = z.infer<typeof ProactiveAlertsInputSchema>;

const ProactiveAlertsOutputSchema = z.object({
  alertMessage: z.string().describe('The generated alert message for the patient.'),
});
export type ProactiveAlertsOutput = z.infer<typeof ProactiveAlertsOutputSchema>;

export async function proactiveAlertsForHighRiskPatients(
  input: ProactiveAlertsInput
): Promise<ProactiveAlertsOutput> {
  return proactiveAlertsFlow(input);
}

const proactiveAlertsPrompt = ai.definePrompt({
  name: 'proactiveAlertsPrompt',
  input: {schema: ProactiveAlertsInputSchema},
  output: {schema: ProactiveAlertsOutputSchema},
  prompt: `You are a healthcare assistant that sends alerts to patients based on their health records, air quality index (AQI), and weather conditions.

  Patient Chronic Conditions: {{#each patientEHR.chronic_conditions}}{{{this}}}{{/each}}
  Patient Allergies: {{#each patientEHR.allergies}}{{{this}}}{{/each}}
  Current AQI: {{{aqi}}}
  Current weather condition: {{{weatherCondition}}}

  Generate a personalized alert message for the patient, considering their health conditions and the environmental risks. Make sure the alert is concise and actionable.
  `,
});

const proactiveAlertsFlow = ai.defineFlow(
  {
    name: 'proactiveAlertsFlow',
    inputSchema: ProactiveAlertsInputSchema,
    outputSchema: ProactiveAlertsOutputSchema,
  },
  async input => {
    const {output} = await proactiveAlertsPrompt(input);
    return output!;
  }
);
