# 🚀 VitalLens — AI + Blockchain Healthcare Command System

### *See the future of patient care before it happens.*

VitalLens is a **fully software-based, AI-driven, blockchain-secured healthcare management system** that transforms hospitals from **reactive** to **proactive**.

It predicts patient surges, optimizes hospital resources, prevents overcrowding, secures medical records using blockchain, automates staff schedules, performs OCR on prescriptions, supports emergency SOS, and empowers patients with proactive health alerts and an AI MedBot.

VitalLens is built for **Hospitals, Government Health Departments, Emergency Services, Insurers, Telemedicine Platforms**, and **Patients**.

---

## 📌 **Table of Contents**

* [Overview](#-overview)
* [Features](#-features)
* [System Architecture](#-system-architecture)
* [Tech Stack](#-tech-stack)
* [Database Schema](#-database-schema)
* [AI Integration](#-ai--analytics-integration-layer)
* [Installation](#-installation)
* [Usage](#-usage)
* [Team](#-team--hypothesisheuristics)
* [License](#-license)

---

# 🧠 **Overview**

India’s hospitals suffer from unpredictable surges due to:
✔ Festivals
✔ Pollution waves
✔ Seasonal diseases
✔ Local outbreaks
✔ Emergencies

These create:

* Overcrowding
* Staff fatigue
* Resource shortage
* Slow emergency response
* Prescription misinterpretation

**VitalLens solves all of the above using AI + Blockchain.**

It predicts hospital inflow **before it happens**, optimizes resources using AI agents, provides personalized health alerts, and secures every medical record on blockchain.

---

# ✨ **Features**

### 🔮 **1. Predictive Surge Intelligence**
Predicts patient inflow using hospital data + AQI + weather + public events. Helps hospitals prepare beds, doctors, ventilators, and medicine stock **days in advance**.

### 🔐 **2. Blockchain EHR Manager**
All medical records get a **tamper-proof blockchain hash**. Patients control access permissions.

### 📜 **3. OCR Prescription Scanner + NLP**
Scans handwritten prescriptions using OCR → converts to structured digital format. Detects risky drug combinations, allergies, and dosage conflicts.

### 🧠 **4. Agentic Resource Planner**
AI allocates staff, beds, equipment, ventilators, and schedules shifts. Integrates with Google Calendar for automated notifications.

### 📡 **5. Proactive Health Advisory Agent**
Monitors AQI, weather, disease outbreaks. Sends preventive alerts like: *“AQI 320 detected — avoid outdoor travel.”*

### 🤖 **6. MedBot Assistant**
24/7 Generative AI assistant offering advice, appointment booking, EHR summaries, and medicine reminders, backed by blockchain-verified data.

### 🚑 **7. Emergency SOS System**
One-tap encrypted location sharing with hospitals + ambulance dispatch + ETA tracking. All events logged immutably.

### 📦 **8. Inventory AI + Supply Chain Blockchain**
Tracks medicine and equipment usage. Predicts shortages and triggers automated reorder alerts.

### 🗺️ **9. Citywide Hotspot Dashboard**
Heatmaps showing predicted outbreak zones and patient surge hotspots. Helps public health authorities deploy resources.

---

# 🏗️ **System Architecture**

VitalLens is designed with a scalable, enterprise-grade architecture composed of 5 core layers.

### **MODULE A — Patient & Clinical System**
1.  **Patient Registration:** Manages patient demographics, contact information, and medical history.
2.  **OPD / IPD Transaction System:** Handles outpatient and inpatient encounters.
3.  **Clinical Documentation:** Records symptoms, diagnoses (provisional and final), and treatment notes.
4.  **Vitals Monitoring:** Captures and tracks patient vital signs over time.
5.  **Diagnostics & Lab Management:** Manages lab test orders and results.
6.  **Prescription & Medication Orders:** Manages drug prescriptions, dosages, and administration routes.

### **MODULE B — Operational & Resource System**
7.  **Bed Management:** Tracks bed status (occupied/available) across different wards.
8.  **Ward / ICU Management:** Oversees operations within specific hospital wards.
9.  **Staff & Scheduling:** Manages staff roles, specializations, and shifts.
10. **Equipment Tracking:** Monitors the availability and location of medical equipment.
11. **OT (Operation Theatre) Scheduling:** Manages the booking and scheduling of operating theatres.
12. **Inventory & Pharmacy:** Tracks stock levels of medicines and supplies.

### **MODULE C — Financial & Administrative**
13. **Billing & Insurance:** Manages patient billing and insurance claims (Optional for prototype).

### **MODULE D — AI & Analytics Integration Layer**
14. **Forecasting Engine:** Predicts patient admissions, bed demand, and inventory needs.
15. **Recommendation Engine:** Suggests medications and diagnostic tests based on patient data.
16. **Agentic AI:** Automates reordering, staff scheduling, and critical alerts.

### **MODULE E — Integration Layer**
17. **FHIR/HL7 Compliant API:** Ensures future interoperability with other hospital systems.
18. **Supplier API Connectors:** Integrates with medical suppliers for automated procurement.
19. **IoT Device Connectors:** Allows for future integration with devices for automatic vitals capture.

This structure ensures VitalLens is future-ready and can integrate seamlessly with larger health ecosystems like Apollo, Manipal, NHS, insurance companies, and government health platforms.

---

# 🧰 **Tech Stack**

### **Frontend**
*   Next.js (React)
*   Tailwind CSS
*   Recharts

### **Backend & AI**
*   **Genkit (Google AI):** Powers all generative AI features, including flows, prompts, and tool use.
*   **Next.js Server Actions:** For backend logic and communication with AI services.

### **Database**
*   **Firestore:** Used for its scalability and real-time capabilities to store application data.

### **Deployment**
*   **Firebase App Hosting:** For continuous deployment and scalable backend infrastructure.

---

# 🗄️ **Database Schema**

The system is built on an enterprise-level schema designed for real-world hospital operations.

### **A. PATIENT REGISTRATION**
| Field | Description |
| :--- | :--- |
| `patient_id` (PK) | Unique ID |
| `first_name`, `last_name` | - |
| `age`, `dob` | - |
| `gender` | - |
| `phone`, `email` | - |
| `address` | - |
| `emergency_contact`| - |
| `allergies` | - |
| `chronic_conditions`| e.g., diabetes, hypertension |

### **B. ENCOUNTERS / VISITS**
| Field | Description |
| :--- | :--- |
| `encounter_id` (PK) | Unique visit ID |
| `patient_id` (FK) | Links to Patient |
| `doctor_id` | Assigned doctor |
| `department` | e.g., Orthopedics, Cardiology |
| `encounter_type` | OPD / IPD / ER |
| `date_time_in`, `date_time_out`| - |
| `reason_for_visit`| Summary of symptoms |

### **C. VITALS**
| Field | Description |
| :--- | :--- |
| `vitals_id` (PK) | - |
| `encounter_id` (FK) | Links to Encounter |
| `temperature`, `heart_rate`, `systolic_bp`, `diastolic_bp`, `respiratory_rate`, `oxygen_saturation`, `weight` | - |

### **D. SYMPTOMS & DIAGNOSES**
| Field | Description |
| :--- | :--- |
| `diagnosis_id` (PK) | - |
| `encounter_id` (FK) | - |
| `symptoms` | Text description |
| `provisional_diagnosis`| Initial diagnosis |
| `final_diagnosis` | Confirmed diagnosis |
| `icd10_code` | International standard code |

### **E. LAB RESULTS**
| Field | Description |
| :--- | :--- |
| `lab_test_id` (PK) | - |
| `encounter_id` (FK) | - |
| `test_name` | e.g., CBC, CRP |
| `test_category` | Blood, Urine, Imaging |
| `result_value`, `result_unit` | - |
| `reference_range`, `result_flag`| e.g., High, Low, Normal |

### **F. PRESCRIPTIONS**
| Field | Description |
| :--- | :--- |
| `prescription_id` (PK) | - |
| `encounter_id` (FK) | - |
| `drug_name`, `dosage`, `frequency`, `duration`, `route` | - |

### **G. BED MANAGEMENT**
| Field | Description |
| :--- | :--- |
| `bed_id` (PK) | - |
| `ward` | e.g., General, ICU |
| `bed_type` | ICU, Ventilator, Normal |
| `status` | Occupied, Available |
| `patient_id` (FK) | If occupied |
| `admitted_at`, `discharged_at` | - |

### **H. STAFF & SCHEDULING**
| Field | Description |
| :--- | :--- |
| `staff_id` (PK) | - |
| `name`, `role`, `specialization`| e.g., Doctor, Nurse |
| `shift_start`, `shift_end` | - |
| `duty_status` | On, Off, Leave |

### **I. INVENTORY & SUPPLIER DATA**
| Field | Description |
| :--- | :--- |
| `item_id` (PK) | - |
| `item_name` | e.g., Oxygen Cylinders |
| `quantity_available`| - |
| `min_required`, `reorder_level`| - |
| `supplier_id`, `lead_time_days`| - |

---

# 🤖 **AI & Analytics Integration Layer**

The core of VitalLens's proactive capability lies in its AI layer.

*   **Data Flow for AI:**
    1.  Patient registers → `patient_id` created.
    2.  New visit → `Encounters` table populated.
    3.  Vitals, diagnosis, labs, and prescriptions are recorded in their respective tables.
    4.  Patient admission updates the `Bed Management` table.
    5.  Inventory consumption is tracked.
    6.  **Agentic AI** runs daily to forecast demand spikes, using historical data from all tables.
    7.  AI can trigger auto-orders from suppliers via integrated APIs.

*   **Future Integration (FHIR/HL7):**
    To ensure VitalLens can integrate with any modern hospital system, it will expose FHIR-compliant APIs for key resources like `/Patient`, `/Observation`, `/MedicationRequest`, and `/Encounter`. This allows for seamless data exchange with government health systems, third-party apps, and insurance platforms.

---

# ⚙️ **Installation**

```bash
git clone https://github.com/<your-repo>/VitalLens.git
cd VitalLens

# Install dependencies
npm install

# Run the development server
npm run dev
```
You will also need to add your Firebase project configuration to a `.env.local` file.

---

# ▶️ **Usage**

Start the frontend:
```bash
npm run dev
```

Login with one of the predefined roles:
*   Patient
*   Doctor
*   Admin

Explore the dashboards, upload prescriptions, test the SOS system, and view AI-driven predictions.

---

# 👥 **Team — HypothesisHeuristics**

*   **Neelay K. Joshi** — Team Lead
*   **Dhruv N. Save**
*   **Shreedhar B. Khorate**
*   **Shivam V. Narkar**

---

# 📜 **License**

MIT License
