import type { PIScore, ConsistencyReview, BellCurveEntry, PerformanceRating, BiasFlag } from '@/types';

// ============================================================
// PI SCORE — ARJUN SHARMA (demo employee)
// ============================================================
export const arjunPIScores: PIScore[] = [
  {
    id: 'pi-arjun-2024-12',
    employeeId: 'usr-emp-001',
    period: '2024-12',
    totalScore: 86,
    components: {
      achievementScore: 37,
      stakeholderValidation: 18,
      consistencyScore: 13,
      leadershipBehaviour: 8,
      learningDevelopment: 8,
      integrityScore: 4,
      negativeDeductions: 2,
    },
    ratingPrediction: 1,
    ratingConfidence: 89,
    computedAt: '2024-12-31T23:59:00Z',
    explanation: {
      achievementDetail: '3 high/critical impact events approved with AI confidence 91–97%. Weighted contribution: +37',
      stakeholderDetail: 'All 3 positive events validated by Reporting Officer + Reviewing Officer. IC endorsement on 2 events. Score: +18',
      consistencyDetail: 'Average quarterly consistency score: 4.3/5 across Q1–Q4. Consistent above-average performer.',
      leadershipDetail: 'Leadership tags detected by AI in 3 events. Manager endorsed leadership behavior in Q3 review.',
      learningDetail: 'Completed SAP ABAP Certification + HPCL Leadership Development Programme in 2024. Score: +8',
      integrityDetail: 'Zero integrity violations. Clean audit log. Peer endorsements confirm ethical conduct. Score: +4',
      negativeDetail: '1 medium-impact negative event (project delay). Deduction: -2',
    },
  },
  {
    id: 'pi-arjun-2024-09',
    employeeId: 'usr-emp-001',
    period: '2024-09',
    totalScore: 82,
    components: { achievementScore: 34, stakeholderValidation: 17, consistencyScore: 12, leadershipBehaviour: 8, learningDevelopment: 7, integrityScore: 4, negativeDeductions: 0 },
    ratingPrediction: 1,
    ratingConfidence: 84,
    computedAt: '2024-09-30T23:59:00Z',
    explanation: { achievementDetail: '', stakeholderDetail: '', consistencyDetail: '', leadershipDetail: '', learningDetail: '', integrityDetail: '', negativeDetail: '' },
  },
  {
    id: 'pi-arjun-2024-06',
    employeeId: 'usr-emp-001',
    period: '2024-06',
    totalScore: 78,
    components: { achievementScore: 31, stakeholderValidation: 16, consistencyScore: 12, leadershipBehaviour: 7, learningDevelopment: 7, integrityScore: 4, negativeDeductions: -1 },
    ratingPrediction: 2,
    ratingConfidence: 79,
    computedAt: '2024-06-30T23:59:00Z',
    explanation: { achievementDetail: '', stakeholderDetail: '', consistencyDetail: '', leadershipDetail: '', learningDetail: '', integrityDetail: '', negativeDetail: '' },
  },
  {
    id: 'pi-arjun-2024-03',
    employeeId: 'usr-emp-001',
    period: '2024-03',
    totalScore: 72,
    components: { achievementScore: 28, stakeholderValidation: 15, consistencyScore: 11, leadershipBehaviour: 7, learningDevelopment: 7, integrityScore: 4, negativeDeductions: 0 },
    ratingPrediction: 2,
    ratingConfidence: 76,
    computedAt: '2024-03-31T23:59:00Z',
    explanation: { achievementDetail: '', stakeholderDetail: '', consistencyDetail: '', leadershipDetail: '', learningDetail: '', integrityDetail: '', negativeDetail: '' },
  },
  {
    id: 'pi-arjun-2023-12',
    employeeId: 'usr-emp-001',
    period: '2023-12',
    totalScore: 74,
    components: { achievementScore: 29, stakeholderValidation: 15, consistencyScore: 11, leadershipBehaviour: 7, learningDevelopment: 7, integrityScore: 4, negativeDeductions: -1 },
    ratingPrediction: 2,
    ratingConfidence: 78,
    computedAt: '2023-12-31T23:59:00Z',
    explanation: { achievementDetail: '', stakeholderDetail: '', consistencyDetail: '', leadershipDetail: '', learningDetail: '', integrityDetail: '', negativeDetail: '' },
  },
  {
    id: 'pi-arjun-2023-06',
    employeeId: 'usr-emp-001',
    period: '2023-06',
    totalScore: 68,
    components: { achievementScore: 25, stakeholderValidation: 14, consistencyScore: 11, leadershipBehaviour: 6, learningDevelopment: 7, integrityScore: 4, negativeDeductions: -1 },
    ratingPrediction: 2,
    ratingConfidence: 71,
    computedAt: '2023-06-30T23:59:00Z',
    explanation: { achievementDetail: '', stakeholderDetail: '', consistencyDetail: '', leadershipDetail: '', learningDetail: '', integrityDetail: '', negativeDetail: '' },
  },
];

