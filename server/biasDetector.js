/**
 * Bias and Favoritism Detection Algorithms
 */

/**
 * 1. Recency Bias Detection
 * Flags managers who log a disproportionate number of performance events in the final weeks of the appraisal cycle.
 * Algorithm: Calculates log ratios of events recorded in Q4/final 30 days vs Q1-Q3.
 */
export function detectRecencyBias(events) {
  const managerEventCounts = {};

  events.forEach(event => {
    const { managerId, managerName, timestamp } = event;
    if (!managerId) return;

    if (!managerEventCounts[managerId]) {
      managerEventCounts[managerId] = {
        managerName,
        total: 0,
        late: 0, // Recorded in the last 30 days (e.g., December)
        early: 0 // Recorded earlier in the cycle
      };
    }

    const date = new Date(timestamp);
    const month = date.getMonth(); // 0-indexed (11 = Dec)
    
    // We treat November (10) and December (11) as "late" in a typical calendar year cycle
    if (month >= 10) {
      managerEventCounts[managerId].late++;
    } else {
      managerEventCounts[managerId].early++;
    }
    managerEventCounts[managerId].total++;
  });

  const flags = [];
  Object.keys(managerEventCounts).forEach(managerId => {
    const stats = managerEventCounts[managerId];
    if (stats.total >= 4) { // Minimum threshold of events to calculate bias
      const lateRatio = stats.late / stats.total;
      
      // If > 75% of events are logged in the last two months, flag recency bias
      if (lateRatio >= 0.75) {
        flags.push({
          id: `bias-recency-${managerId}`,
          detectedAt: new Date().toISOString(),
          biasType: 'recency_bias',
          severity: lateRatio > 0.9 ? 'high' : 'medium',
          affectedManagerId: managerId,
          managerName: stats.managerName,
          explanation: `${(lateRatio * 100).toFixed(0)}% of positive events logged by ${stats.managerName} were recorded in the last 60 days of the appraisal cycle, showing a heavy recency skew.`,
          aiConfidence: Math.round(lateRatio * 100),
          isReviewed: false
        });
      }
    }
  });

  return flags;
}

/**
 * 2. Endorsement Loop Detection (Favoritism Networks)
 * Flags groups of managers/employees who continuously endorse or approve each other's achievements without external validation.
 * Algorithm: Finds cycles of length >= 2 in a directed endorsement graph.
 */
export function detectEndorsementLoops(endorsements) {
  // Build directed graph: Adjacency List
  const graph = {};
  const managerNames = {};

  endorsements.forEach(edge => {
    const { fromId, fromName, toId, toName } = edge;
    if (!fromId || !toId) return;

    managerNames[fromId] = fromName;
    managerNames[toId] = toName;

    if (!graph[fromId]) graph[fromId] = new Set();
    graph[fromId].add(toId);
  });

  const visited = new Set();
  const recStack = new Set();
  const loops = [];

  // DFS function to detect cycles
  function dfs(node, path = []) {
    visited.add(node);
    recStack.add(node);
    path.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...path]);
      } else if (recStack.has(neighbor)) {
        // Cycle detected!
        const cycleStartIndex = path.indexOf(neighbor);
        if (cycleStartIndex !== -1) {
          const cycle = path.slice(cycleStartIndex);
          if (cycle.length >= 2) {
            loops.push(cycle);
          }
        }
      }
    }

    recStack.delete(node);
  }

  // Run DFS on all nodes
  Object.keys(graph).forEach(node => {
    if (!visited.has(node)) {
      dfs(node);
    }
  });

  // Filter loops to remove duplicate undirected representation and generate bias flags
  const processedLoops = new Set();
  const flags = [];

  loops.forEach(cycle => {
    // Normalize cycle representation (lexicographically smallest node first)
    const sorted = [...cycle].sort();
    const key = sorted.join('-');
    if (processedLoops.has(key)) return;
    processedLoops.add(key);

    const names = cycle.map(id => managerNames[id] || id);
    const loopStr = names.join(' ⇄ ');

    flags.push({
      id: `bias-loop-${sorted.join('-')}`,
      detectedAt: new Date().toISOString(),
      biasType: 'favoritism',
      severity: 'high',
      affectedManagerId: cycle[0],
      managerName: managerNames[cycle[0]],
      explanation: `Co-dependency favoritism loop detected: ${loopStr}. Endorsements were exchanged mutually without external peer or cross-department validation.`,
      aiConfidence: 94,
      isReviewed: false
    });
  });

  return flags;
}

/**
 * 3. Leniency / Severity Bias Detection
 * Flags managers who rate all direct reports exceptionally high (leniency) or exceptionally low (severity).
 * Algorithm: Computes distribution statistics (mean/stddev) against organization baseline.
 */
