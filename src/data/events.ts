import type { PerformanceEvent, AIEventScore } from '@/types';

const positiveCategories = [
  'Innovation', 'Cost Reduction', 'Crisis Handling', 'Customer Appreciation',
  'Process Improvement', 'Safety Contribution', 'Revenue Improvement', 'Knowledge Sharing',
  'Digital Transformation', 'Vendor Management', 'Quality Enhancement', 'Team Leadership',
];
const negativeCategories = [
  'Safety Violation', 'Delayed Delivery', 'Customer Complaint', 'Escalation',
  'Compliance Issue', 'Poor Coordination', 'Budget Overrun', 'Quality Failure',
];

const positiveTitles = [
  'Successfully led digital transformation initiative for refinery process monitoring',
  'Reduced procurement costs by 18% through strategic vendor renegotiation',
  'Handled major pipeline shutdown crisis preventing ₹12 Cr loss',
  'Received HPCL Excellence Award for outstanding customer service delivery',
  'Implemented automated quality testing reducing lab time by 40%',
  'Achieved zero LTI record for Q3 across Mumbai Refinery operations',
  'Secured ₹45 Cr revenue through new retail outlet expansion in Tier-2 cities',
  'Delivered HPCL Digital Fuel Card platform ahead of schedule, 2 weeks early',
  'Introduced AI-based inventory forecasting reducing stockouts by 65%',
  'Trained 120+ employees on safety protocols exceeding compliance targets',
  'Negotiated favorable crude oil hedging saving ₹8.5 Cr in quarterly costs',
  'Launched customer feedback platform improving NPS from 52 to 78',
  'Led cross-departmental task force resolving inter-refinery coordination issues',
  'Implemented SAP optimization reducing month-end closing time from 5 to 2 days',
  'Developed biofuel blend testing protocol adopted as HPCL standard',
];
const negativeTitles = [
  'Safety protocol violation at storage facility - investigation ongoing',
  'Critical project milestone delayed by 3 weeks due to coordination failures',
  'Customer complaint escalation - bulk fuel delivery to airport missed SLA',
  'Escalation from regional head on unresolved retail outlet disputes',
  'Compliance audit finding - mandatory HSE training not completed on time',
  'Poor inter-team coordination caused supply chain disruption for 48 hours',
  'Budget overrun of 22% on infrastructure upgrade project without prior approval',
  'Quality control failure - substandard batch released causing customer returns',
];

const departments = ['dept-01', 'dept-02', 'dept-03', 'dept-04', 'dept-05'];
const employeeIds = ['usr-emp-001', 'usr-ro-001', 'usr-rev-001'];