// ============================================================
// QUARTERLY CONSISTENCY REVIEWS
// ============================================================
export const arjunConsistencyReviews: ConsistencyReview[] = [
  {
    id: 'cr-arjun-2024-q4',
    employeeId: 'usr-emp-001',
    reviewerId: 'usr-ro-001',
    reviewerName: 'Vikram Nair',
    quarter: 'Q4',
    year: 2024,
    scores: { timeliness: 5, quality: 5, collaboration: 4, ownership: 5, communication: 4, discipline: 5 },
    overallScore: 4.67,
    comments: 'Arjun has consistently delivered exceptional results this quarter. The MeritSync platform delivery was remarkable. Strong candidate for Rating 1.',
    submittedAt: '2024-12-28T10:00:00Z',
    status: 'ratified',
  },
  {
    id: 'cr-arjun-2024-q3',
    employeeId: 'usr-emp-001',
    reviewerId: 'usr-ro-001',
    reviewerName: 'Vikram Nair',
    quarter: 'Q3',
    year: 2024,
    scores: { timeliness: 4, quality: 5, collaboration: 4, ownership: 5, communication: 4, discipline: 4 },
    overallScore: 4.33,
    comments: 'Very strong performance in Q3. SAP migration handled excellently.',
    submittedAt: '2024-09-28T10:00:00Z',
    status: 'ratified',
  },
  {
    id: 'cr-arjun-2024-q2',
    employeeId: 'usr-emp-001',
    reviewerId: 'usr-ro-001',
    reviewerName: 'Vikram Nair',
    quarter: 'Q2',
    year: 2024,
    scores: { timeliness: 4, quality: 4, collaboration: 4, ownership: 4, communication: 4, discipline: 4 },
    overallScore: 4.0,
    comments: 'Consistent performance. Project delay in Q1 was addressed well in Q2.',
    submittedAt: '2024-06-28T10:00:00Z',
    status: 'ratified',
  },
  {
    id: 'cr-arjun-2024-q1',
    employeeId: 'usr-emp-001',
    reviewerId: 'usr-ro-001',
    reviewerName: 'Vikram Nair',
    quarter: 'Q1',
    year: 2024,
    scores: { timeliness: 3, quality: 4, collaboration: 4, ownership: 4, communication: 4, discipline: 4 },
    overallScore: 3.83,
    comments: 'Good quarter overall. Timeliness impacted by project delay incident in January.',
    submittedAt: '2024-03-28T10:00:00Z',
    status: 'ratified',
  },
];

