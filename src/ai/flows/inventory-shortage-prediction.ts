'use server';

/**
 * @fileOverview Predicts potential inventory shortages for hospital administrators.
 *
 * - predictInventoryShortage - Predicts inventory shortages based on historical usage logs.
 * - PredictInventoryShortageInput - The input type for the predictInventoryShortage function.
 * - PredictInventoryShortageOutput - The return type for the predictInventoryShortage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictInventoryShortageInputSchema = z.object({
  hospitalId: z.string().describe('The ID of the hospital.'),
  itemId: z.string().describe('The ID of the item to predict shortages for.'),
  usageLogs: z.array(
    z.object({
      timestamp: z.string().describe('The timestamp of the usage log entry.'),
      quantityUsed: z.number().describe('The quantity of the item used.'),
    })
  ).describe('Historical usage logs for the item.'),
  leadTimeDays: z.number().describe('The lead time in days for reordering the item.'),
  currentStockLevel: z.number().describe('The current stock level of the item.'),
});

export type PredictInventoryShortageInput = z.infer<typeof PredictInventoryShortageInputSchema>;

const PredictInventoryShortageOutputSchema = z.object({
  isShortagePredicted: z.boolean().describe('Whether a shortage is predicted.'),
  predictedShortageDate: z.string().optional().describe('The predicted date of the shortage, if any.'),
  predictedStockLevel: z.number().optional().describe('The predicted stock level at the time of the shortage, if any.'),
  confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
  recommendations: z.string().describe('Recommendations for avoiding the shortage.'),
});

export type PredictInventoryShortageOutput = z.infer<typeof PredictInventoryShortageOutputSchema>;

export async function predictInventoryShortage(
  input: PredictInventoryShortageInput
): Promise<PredictInventoryShortageOutput> {
  return predictInventoryShortageFlow(input);
}

const predictInventoryShortagePrompt = ai.definePrompt({
  name: 'predictInventoryShortagePrompt',
  input: {schema: PredictInventoryShortageInputSchema},
  output: {schema: PredictInventoryShortageOutputSchema},
  prompt: `You are an AI assistant that helps hospital administrators predict potential inventory shortages.

You will receive historical usage logs for an item, the lead time for reordering the item, and the current stock level.

Based on this information, you will predict whether a shortage is likely to occur.

If a shortage is predicted, you will provide the predicted date of the shortage, the predicted stock level at the time of the shortage, and recommendations for avoiding the shortage.

Consider the following information:
Hospital ID: {{{hospitalId}}}
Item ID: {{{itemId}}}
Usage Logs: {{#each usageLogs}}{{{timestamp}}}: {{{quantityUsed}}}\n{{/each}}
Lead Time (Days): {{{leadTimeDays}}}
Current Stock Level: {{{currentStockLevel}}}

Respond in JSON format.

Include a confidenceLevel (0-1) indicating the certainty of the shortage prediction.
`,
});

const predictInventoryShortageFlow = ai.defineFlow(
  {
    name: 'predictInventoryShortageFlow',
    inputSchema: PredictInventoryShortageInputSchema,
    outputSchema: PredictInventoryShortageOutputSchema,
  },
  async input => {
    const {output} = await predictInventoryShortagePrompt(input);
    return output!;
  }
);