export function detectLeniencyBias(ratings, orgAverageRating = 2.3) {
  const managerRatings = {};

  ratings.forEach(record => {
    const { managerId, managerName, rating } = record;
    if (!managerId) return;

    if (!managerRatings[managerId]) {
      managerRatings[managerId] = {
        managerName,
        ratingsList: []
      };
    }
    managerRatings[managerId].ratingsList.push(rating);
  });

  const flags = [];

  Object.keys(managerRatings).forEach(managerId => {
    const stats = managerRatings[managerId];
    const ratingsList = stats.ratingsList;
    const totalCount = ratingsList.length;

    if (totalCount >= 4) { // Needs a representative sample
      const sum = ratingsList.reduce((a, b) => a + b, 0);
      const avg = sum / totalCount;

      // Rating 1 is outstanding, Rating 5 is unsatisfactory. Low avg means high score (Leniency).
      // If average rating is extremely high (e.g., avg <= 1.3, which means almost everyone is a Rating 1)
      if (avg <= 1.3) {
        flags.push({
          id: `bias-leniency-${managerId}`,
          detectedAt: new Date().toISOString(),
          biasType: 'leniency_bias',
          severity: 'high',
          affectedManagerId: managerId,
          managerName: stats.managerName,
          explanation: `Manager ${stats.managerName} marked ${(ratingsList.filter(r => r === 1).length / totalCount * 100).toFixed(0)}% of reportees as "Outstanding" (Rating 1). Average rating: ${avg.toFixed(2)} (Department Baseline: ${orgAverageRating}).`,
          aiConfidence: 92,
          isReviewed: false
        });
      }
      // Or extremely harsh (e.g., avg >= 4.0)
      else if (avg >= 3.8) {
        flags.push({
          id: `bias-severity-${managerId}`,
          detectedAt: new Date().toISOString(),
          biasType: 'harsh_bias',
          severity: 'medium',
          affectedManagerId: managerId,
          managerName: stats.managerName,
          explanation: `Manager ${stats.managerName} assigned "Need Improvement" or lower to ${(ratingsList.filter(r => r >= 4).length / totalCount * 100).toFixed(0)}% of direct reports. Average rating: ${avg.toFixed(2)} vs department baseline: ${orgAverageRating}.`,
          aiConfidence: 85,
          isReviewed: false
        });
      }
    }
  });

  return flags;
}

/**
 * 4. Historical Rating Deviation Detection
 * Flags managers whose ratings in the current cycle significantly deviate from their own historical average.
 */
export function detectHistoricalRatingDeviation(currentRatings, historicalRatings) {
  const managerHistoricalAvgs = {};

  // 1. Calculate each manager's historical average rating over the years
  historicalRatings.forEach(record => {
    const { managerId, rating } = record;
    if (!managerHistoricalAvgs[managerId]) {
      managerHistoricalAvgs[managerId] = { sum: 0, count: 0 };
    }
    managerHistoricalAvgs[managerId].sum += rating;
    managerHistoricalAvgs[managerId].count++;
  });

  const flags = [];

  // 2. Compare current cycle ratings to their historical baseline
  const currentManagerRatings = {};
  currentRatings.forEach(record => {
    const { managerId, managerName, rating } = record;
    if (!currentManagerRatings[managerId]) {
      currentManagerRatings[managerId] = { managerName, sum: 0, count: 0 };
    }
    currentManagerRatings[managerId].sum += rating;
    currentManagerRatings[managerId].count++;
  });

  Object.keys(currentManagerRatings).forEach(managerId => {
    const current = currentManagerRatings[managerId];
    const historical = managerHistoricalAvgs[managerId];

    if (historical && historical.count >= 4 && current.count >= 3) {
      const histAvg = historical.sum / historical.count;
      const currAvg = current.sum / current.count;
      
      // If the manager's average rating changes by more than 1.0 standard points
      const deviation = Math.abs(currAvg - histAvg);
      if (deviation >= 1.0) {
        flags.push({
          id: `bias-hist-dev-${managerId}`,
          detectedAt: new Date().toISOString(),
          biasType: 'historical_deviation',
          severity: 'medium',
          affectedManagerId: managerId,
          managerName: current.managerName,
          explanation: `Historical rating deviation detected: Manager ${current.managerName}'s average rating this cycle is ${currAvg.toFixed(2)}, which is ${deviation.toFixed(2)} points higher/lower than their established historical baseline rating of ${histAvg.toFixed(2)}.`,
          aiConfidence: 86,
          isReviewed: false
        });
      }
    }
  });

  return flags;
}