function seeded(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function makeAIScore(index: number, isPositive: boolean): AIEventScore {
  const s = (o: number) => seeded(index * 7 + o);
  const base = isPositive ? 0.55 : 0.2;
  return {
    ownership: Math.round((base + s(1) * 0.45) * 10) / 10,
    leadership: Math.round((base + s(2) * 0.45) * 10) / 10,
    initiative: Math.round((base + s(3) * 0.45) * 10) / 10,
    innovation: Math.round((base + s(4) * 0.45) * 10) / 10,
    teamwork: Math.round((base + s(5) * 0.45) * 10) / 10,
    problemSolving: Math.round((base + s(6) * 0.45) * 10) / 10,
    customerFocus: Math.round((base + s(7) * 0.45) * 10) / 10,
    suggestedImpactScore: isPositive ? Math.round(60 + s(8) * 40) : Math.round(20 + s(8) * 30),
    suggestedRatingInfluence: isPositive ? Math.round(s(9) * 8 + 2) : -Math.round(s(9) * 5 + 1),
    confidence: Math.round(75 + s(10) * 20),
    sentiment: isPositive ? (s(11) > 0.5 ? 'very_positive' : 'positive') : (s(11) > 0.5 ? 'negative' : 'very_negative'),
    sentimentScore: isPositive ? Math.round(60 + s(12) * 40) : Math.round(s(12) * 40),
    autoTags: isPositive
      ? ['Initiative', 'Leadership', 'Proactive'].slice(0, Math.floor(s(13) * 3) + 1)
      : ['Compliance', 'Risk', 'Improvement Area'].slice(0, Math.floor(s(13) * 3) + 1),
    explanation: isPositive
      ? 'Strong ownership and initiative demonstrated. High alignment with HPCL strategic goals.'
      : 'Critical gap in compliance and coordination. Immediate corrective action recommended.',
  };
}

function makeEvent(index: number, isPositive: boolean): PerformanceEvent {
  const s = (o: number) => seeded(index * 13 + o);
  const type = isPositive ? 'positive' : 'negative';
  const titles = isPositive ? positiveTitles : negativeTitles;
  const cats = isPositive ? positiveCategories : negativeCategories;
  const levels = ['low', 'medium', 'high', 'critical'] as const;
  const statuses = ['approved', 'approved', 'approved', 'under_review', 'submitted'] as const;
  const empIndex = Math.floor(s(1) * 50);
  const empId = `usr-emp-${String(empIndex + 1).padStart(3, '0')}`;
  const empName = `Employee ${empIndex + 1}`;
  const month = Math.floor(s(4) * 12) + 1;
  const day = Math.floor(s(5) * 28) + 1;

  return {
    id: `evt-${type.slice(0, 3)}-${String(index).padStart(4, '0')}`,
    type,
    title: titles[Math.floor(s(2) * titles.length)],
    description: isPositive
      ? `This achievement demonstrates significant contribution to HPCL's operational excellence goals. The initiative was carried out with strong collaboration and resulted in measurable business impact.`
      : `This incident highlighted a gap in process adherence and coordination. A corrective action plan has been initiated with timeline for resolution.`,
    date: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    createdAt: `2024-${String(month).padStart(2, '0')}-${String(Math.min(day + 1, 28)).padStart(2, '0')}T09:30:00Z`,
    submittedBy: empId,
    submittedByName: empName,
    employeeId: empId,
    employeeName: empName,
    departmentId: departments[Math.floor(s(6) * departments.length)],
    impactCategory: cats[Math.floor(s(7) * cats.length)],
    impactLevel: levels[Math.floor(s(8) * 4)],
    departmentAffected: 'Multiple departments',
    businessValue: isPositive ? `₹${Math.floor(s(9) * 50 + 2)} Crore` : `₹${Math.floor(s(9) * 5 + 0.5)} Crore loss averted`,
    stakeholderIds: ['usr-ro-001', 'usr-ic-001'],
    evidenceIds: [`ev-${String(index).padStart(4, '0')}`],
    status: statuses[Math.floor(s(10) * statuses.length)],
    aiScore: makeAIScore(index, isPositive),
    tags: isPositive ? ['High Impact', 'Strategic'] : ['Needs Attention'],
  };
}

// 1000 positive + 300 negative events
export const positiveEvents: PerformanceEvent[] = Array.from({ length: 1000 }, (_, i) => makeEvent(i, true));
export const negativeEvents: PerformanceEvent[] = Array.from({ length: 300 }, (_, i) => makeEvent(i + 1000, false));

// Specific events for demo user (Arjun Sharma - usr-emp-001)
export const arjunEvents: PerformanceEvent[] = [
  {
    id: 'evt-pos-arjun-001',
    type: 'positive',
    title: 'Delivered HPCL MeritSync Platform — Digital HR Transformation',
    description: 'Led end-to-end development of AI-powered performance management system replacing legacy paper-based appraisals. System adopted by 500+ employees across 20 departments.',
    date: '2024-09-15',
    createdAt: '2024-09-16T09:00:00Z',
    submittedBy: 'usr-emp-001',
    submittedByName: 'Arjun Sharma',
    employeeId: 'usr-emp-001',
    employeeName: 'Arjun Sharma',
    departmentId: 'dept-03',
    impactCategory: 'Digital Transformation',
    impactLevel: 'critical',
    departmentAffected: 'All Departments',
    businessValue: '₹3.2 Crore annual savings in HR processes',
    stakeholderIds: ['usr-ro-001', 'usr-ic-001', 'usr-rev-001'],
    evidenceIds: ['ev-arjun-001', 'ev-arjun-002'],
    status: 'approved',
    aiScore: {
      ownership: 0.92, leadership: 0.88, initiative: 0.95, innovation: 0.96,
      teamwork: 0.84, problemSolving: 0.90, customerFocus: 0.87,
      suggestedImpactScore: 95, suggestedRatingInfluence: 9, confidence: 94,
      sentiment: 'very_positive', sentimentScore: 96,
      autoTags: ['Innovation', 'Leadership', 'Digital', 'Strategic Impact'],
      explanation: 'Exceptional achievement demonstrating high initiative, innovation and cross-departmental leadership. Direct strategic impact on HPCL digital transformation goals.',
    },
    tags: ['Critical Impact', 'Innovation Award', 'Strategic'],
  },
  {
    id: 'evt-pos-arjun-002',
    type: 'positive',
    title: 'SAP S/4HANA Integration — Zero Downtime Migration',
    description: 'Orchestrated seamless migration of HPCL financial systems to SAP S/4HANA with zero downtime, ahead of schedule. Managed 12-member cross-functional team.',
    date: '2024-06-20',
    createdAt: '2024-06-21T10:00:00Z',
    submittedBy: 'usr-emp-001',
    submittedByName: 'Arjun Sharma',
    employeeId: 'usr-emp-001',
    employeeName: 'Arjun Sharma',
    departmentId: 'dept-03',
    impactCategory: 'Process Improvement',
    impactLevel: 'high',
    departmentAffected: 'Finance & Accounts, IT',
    businessValue: '₹1.8 Crore process efficiency gains',
    stakeholderIds: ['usr-ro-001', 'usr-ic-001'],
    evidenceIds: ['ev-arjun-003'],
    status: 'approved',
    aiScore: {
      ownership: 0.90, leadership: 0.85, initiative: 0.88, innovation: 0.82,
      teamwork: 0.91, problemSolving: 0.89, customerFocus: 0.80,
      suggestedImpactScore: 88, suggestedRatingInfluence: 7, confidence: 91,
      sentiment: 'very_positive', sentimentScore: 92,
      autoTags: ['Leadership', 'Technical Excellence', 'Delivery'],
      explanation: 'Excellent project delivery with strong team leadership and risk management.',
    },
    tags: ['High Impact', 'Technical Excellence'],
  },
  {
    id: 'evt-pos-arjun-003',
    type: 'positive',
    title: 'Cybersecurity Incident Response — Prevented Major Data Breach',
    description: 'Detected and neutralized sophisticated phishing attack targeting HPCL financial data. Quick response prevented potential breach of 45,000+ customer records.',
    date: '2024-03-08',
    createdAt: '2024-03-09T08:30:00Z',
    submittedBy: 'usr-emp-001',
    submittedByName: 'Arjun Sharma',
    employeeId: 'usr-emp-001',
    employeeName: 'Arjun Sharma',
    departmentId: 'dept-03',
    impactCategory: 'Crisis Handling',
    impactLevel: 'critical',
    departmentAffected: 'All Departments',
    businessValue: 'Risk mitigation of ₹25+ Crore potential loss',
    stakeholderIds: ['usr-ro-001', 'usr-rev-001'],
    evidenceIds: ['ev-arjun-004'],
    status: 'approved',
    aiScore: {
      ownership: 0.96, leadership: 0.92, initiative: 0.94, innovation: 0.78,
      teamwork: 0.88, problemSolving: 0.97, customerFocus: 0.85,
      suggestedImpactScore: 96, suggestedRatingInfluence: 8, confidence: 97,
      sentiment: 'very_positive', sentimentScore: 98,
      autoTags: ['Crisis Response', 'Risk Management', 'Ownership'],
      explanation: 'Outstanding crisis handling with extremely high problem-solving and ownership scores.',
    },
    tags: ['Critical', 'Crisis Handling', 'Commendation'],
  },
  {
    id: 'evt-neg-arjun-001',
    type: 'negative',
    title: 'Project Kickoff Delayed — Resource Planning Oversight',
    description: 'Digital fuel card project kickoff was delayed by 12 days due to inadequate resource planning and vendor coordination. Corrective measures implemented subsequently.',
    date: '2024-01-25',
    createdAt: '2024-01-26T11:00:00Z',
    submittedBy: 'usr-ro-001',
    submittedByName: 'Vikram Nair',
    employeeId: 'usr-emp-001',
    employeeName: 'Arjun Sharma',
    departmentId: 'dept-03',
    impactCategory: 'Delayed Delivery',
    impactLevel: 'medium',
    departmentAffected: 'IT, Marketing',
    businessValue: '12-day delay impacting ₹0.4 Crore quarterly revenue target',
    stakeholderIds: ['usr-ro-001'],
    evidenceIds: ['ev-arjun-005'],
    status: 'approved',
    aiScore: {
      ownership: 0.45, leadership: 0.50, initiative: 0.38, innovation: 0.42,
      teamwork: 0.48, problemSolving: 0.52, customerFocus: 0.40,
      suggestedImpactScore: 30, suggestedRatingInfluence: -3, confidence: 85,
      sentiment: 'negative', sentimentScore: 30,
      autoTags: ['Delay', 'Resource Planning', 'Corrective Action'],
      explanation: 'Medium-severity incident. Corrective action taken. Limited long-term impact expected.',
    },
    tags: ['Needs Improvement', 'Resolved'],
  },
];

export const allEvents: PerformanceEvent[] = [...arjunEvents, ...positiveEvents.slice(0, 200), ...negativeEvents.slice(0, 60)];
