'use server';

/**
 * @fileOverview Predicts potential inventory shortages for hospital administrators.
 *
 * - predictInventoryShortage - Predicts inventory shortages based on historical usage logs.
 * - PredictInventoryShortageInput - The input type for the predictInventoryShortage function.
 * - PredictInventoryShortageOutput - The return type for the predictInventoryShortage function.
 */

import {ai} from '@/ai/genkit';
import {z}_ from 'zod';
import {z} from 'genkit';

const PredictInventoryShortageInputSchema = z.object({
  itemId: z.string().describe('The unique ID of the inventory item (item_id).'),
  itemName: z.string().describe('The name of the item.'),
  usageLogs: z.array(
    z.object({
      timestamp: z.string().describe('The timestamp of the usage log entry (YYYY-MM-DD HH:MM:SS).'),
      quantityUsed: z.number().describe('The quantity of the item used.'),
    })
  ).describe('Historical usage logs for the item.'),
  leadTimeDays: z.number().describe('The lead time in days for reordering the item from the supplier.'),
  currentStockLevel: z.number().describe('The current available quantity of the item (quantity_available).'),
  minRequired: z.number().describe('The minimum required stock level for this item (min_required).'),
  reorderLevel: z.number().describe('The stock level at which a reorder should be triggered (reorder_level).'),
});

export type PredictInventoryShortageInput = z.infer<typeof PredictInventoryShortageInputSchema>;

const PredictInventoryShortageOutputSchema = z.object({
  isShortagePredicted: z.boolean().describe('Whether a shortage is predicted within the lead time.'),
  predictedShortageDate: z.string().optional().describe('The predicted date (YYYY-MM-DD) of the stockout, if a shortage is predicted.'),
  recommendedReorderQuantity: z.number().describe('The recommended quantity to reorder to avoid the shortage.'),
  confidenceLevel: z.number().min(0).max(1).describe('The confidence level of the prediction (0 to 1).'),
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
  prompt: `You are an AI assistant for a hospital inventory management system. Your task is to predict potential stock shortages.

Analyze the provided data for the inventory item to determine if its stock will fall below the minimum required level within the procurement lead time.

- Item ID: {{{itemId}}}
- Item Name: {{{itemName}}}
- Current Stock Level: {{{currentStockLevel}}}
- Minimum Required Level: {{{minRequired}}}
- Reorder Level: {{{reorderLevel}}}
- Supplier Lead Time: {{{leadTimeDays}}} days
- Historical Usage Logs:
{{#each usageLogs}}
  - Date: {{{timestamp}}}, Quantity Used: {{{quantityUsed}}}
{{/each}}

Based on the usage trend, calculate the daily consumption rate.
Project the stock level over the next {{{leadTimeDays}}} days.
Predict if a shortage (stock falling below {{{minRequired}}}) will occur.
If a shortage is predicted, estimate the date.
Calculate a recommended reorder quantity to bring stock back to a safe level.
Provide a confidence score for your prediction.

Respond ONLY with a valid JSON object matching the prescribed output schema.
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