// ============================================================
// BELL CURVE DATA
// ============================================================
export const bellCurveData: BellCurveEntry[] = [
  { employeeId: 'usr-emp-001', employeeName: 'Arjun Sharma', departmentId: 'dept-03', evidenceBasedRating: 1, aiPredictedRating: 1, bellCurveAdjustedRating: 1, wasAdjusted: false, piScore: 86, year: 2024 },
  { employeeId: 'usr-emp-002', employeeName: 'Priya Das', departmentId: 'dept-02', evidenceBasedRating: 1, aiPredictedRating: 1, bellCurveAdjustedRating: 2, wasAdjusted: true, adjustmentReason: 'Department Rating 1 quota exhausted (max 10%)', piScore: 84, year: 2024 },
  { employeeId: 'usr-emp-003', employeeName: 'Rajesh Menon', departmentId: 'dept-01', evidenceBasedRating: 2, aiPredictedRating: 2, bellCurveAdjustedRating: 2, wasAdjusted: false, piScore: 79, year: 2024 },
  { employeeId: 'usr-emp-004', employeeName: 'Anita Kulkarni', departmentId: 'dept-05', evidenceBasedRating: 2, aiPredictedRating: 1, bellCurveAdjustedRating: 2, wasAdjusted: true, adjustmentReason: 'AI predicted Rating 1 but bell curve quota filled', piScore: 85, year: 2024 },
  { employeeId: 'usr-emp-005', employeeName: 'Mohan Lal', departmentId: 'dept-06', evidenceBasedRating: 3, aiPredictedRating: 3, bellCurveAdjustedRating: 3, wasAdjusted: false, piScore: 68, year: 2024 },
  { employeeId: 'usr-emp-006', employeeName: 'Sunita Roy', departmentId: 'dept-04', evidenceBasedRating: 3, aiPredictedRating: 3, bellCurveAdjustedRating: 3, wasAdjusted: false, piScore: 62, year: 2024 },
  { employeeId: 'usr-emp-007', employeeName: 'Deepak Chauhan', departmentId: 'dept-08', evidenceBasedRating: 3, aiPredictedRating: 2, bellCurveAdjustedRating: 3, wasAdjusted: true, adjustmentReason: 'Bell curve forced downward adjustment from predicted Rating 2', piScore: 77, year: 2024 },
  { employeeId: 'usr-emp-008', employeeName: 'Kavita Sinha', departmentId: 'dept-11', evidenceBasedRating: 4, aiPredictedRating: 4, bellCurveAdjustedRating: 4, wasAdjusted: false, piScore: 48, year: 2024 },
  { employeeId: 'usr-emp-009', employeeName: 'Ravi Shankar', departmentId: 'dept-07', evidenceBasedRating: 4, aiPredictedRating: 4, bellCurveAdjustedRating: 4, wasAdjusted: false, piScore: 44, year: 2024 },
  { employeeId: 'usr-emp-010', employeeName: 'Geeta Verma', departmentId: 'dept-14', evidenceBasedRating: 5, aiPredictedRating: 5, bellCurveAdjustedRating: 5, wasAdjusted: false, piScore: 32, year: 2024 },
];

