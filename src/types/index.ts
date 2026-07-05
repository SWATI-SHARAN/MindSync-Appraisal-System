// ============================================================
// MERITSYNC – HPCL Core Type Definitions
// ============================================================

export type UserRole =
  | 'employee'
  | 'reporting_officer'
  | 'reviewing_officer'
  | 'internal_customer'
  | 'hr_admin'
  | 'senior_leadership';

export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical';
export type EventType = 'positive' | 'negative';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'flagged';
export type EventStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type SentimentLabel = 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';

// ============================================================
// USER & EMPLOYEE
// ============================================================

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  departmentId: string;
  grade: string;
  location: string;
  joiningDate: string;
  managerId?: string;
  managerName?: string;
  reviewingOfficerId?: string;
  reviewingOfficerName?: string;
  internalCustomerIds?: string[];
  designation: string;
  phone?: string;
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  headId: string;
  location: string;
  employeeCount: number;
  parentDepartmentId?: string;
}

// ============================================================
// EVENTS
// ============================================================

export interface PerformanceEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  submittedBy: string;
  submittedByName: string;
  employeeId: string;
  employeeName: string;
  departmentId: string;
  impactCategory: string;
  impactLevel: ImpactLevel;
  departmentAffected: string;
  businessValue: string;
  stakeholderIds: string[];
  evidenceIds: string[];
  status: EventStatus;
  aiScore?: AIEventScore;
  validationWorkflow?: ValidationWorkflow;
  isDuplicate?: boolean;
  duplicateOfId?: string;
  tags?: string[];
}

export interface AIEventScore {
  ownership: number;
  leadership: number;
  initiative: number;
  innovation: number;
  teamwork: number;
  problemSolving: number;
  customerFocus: number;
  suggestedImpactScore: number;
  suggestedRatingInfluence: number;
  confidence: number;
  sentiment: SentimentLabel;
  sentimentScore: number;
  autoTags: string[];
  explanation: string;
}

// ============================================================
// EVIDENCE
// ============================================================

export interface Evidence {
  id: string;
  eventId: string;
  employeeId: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'excel' | 'email' | 'sap_report' | 'mom' | 'other';
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
  description?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  url?: string;
}

// ============================================================
// VALIDATION WORKFLOW
// ============================================================

export interface ValidationWorkflow {
  id: string;
  eventId: string;
  currentStep: number;
  steps: ValidationStep[];
  completedAt?: string;
  finalStatus: ApprovalStatus;
}

export interface ValidationStep {
  step: number;
  label: string;
  assignedTo: string;
  assignedToName: string;
  role: UserRole | 'ai';
  status: ApprovalStatus | 'waiting';
  comment?: string;
  timestamp?: string;
}

// ============================================================
// PI SCORE ENGINE
// ============================================================

export interface PIScore {
  id: string;
  employeeId: string;
  period: string; // "2024-Q4", "2024-12", etc.
  totalScore: number; // 0-100
  components: PIComponents;
  ratingPrediction: RatingValue;
  ratingConfidence: number;
  computedAt: string;
  explanation: PIExplanation;
}

export interface PIComponents {
  achievementScore: number;       // max 40
  stakeholderValidation: number;  // max 20
  consistencyScore: number;       // max 15
  leadershipBehaviour: number;    // max 10
  learningDevelopment: number;    // max 10
  integrityScore: number;         // max 5
  negativeDeductions: number;     // subtracted
}

export interface PIExplanation {
  achievementDetail: string;
  stakeholderDetail: string;
  consistencyDetail: string;
  leadershipDetail: string;
  learningDetail: string;
  integrityDetail: string;
  negativeDetail: string;
}

// ============================================================
// CONSISTENCY REVIEW
// ============================================================

export interface ConsistencyReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  reviewerName: string;
  quarter: Quarter;
  year: number;
  scores: ConsistencyScores;
  overallScore: number;
  comments: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'ratified';
}

export interface ConsistencyScores {
  timeliness: RatingValue;
  quality: RatingValue;
  collaboration: RatingValue;
  ownership: RatingValue;
  communication: RatingValue;
  discipline: RatingValue;
}

// ============================================================
// FEEDBACK
// ============================================================

export interface Feedback {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toEmployeeId: string;
  eventId?: string;
  content: string;
  rating?: number;
  sentiment?: SentimentLabel;
  sentimentScore?: number;
  autoTags?: string[];
  isEndorsement: boolean;
  createdAt: string;
}

// ============================================================
// BIAS & FAIRNESS
// ============================================================

export interface BiasFlag {
  id: string;
  detectedAt: string;
  biasType: 'manager_bias' | 'favoritism' | 'department_bias' | 'recency_bias' | 'harsh_bias' | 'leniency_bias';
  severity: 'low' | 'medium' | 'high';
  affectedEmployeeId?: string;
  affectedManagerId?: string;
  affectedDepartmentId?: string;
  explanation: string;
  aiConfidence: number;
  isReviewed: boolean;
  reviewedBy?: string;
  resolution?: string;
}

// ============================================================
// BELL CURVE
// ============================================================

export interface BellCurveEntry {
  employeeId: string;
  employeeName: string;
  departmentId: string;
  evidenceBasedRating: RatingValue;
  aiPredictedRating: RatingValue;
  bellCurveAdjustedRating: RatingValue;
  wasAdjusted: boolean;
  adjustmentReason?: string;
  piScore: number;
  year: number;
}

// ============================================================
// RATING
// ============================================================

export interface PerformanceRating {
  id: string;
  employeeId: string;
  year: number;
  rating: RatingValue;
  evidenceBasedRating: RatingValue;
  aiPredictedRating: RatingValue;
  finalRating: RatingValue;
  wasAdjustedByBellCurve: boolean;
  piScore: number;
  ratingBand: string;
  promotionRecommended: boolean;
  reviewedBy: string;
  approvedBy: string;
  comments: string;
  generatedAt: string;
}

// ============================================================
// AUDIT LOG
// ============================================================

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================
// LEARNING & DEVELOPMENT
// ============================================================

export interface LearningRecord {
  id: string;
  employeeId: string;
  type: 'certification' | 'training' | 'course' | 'workshop' | 'conference';
  title: string;
  provider: string;
  completedDate: string;
  expiryDate?: string;
  score?: number;
  certificateId?: string;
  piContribution: number;
}

// ============================================================
// CHAT
// ============================================================

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    sources?: string[];
    confidence?: number;
  };
}

// ============================================================
// SAP INTEGRATION
// ============================================================

export interface SAPData {
  employeeId: string;
  sapId: string;
  attendanceScore: number;
  leaveBalance: number;
  kpiCompletion: number;
  trainingHours: number;
  projectMilestones: number;
  certifications: number;
  lastSyncedAt: string;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'action_required';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// ============================================================
// DASHBOARD METRICS
// ============================================================

export interface OrgMetrics {
  totalEmployees: number;
  activeEvents: number;
  pendingValidations: number;
  avgPIScore: number;
  fairnessIndex: number;
  biasAlerts: number;
  promotionReadyCount: number;
  atRiskCount: number;
  departmentCount: number;
  topPerformerCount: number;
}

export interface DepartmentMetrics {
  departmentId: string;
  departmentName: string;
  avgPI: number;
  headcount: number;
  positiveEvents: number;
  negativeEvents: number;
  biasAlerts: number;
  rating1Count: number;
  rating2Count: number;
  rating3Count: number;
  rating4Count: number;
  rating5Count: number;
}
