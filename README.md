# 🚀 **VitalLens — AI + Blockchain Healthcare Command System**

### *See the future of patient care before it happens.*

VitalLens is a **fully software-based, AI-driven, blockchain-secured healthcare management system** that transforms hospitals from **reactive** to **proactive**.

It predicts patient surges, optimizes hospital resources, prevents overcrowding, secures medical records using blockchain, automates staff schedules, performs OCR on prescriptions, supports emergency SOS, and empowers patients with proactive health alerts and an AI MedBot.

VitalLens is built for **Hospitals, Government Health Departments, Emergency Services, Insurers, Telemedicine Platforms**, and **Patients**.

---

## 📌 **Table of Contents**

* [Overview](#overview)
* [Features](#features)
* [System Architecture](#system-architecture)
* [Tech Stack](#tech-stack)
* [Modules](#modules)
* [Database Schema](#database-schema)
* [AI Services](#ai-services)
* [Blockchain Layer](#blockchain-layer)
* [Installation](#installation)
* [Usage](#usage)
* [Performance Benchmarks](#performance-benchmarks)
* [Team](#team)
* [License](#license)

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

Predicts patient inflow using hospital data + AQI + weather + public events.
Helps hospitals prepare beds, doctors, ventilators, and medicine stock **days in advance**.

---

### 🔐 **2. Blockchain EHR Manager**

All medical records get a **tamper-proof blockchain hash**.
Patients control access permissions.

---

### 📜 **3. OCR Prescription Scanner + NLP**

Scans handwritten prescriptions using OCR → converts to structured digital format.
Detects risky drug combinations, allergies, and dosage conflicts.

---

### 🧠 **4. Agentic Resource Planner**

AI allocates staff, beds, equipment, ventilators, and schedules shifts.
Integrates with Google Calendar for automated notifications.

---

### 📡 **5. Proactive Health Advisory Agent**

Monitors AQI, weather, disease outbreaks.
Sends preventive alerts like:

> “AQI 320 detected — avoid outdoor travel.”

---

### 🤖 **6. MedBot Assistant**

24/7 Generative AI assistant offering:

* Advice
* Appointment booking
* EHR summaries
* Medicine reminders

Backed by blockchain-verified data.

---

### 🚑 **7. Emergency SOS System**

One-tap encrypted location sharing with hospitals + ambulance dispatch + ETA tracking.
All events logged immutably.

---

### 📦 **8. Inventory AI + Supply Chain Blockchain**

Tracks medicine and equipment usage.
Predicts shortages and triggers automated reorder alerts.

---

### 🗺️ **9. Citywide Hotspot Dashboard**

Heatmaps showing predicted outbreak zones and patient surge hotspots.
Helps public health authorities deploy resources.

---

# 🏗️ **System Architecture**

```
Frontend → Backend → AI Engines → Blockchain → Dashboards → Notifications
```

Includes:

* Predictive AI pipelines
* OCR pipelines
* NLP medication risk engines
* Agentic scheduling
* Blockchain hashing
* Aggregation and visualization layers

(Architecture diagram included in repo)

---

# 🧰 **Tech Stack**

### **Frontend**

* React
* Tailwind CSS
* Chart.js
* Map APIs

### **Backend**

* Flask
* Firebase (Auth, Firestore, Storage, FCM)
* Supabase
* Docker
* Google Cloud Platform

### **AI/ML**

* Scikit-learn
* HuggingFace Transformers
* OpenCV
* LangChain
* LangGraph
* Crew AI

### **Blockchain**

* Ethereum (hash-based anchors for EHR, inventory logs, prescriptions)

### **Communication**

* Twilio SMS
* FCM Push Notifications

---

# 🧩 **Modules**

```
/modules
  ├── surge_intelligence/
  ├── ocr_prescription/
  ├── blockchain_ehr/
  ├── agentic_resource_planner/
  ├── proactive_health_agent/
  ├── medbot/
  ├── emergency_sos/
  ├── inventory_ai/
  ├── hotspot_dashboard/
```

---

# 🗄️ **Database Schema (Firestore + Supabase)**

### **Firestore**

```
/users/{userId}
/ehr/{userId}/prescriptions/{id}
/ehr/{userId}/medicalHistory/{id}
/predictions/{hospitalId}
/hospitals/{id}/schedule/{sid}
/alerts/{userId}/{alertId}
/inventory/{hospitalId}/{itemId}
/inventory-alerts/{hospitalId}/{alertId}
/sos/{sosId}
/hotspots/{zoneId}
```

### **Supabase**

* `patients`
* `doctors`
* `visits`
* `ehr_records`
* `inventory`
* `procurement_logs`
* `appointments`

---

# 🤖 **AI Services**

### Predictive Models

* Time series forecasting
* Deep learning event correlation

### OCR + NLP

* OpenCV prescription digitization
* Drug safety analysis

### Agentic Automation

* Staff scheduling
* Resource distribution
* Inventory forecasting

---

# ⛓️ **Blockchain Layer**

VitalLens uses blockchain for:

* EHR hashing
* Prescription hash anchoring
* Inventory audit trails
* Emergency event logs
* Access control verification

Ethereum smart contracts store hashes, not raw medical data.

---

# ⚙️ **Installation**

```bash
git clone https://github.com/<your-repo>/VitalLens.git
cd VitalLens

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Deploy Firebase
firebase deploy
```

Add your environment configs:

* Firebase
* GCP
* Supabase
* Twilio
* Blockchain provider
* LLM API keys

---

# ▶️ **Usage**

Start backend:

```bash
python app.py
```

Start frontend:

```bash
npm start
```

Login with:

* Patient
* Doctor
* Admin

Explore dashboards, upload prescriptions, test SOS system, and run predictions.

---

# 📊 **Performance Benchmarks**

Target KPIs:

* 90% accuracy in surge predictions
* 95% OCR extraction accuracy
* <30 sec SOS dispatch alerts
* 5 second hotspot dashboard refresh
* 99.9% uptime
* Zero data tampering (blockchain verification)

---

# 👥 **Team — HypothesisHeuristics**

* **Neelay K. Joshi** — Team Lead
* **Dhruv N. Save**
* **Shreedhar B. Khorate**
* **Shivam V. Narkar**

---

# 📜 **License**

MIT License
