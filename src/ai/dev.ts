import { config } from 'dotenv';
config();

import '@/ai/flows/inventory-shortage-prediction.ts';
import '@/ai/flows/prescription-ocr.ts';
import '@/ai/flows/medbot-assistant.ts';
import '@/ai/flows/air-quality-alerts.ts';