// ============================================================
// BIAS FLAGS
// ============================================================
export const biasFlags: BiasFlag[] = [
  {
    id: 'bias-001',
    detectedAt: '2024-12-15T14:00:00Z',
    biasType: 'favoritism',
    severity: 'high',
    affectedManagerId: 'emp-042',
    explanation: 'Manager has rated 7 out of 8 reportees as Rating 1 (87.5%). Organization average is 12%. Statistically improbable.',
    aiConfidence: 94,
    isReviewed: false,
  },
  {
    id: 'bias-002',
    detectedAt: '2024-12-14T10:00:00Z',
    biasType: 'recency_bias',
    severity: 'medium',
    affectedManagerId: 'emp-038',
    explanation: '85% of events logged in last 30 days of the year. Only 3 events in Jan–Oct period. Classic recency bias pattern.',
    aiConfidence: 88,
    isReviewed: true,
    reviewedBy: 'usr-hr-001',
    resolution: 'Manager counseled. Quarterly event logging now mandatory.',
  },
  {
    id: 'bias-003',
    detectedAt: '2024-12-12T09:00:00Z',
    biasType: 'department_bias',
    severity: 'medium',
    affectedDepartmentId: 'dept-02',
    explanation: 'Marketing & Sales dept average Rating 1 rate: 28%. Org average: 12%. Department-level inflation detected.',
    aiConfidence: 82,
    isReviewed: false,
  },
  {
    id: 'bias-004',
    detectedAt: '2024-12-10T16:00:00Z',
    biasType: 'harsh_bias',
    severity: 'low',
    affectedManagerId: 'emp-055',
    explanation: 'Manager has given Rating 4 or 5 to 60% of reportees vs org average of 15%. Potential harsh rating bias.',
    aiConfidence: 76,
    isReviewed: false,
  },
  {
    id: 'bias-005',
    detectedAt: '2024-12-08T11:00:00Z',
    biasType: 'manager_bias',
    severity: 'high',
    affectedManagerId: 'emp-031',
    explanation: 'Manager consistency scores deviate >2.5 std deviations from the mean. Rating pattern inconsistent with peer group.',
    aiConfidence: 91,
    isReviewed: true,
    reviewedBy: 'usr-hr-001',
    resolution: 'Under investigation. Skip-level review initiated.',
  },
];

// ============================================================
// RATING DISTRIBUTION (for charts)
// ============================================================
export const ratingDistribution = [
  { rating: 'Rating 1 (Outstanding)', count: 58, percentage: 11.6, color: '#22c55e' },
  { rating: 'Rating 2 (Exceeds)', count: 134, percentage: 26.8, color: '#3b82f6' },
  { rating: 'Rating 3 (Meets)', count: 218, percentage: 43.6, color: '#f59e0b' },
  { rating: 'Rating 4 (Partially)', count: 68, percentage: 13.6, color: '#f97316' },
  { rating: 'Rating 5 (Does Not Meet)', count: 22, percentage: 4.4, color: '#ef4444' },
];

// PI trend for charts
export const piTrendData = [
  { month: 'Jan 24', pi: 72, org: 68 },
  { month: 'Feb 24', pi: 73, org: 68 },
  { month: 'Mar 24', pi: 72, org: 69 },
  { month: 'Apr 24', pi: 75, org: 69 },
  { month: 'May 24', pi: 77, org: 70 },
  { month: 'Jun 24', pi: 78, org: 70 },
  { month: 'Jul 24', pi: 80, org: 71 },
  { month: 'Aug 24', pi: 81, org: 71 },
  { month: 'Sep 24', pi: 82, org: 72 },
  { month: 'Oct 24', pi: 83, org: 72 },
  { month: 'Nov 24', pi: 85, org: 73 },
  { month: 'Dec 24', pi: 86, org: 73 },
];

// Department performance
export const deptPerformanceData = [
  { dept: 'IT', avgPI: 76, r1: 15, r2: 28, r3: 42, r4: 12, r5: 3 },
  { dept: 'Refinery', avgPI: 72, r1: 10, r2: 25, r3: 48, r4: 14, r5: 3 },
  { dept: 'Marketing', avgPI: 74, r1: 14, r2: 27, r3: 44, r4: 12, r5: 3 },
  { dept: 'Finance', avgPI: 70, r1: 9, r2: 24, r3: 50, r4: 14, r5: 3 },
  { dept: 'HR', avgPI: 73, r1: 12, r2: 26, r3: 45, r4: 14, r5: 3 },
  { dept: 'SCL', avgPI: 68, r1: 8, r2: 22, r3: 50, r4: 16, r5: 4 },
  { dept: 'R&D', avgPI: 78, r1: 18, r2: 30, r3: 38, r4: 11, r5: 3 },
  { dept: 'Projects', avgPI: 71, r1: 11, r2: 25, r3: 46, r4: 15, r5: 3 },
];
