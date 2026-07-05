import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzePerformanceStatement } from './aiService.js';
import { detectRecencyBias, detectEndorsementLoops, detectLeniencyBias, detectHistoricalRatingDeviation } from './biasDetector.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app (on port 3000) can communicate with us
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// In-memory data store for bias flags
let dbBiasFlags = [
  { 
    id: 'flag-001', 
    type: 'Recency Bias', 
    manager: 'Sanjay Sen', 
    severity: 'medium', 
    confidence: 91, 
    explanation: '90% of positive events logged by Sanjay Sen were recorded in the last 14 days of the appraisal cycle, while only 10% were logged during the first 3 quarters.', 
    status: 'Pending Review' 
  },
  { 
    id: 'flag-002', 
    type: 'Endorsement Favoritism Loop', 
    manager: 'Nagesh Nair', 
    severity: 'high', 
    confidence: 94, 
    explanation: 'Co-dependency loop detected between Nagesh Nair and Vinod Rao. Nagesh endorsed Vinod 5 times, while Vinod approved Nagesh 4 times without external stakeholder validation.', 
    status: 'Pending Review' 
  },
  { 
    id: 'flag-003', 
    type: 'Leniency Bias', 
    manager: 'Preeti Gupta', 
    severity: 'low', 
    confidence: 85, 
    explanation: 'Preeti marked 100% of her direct reports as "Outstanding" (Rating 1). Department average rating is 2.3.', 
    status: 'Resolved' 
  },
  {
    id: 'bias-hist-dev-mgr-105',
    type: 'Historical Rating Deviation',
    manager: 'Vikram Nair',
    severity: 'medium',
    confidence: 86,
    explanation: 'Historical rating deviation detected: Manager Vikram Nair\'s average rating this cycle is 4.33, which is 2.18 points lower than their established historical baseline rating of 2.15 (based on past cycles).',
    status: 'Pending Review'
  }
];

// In-memory storage for raw inputs to run detection algorithms
let sampleEvents = [
  { managerId: 'mgr-101', managerName: 'Sanjay Sen', timestamp: '2024-12-10T10:00:00Z' },
  { managerId: 'mgr-101', managerName: 'Sanjay Sen', timestamp: '2024-12-15T14:30:00Z' },
  { managerId: 'mgr-101', managerName: 'Sanjay Sen', timestamp: '2024-12-20T09:15:00Z' },
  { managerId: 'mgr-101', managerName: 'Sanjay Sen', timestamp: '2024-12-25T11:45:00Z' },
  { managerId: 'mgr-101', managerName: 'Sanjay Sen', timestamp: '2024-03-01T10:00:00Z' } // 80% late, will trigger recency
];

let sampleEndorsements = [
  { fromId: 'mgr-102', fromName: 'Nagesh Nair', toId: 'mgr-103', toName: 'Vinod Rao' },
  { fromId: 'mgr-103', fromName: 'Vinod Rao', toId: 'mgr-102', toName: 'Nagesh Nair' } // cycle, will trigger favoritism loop
];

let sampleRatings = [
  { managerId: 'mgr-104', managerName: 'Preeti Gupta', rating: 1 },
  { managerId: 'mgr-104', managerName: 'Preeti Gupta', rating: 1 },
  { managerId: 'mgr-104', managerName: 'Preeti Gupta', rating: 1 },
  { managerId: 'mgr-104', managerName: 'Preeti Gupta', rating: 1 }, // 100% Rating 1, will trigger leniency
  
  // Vikram Nair current ratings (harsh skew)
  { managerId: 'mgr-105', managerName: 'Vikram Nair', rating: 4 },
  { managerId: 'mgr-105', managerName: 'Vikram Nair', rating: 4 },
  { managerId: 'mgr-105', managerName: 'Vikram Nair', rating: 5 }
];

let sampleHistoricalRatings = [
  // Vikram Nair historical ratings (previously balanced/lenient)
  { managerId: 'mgr-105', rating: 2 },
  { managerId: 'mgr-105', rating: 2 },
  { managerId: 'mgr-105', rating: 2 },
  { managerId: 'mgr-105', rating: 3 }
];

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 1. AI Performance Statement Analyzer
app.post('/api/ai/analyze-performance', async (req, res) => {
  const { statement } = req.body;
  if (!statement) {
    return res.status(400).json({ error: 'Statement parameter is required.' });
  }

  console.log(`[Backend] Analyzing performance statement: "${statement.substring(0, 50)}..."`);
  try {
    const analysis = await analyzePerformanceStatement(statement);
    res.json(analysis);
  } catch (error) {
    console.error('[Backend] Analysis failed:', error);
    res.status(500).json({ error: 'Internal server error during analysis.' });
  }
});

// 2. Fetch Active Bias Flags
app.get('/api/bias/flags', (req, res) => {
  res.json(dbBiasFlags);
});

// 3. Trigger Active Bias Analysis Algorithms
app.post('/api/bias/analyze', (req, res) => {
  const events = req.body.events || sampleEvents;
  const endorsements = req.body.endorsements || sampleEndorsements;
  const ratings = req.body.ratings || sampleRatings;
  const historicalRatings = req.body.historicalRatings || sampleHistoricalRatings;

  console.log('[Backend] Executing Bias Detection algorithms over records...');
  
  const recencyFlags = detectRecencyBias(events);
  const loopFlags = detectEndorsementLoops(endorsements);
  const leniencyFlags = detectLeniencyBias(ratings);
  const historicalFlags = detectHistoricalRatingDeviation(ratings, historicalRatings);

  const newFlags = [...recencyFlags, ...loopFlags, ...leniencyFlags, ...historicalFlags];

  // Map to frontend structure
  const formattedFlags = newFlags.map((flag, idx) => {
    const types = {
      'recency_bias': 'Recency Bias',
      'favoritism': 'Endorsement Favoritism Loop',
      'leniency_bias': 'Leniency Bias',
      'harsh_bias': 'Severity Bias',
      'historical_deviation': 'Historical Rating Deviation'
    };

    return {
      id: flag.id,
      type: types[flag.biasType] || flag.biasType,
      manager: flag.managerName || 'System Detection',
      severity: flag.severity,
      confidence: flag.aiConfidence,
      explanation: flag.explanation,
      status: 'Pending Review'
    };
  });

  // Merge flags into in-memory storage, avoiding duplicates
  formattedFlags.forEach(f => {
    if (!dbBiasFlags.some(existing => existing.id === f.id)) {
      dbBiasFlags.unshift(f);
    }
  });

  res.json({
    message: 'Analysis complete. Bias flags updated.',
    flagsAddedCount: formattedFlags.length,
    currentFlags: dbBiasFlags
  });
});

// 4. Resolve Bias Flag
app.post('/api/bias/resolve/:id', (req, res) => {
  const { id } = req.params;
  const flagIndex = dbBiasFlags.findIndex(f => f.id === id);

  if (flagIndex === -1) {
    return res.status(404).json({ error: 'Bias flag not found.' });
  }

  dbBiasFlags[flagIndex].status = 'Resolved';
  console.log(`[Backend] Resolved Bias Flag: ${id}`);
  
  res.json({
    message: 'Bias flag successfully mitigated and resolved.',
    flag: dbBiasFlags[flagIndex]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` MeritSync Backend Server is running!            `);
  console.log(` Port: ${PORT}                                    `);
  console.log(` Health check: http://localhost:${PORT}/api/health `);
  console.log(`=================================================`);
});
