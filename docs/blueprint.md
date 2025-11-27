# **App Name**: VitalLens

## Core Features:

- Predictive Surge Intelligence: API endpoint to upload hospital data, AQI, weather, and public event metadata. A Cloud Function runs a dummy prediction model. Results are stored in Firestore and displayed on an admin dashboard with charts, including a blockchain-hash field for auditability.
- OCR Prescription Scanner + NLP Engine: Users upload a prescription image on /patient/upload-prescription, which is sent to a Cloud Function for OCR processing (placeholder). Medicine names, dosage, and frequency are extracted and stored in Firestore. The system checks for conflicts using a predefined list and returns structured JSON.
- Blockchain EHR Manager: Firestore collection /ehr with patient subcollections including fields for hash, timestamp, accessControl, and data. A Cloud Function generates a blockchain hash for each record, ensuring data integrity and auditability.
- Agentic Resource Planner: Admin panel on /admin/resource-planner where the admin inputs a staff list, bed count, and ventilator count. The cloud function then runs optimization via a dummy agent tool. Output schedules will be stored in Firestore and tentatively linked with the Google Calendar API.
- Proactive Health Advisory Agent: A Cloud Function monitors AQI/weather APIs and sends push notifications to relevant patients using FCM. Alerts are stored in Firestore, and patients can view them on the /patient/alerts UI.
- MedBot Assistant: A chat UI on /patient/medbot that connects to an external LLM API (placeholder). The LLM is used as a tool. It can fetch EHR data based on access rules. It also supports scheduling + reminders using the Calendar API (placeholder).
- Emergency SOS System: A page /patient/sos with a single big emergency button. When pressed, it gets the user's location and sends it to Firestore. A Cloud Function alerts hospital staff with FCM push notifications. Live updates are shown on an /admin/sos-dashboard.

## Style Guidelines:

- Primary color: A calm blue (#5DADE2) reflecting trust and health. This color was selected because blues are typically aligned to applications focusing on medicine or medical insights, but should come across as modern instead of sterile or boring.
- Background color: Light gray (#F0F4F7), providing a clean and professional backdrop.
- Accent color: Soft teal (#45B39D) for CTAs and highlights, complementing the blue and adding a touch of sophistication.
- Body font: 'PT Sans', a humanist sans-serif with a modern, slightly warm feel. Headline font: 'Space Grotesk' to give a tech edge. (sans-serif).
- Code font: 'Source Code Pro' for displaying code snippets. (monospace).
- Use consistent and clear icons throughout the application, following Material Design principles.
- Employ a clean, card-based layout with ample spacing for easy readability and navigation.
- Subtle animations for transitions and loading states to enhance user experience.