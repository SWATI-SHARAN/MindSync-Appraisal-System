# MeritSync – Continuous Performance Intelligence & Trust Platform

MeritSync is a production-grade, AI-powered continuous performance intelligence platform built specifically for **HPCL (Hindustan Petroleum Corporation Limited)**. It replaces annual, subjective annual appraisal systems with an objective, evidence-backed, transparent, explainable, and bias-resistant appraisal engine.

## 🚀 Key Features

* **Continuous Performance Index (PI)**: Live performance scores compiled continuously based on weighted metrics: Achievements (40%), Peer Validation (20%), Consistency Reviews (15%), Leadership (10%), L&D Credits (10%), and Integrity (5%).
* **Cryptographic Performance Ledger**: An immutable ledger of all performance actions (events created, validated, peer reviews) signed with SHA-256 hashes to guarantee data auditability.
* **AI Performance Event Analyzer**: Inline NLP tool that extracts competencies (Ownership, Initiative, Teamwork, Innovation), calculates sentiment, suggests ratings influence, and checks for duplication in descriptions.
* **360° Validation Stepper Queue**: Workflow queue for Reporting Officers (RO), Reviewing Officers, and Internal Customers (IC) to sign off or decline event claims.
* **AI Bias & Favoritism Detector**: Detects recency bias, leniency skew, and endorsement favoritism loops.
* **Bell Curve Normalizer**: Allows HR Admins and Reviewing Officers to dynamically visualize target quotas vs. actual ratings and auto-adjust them using verification weighting parameters.
* **SAP Fiori Sync Console**: Force refresh certifications, leaves, and KPI metrics.
* **Appraisal Dossier & PDF Exporter**: Collects all validated achievements, reviews, and manager endorsements into an official printable appraisal report.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
* **Charts**: Recharts
* **State Management**: Zustand
* **Icons**: Lucide React
* **Router**: React Router v6

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** installed (version `20.14.0` or higher is fully compatible).

### 2. Run the Development Server
Open your terminal in the project directory (`E:\COLLEGE PROJECTS\Appraisal System`) and execute:

```bash
# Start Vite development server
npm run dev
```

The application will be served at `http://localhost:3000`.

---

## 🔑 Demo Access Credentials

To test different role dashboards, use the following credentials on the login screen:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Employee** | `emp001@hpcl.in` | `Employee@123` |
| **Reporting Officer** | `ro001@hpcl.in` | `Manager@123` |
| **Reviewing Officer** | `rev001@hpcl.in` | `Reviewer@123` |
| **Internal Customer** | `ic001@hpcl.in` | `Customer@123` |
| **HR Administrator** | `hr001@hpcl.in` | `HRAdmin@123` |
| **Senior Leadership** | `sl001@hpcl.in` | `Leader@123` |

---

## ⚖️ AI Explainability Formula (PI)

The platform evaluates employees based on six core facets to produce a score between `0-100`:

$$\text{PI} = \text{Achievement (40%)} + \text{Stakeholder Validation (20%)} + \text{Consistency (15%)} + \text{Leadership (10%)} + \text{L\&D (10%)} + \text{Integrity (5%)} - \text{Deductions}$$

Each facet is auditable, explainable, and linked directly to records stored on the ledger.
