import React, { useState } from 'react';
import { Cpu, Send, CheckCircle2, Star, Zap, BarChart3, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Textarea, Label, Badge, Progress } from '@/components/ui';
import { toast } from 'sonner';

export default function AIAnalyzerPage() {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    ratingImpact: number;
    sentiment: string;
    sentimentScore: number;
    explanation: string;
    competencies: { name: string; score: number }[];
    tags: string[];
  } | null>(null);

  const runAnalysis = async () => {
    if (!inputText) {
      toast.error('Please enter a performance statement.');
      return;
    }
    setAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statement: inputText }),
      });
      if (!response.ok) {
        throw new Error('Backend response not ok');
      }
      const data = await response.json();
      setResult(data);
      setAnalyzing(false);
      toast.success('AI performance analysis complete.');
    } catch (err) {
      console.warn('Backend unavailable, falling back to local simulation:', err);
      setTimeout(() => {
        const text = inputText.toLowerCase();
        let score = 72;
        let ratingImpact = 0.2;
        let sentiment = 'Neutral';
        let sentimentScore = 0.55;
        let explanation = 'The input description shows a standard contribution with standard business impact.';
        let comps = [
          { name: 'Ownership', score: 75 },
          { name: 'Initiative', score: 70 },
          { name: 'Teamwork', score: 72 },
          { name: 'Innovation', score: 60 },
          { name: 'Leadership', score: 65 }
        ];
        let tags = ['Execution', 'IT Maintenance'];

        if (text.includes('optimize') || text.includes('automated') || text.includes('migration') || text.includes('latency')) {
          score = 90;
          ratingImpact = 0.45;
          sentiment = 'Very Positive';
          sentimentScore = 0.94;
          explanation = 'Highly technical contribution. Automated configurations led to measurable network efficiency gains and reduced latency.';
          comps = [
            { name: 'Ownership', score: 92 },
            { name: 'Initiative', score: 88 },
            { name: 'Teamwork', score: 80 },
            { name: 'Innovation', score: 95 },
            { name: 'Leadership', score: 75 }
          ];
          tags.push('Automation', 'Cloud Migration', 'Performance Optimization');
        } else if (text.includes('critical') || text.includes('downtime') || text.includes('incident') || text.includes('fixed')) {
          score = 84;
          ratingImpact = 0.35;
          sentiment = 'Positive';
          sentimentScore = 0.82;
          explanation = 'Strong ownership demonstrated. Quick response to outages saved substantial system downtime and mitigated refinery impact.';
          comps = [
            { name: 'Ownership', score: 96 },
            { name: 'Initiative', score: 85 },
            { name: 'Teamwork', score: 78 },
            { name: 'Innovation', score: 68 },
            { name: 'Leadership', score: 80 }
          ];
          tags.push('Incident Response', 'Troubleshooting', 'Refinery Systems');
        }

        setResult({ score, ratingImpact, sentiment, sentimentScore, explanation, competencies: comps, tags });
        setAnalyzing(false);
        toast.success('AI performance analysis complete (via Fallback).');
      }, 1200);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            AI Performance Event Analyzer
          </h1>
          <p className="text-sm text-muted-foreground">Submit performance statements to extract competencies and gauge impact influence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Analyze Performance Text</CardTitle>
              <CardDescription>Enter details of an employee action or contribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="perfText">Statement Detail</Label>
                <Textarea
                  id="perfText"
                  rows={6}
                  placeholder="e.g. Arjun led the optimization of the SAP Web Dispatcher, reducing pipeline monitoring latency by 35%."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <Button onClick={runAnalysis} disabled={analyzing} className="w-full text-xs gap-1.5">
                <Cpu className="w-4 h-4" /> {analyzing ? 'AI Evaluating…' : 'Run Analyzer'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-2">
          {result ? (
            <Card>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm flex items-center gap-1.5 text-primary">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Analyzer Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Estimated PI Score</div>
                    <div className="text-2xl font-bold text-primary">{result.score} <span className="text-xs text-muted-foreground">/ 100</span></div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Rating Contribution</div>
                    <div className="text-2xl font-bold text-green-600">+{result.ratingImpact} <span className="text-xs text-muted-foreground">rating</span></div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Sentiment Class</div>
                    <div className="text-2xl font-bold text-[#0056A6]">{result.sentiment}</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Sentiment Score</div>
                    <div className="text-2xl font-bold">{(result.sentimentScore * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <h3 className="font-semibold text-foreground">Competency Extraction</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.competencies.map((comp) => (
                      <div key={comp.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{comp.name}</span>
                          <span className="font-semibold">{comp.score}%</span>
                        </div>
                        <Progress value={comp.score} barClassName="bg-primary" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <h3 className="font-semibold text-foreground">AI Logic Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {result.tags.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center border-dashed">
              <CardContent className="pt-6">
                <Cpu className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">Enter a statement in the left panel to test performance parsing logic.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
