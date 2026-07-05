import dotenv from 'dotenv';
dotenv.config();

/**
 * Fallback local NLP engine to analyze performance statement.
 */
function localRuleAnalyzer(text) {
  const lowercaseText = text.toLowerCase();
  
  let score = 70;
  let ratingImpact = 0.15;
  let sentiment = 'Neutral';
  let sentimentScore = 0.5;
  let explanation = 'The input description details a routine contribution with standard operational impact.';
  
  const comps = {
    'Ownership': 70,
    'Initiative': 65,
    'Teamwork': 70,
    'Innovation': 50,
    'Leadership': 55
  };
  
  const tags = ['Routine Maintenance'];

  // Keywords definitions
  const techKeywords = ['optimize', 'automated', 'migration', 'latency', 'pipeline', 'deployment', 'refactored', 'cloud', 'aws', 'database', 'query', 'codebase'];
  const crisisKeywords = ['critical', 'downtime', 'incident', 'fixed', 'outage', 'restored', 'resolved', 'emergency', 'security', 'vulnerability', 'patch'];
  const leadKeywords = ['led', 'managed', 'guided', 'mentored', 'headed', 'spearheaded', 'organized', 'initiative', 'coordinated', 'team'];
  const innovKeywords = ['innovative', 'patented', 'designed', 'prototyped', 'pioneered', 'redesigned', 'architected', 'framework'];

  let matchedTech = techKeywords.filter(k => lowercaseText.includes(k));
  let matchedCrisis = crisisKeywords.filter(k => lowercaseText.includes(k));
  let matchedLead = leadKeywords.filter(k => lowercaseText.includes(k));
  let matchedInnov = innovKeywords.filter(k => lowercaseText.includes(k));

  if (matchedTech.length > 0 || matchedInnov.length > 0) {
    score = 88 + Math.min(6, matchedTech.length + matchedInnov.length * 2);
    ratingImpact = 0.4 + (matchedInnov.length > 0 ? 0.1 : 0.05);
    sentiment = 'Very Positive';
    sentimentScore = 0.9 + Math.min(0.08, (matchedTech.length + matchedInnov.length) * 0.02);
    explanation = `High impact technical contribution identified. Work involving ${matchedTech.concat(matchedInnov).slice(0, 3).join(', ')} led to quantifiable optimizations and engineering maturity.`;
    
    comps['Innovation'] = 90 + Math.min(8, matchedInnov.length * 4);
    comps['Initiative'] = 85 + Math.min(10, matchedTech.length * 3);
    comps['Ownership'] = 85;
    tags.push('Automation', 'Performance Optimization');
    if (matchedInnov.length > 0) tags.push('Innovation');
  } else if (matchedCrisis.length > 0) {
    score = 82 + Math.min(8, matchedCrisis.length * 2);
    ratingImpact = 0.3 + Math.min(0.1, matchedCrisis.length * 0.03);
    sentiment = 'Positive';
    sentimentScore = 0.8 + Math.min(0.1, matchedCrisis.length * 0.02);
    explanation = `Strong response to system events. Promptly addressing ${matchedCrisis.slice(0, 3).join(', ')} mitigated refinery downtime and prevented operational scale-out issues.`;
    
    comps['Ownership'] = 92 + Math.min(6, matchedCrisis.length * 2);
    comps['Initiative'] = 82;
    comps['Teamwork'] = 80;
    tags.push('Incident Response', 'Troubleshooting', 'Business Continuity');
  }

  if (matchedLead.length > 0) {
    score = Math.max(score, 80) + Math.min(5, matchedLead.length);
    comps['Leadership'] = 85 + Math.min(10, matchedLead.length * 3);
    comps['Teamwork'] = Math.max(comps['Teamwork'] || 70, 80);
    tags.push('Leadership');
  }

  // Format competencies array
  const competencies = Object.keys(comps).map(name => ({
    name,
    score: Math.min(100, comps[name])
  }));

  return {
    score: Math.min(100, score),
    ratingImpact: parseFloat(ratingImpact.toFixed(2)),
    sentiment,
    sentimentScore: parseFloat(sentimentScore.toFixed(2)),
    explanation,
    competencies,
    tags: Array.from(new Set(tags))
  };
}

/**
 * Analyze performance statement using Gemini API.
 */
export async function analyzePerformanceStatement(text) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.log('[AI Service] No valid Gemini API Key found. Falling back to local rules-based analyzer.');
    return localRuleAnalyzer(text);
  }

  try {
    const model = 'gemini-1.5-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert HR Performance Review Agent on the MeritSync platform at HPCL.
Analyze the following performance statement submitted by an employee. 

Performance Statement:
"${text}"

Evaluate and return a structured JSON response containing:
1. "score": An integer (0-100) representing the estimated Performance Index (PI) score based on technical depth, impact, and business value.
2. "ratingImpact": A decimal (e.g. 0.15, 0.45) representing the rating improvement score.
3. "sentiment": A string category representing the sentiment class ('Very Positive', 'Positive', 'Neutral', 'Negative').
4. "sentimentScore": A float (0.0 to 1.0) indicating the sentiment confidence score.
5. "explanation": A 2-sentence summary explaining the AI's diagnostic reasoning.
6. "competencies": An array of five competencies (Ownership, Initiative, Teamwork, Innovation, Leadership) each with an integer score (0-100).
7. "tags": An array of relevant tags (e.g., "Cloud Migration", "Automation", "Incident Response").

Return ONLY valid JSON. Do not include markdown code block formatting like \`\`\`json.
`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      throw new Error('Empty response from Gemini API');
    }

    const result = JSON.parse(resultText.trim());
    return {
      score: result.score || 70,
      ratingImpact: result.ratingImpact || 0.15,
      sentiment: result.sentiment || 'Neutral',
      sentimentScore: result.sentimentScore || 0.5,
      explanation: result.explanation || 'Analyzed by MeritSync Service.',
      competencies: result.competencies || [
        { name: 'Ownership', score: 70 },
        { name: 'Initiative', score: 65 },
        { name: 'Teamwork', score: 70 },
        { name: 'Innovation', score: 50 },
        { name: 'Leadership', score: 55 }
      ],
      tags: result.tags || ['General']
    };
  } catch (error) {
    console.error('[AI Service] Error contacting Gemini API:', error.message);
    console.log('[AI Service] Falling back to local rules-based analyzer.');
    return localRuleAnalyzer(text);
  }
}
