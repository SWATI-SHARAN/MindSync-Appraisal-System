import React from 'react';
import { Shield, Lock, Cpu, Eye, BarChart3, HelpCircle, HardDrive, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, Badge } from '@/components/ui';

export default function FairnessPage() {
  const metrics = [
    { label: 'Overall Fairness Index', value: '94.2%', sub: 'High objectivity alignment', score: 94, color: 'bg-green-600' },
    { label: 'Transparency Score', value: '98.5%', sub: 'Zero private reviews', score: 98, color: 'bg-primary' },
    { label: 'Bias Mitigation Rate', value: '88.3%', sub: 'Auto-balanced reviews', score: 88, color: 'bg-[#0056A6]' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            AI Governance & Fairness Console
          </h1>
          <p className="text-sm text-muted-foreground">Monitor transparency indicators, score explainability parameters, and alignment tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transparency score list */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Governance KPIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.map((m, idx) => (
                <div key={idx} className="space-y-1.5 p-4 border border-border/40 rounded bg-card">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{m.label}</span>
                    <span className="font-bold text-primary">{m.value}</span>
                  </div>
                  <Progress value={m.score} barClassName={m.color} />
                  <p className="text-[10px] text-muted-foreground pt-1">{m.sub}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Explainability guide */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-500" /> Explainable AI (XAI)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              MeritSync runs on an open-attribution scoring engine. 100% of an employee's Performance Index (PI) is explainable through:
            </p>
            <div className="space-y-2 border-t border-border pt-3 text-[10px]">
              <div className="flex justify-between">
                <span>Achievement validation weighting</span>
                <span className="font-semibold text-foreground">40% weight</span>
              </div>
              <div className="flex justify-between">
                <span>Manager Quarterly score consistency</span>
                <span className="font-semibold text-foreground">15% weight</span>
              </div>
              <div className="flex justify-between">
                <span>360° Peer approval rating</span>
                <span className="font-semibold text-foreground">20% weight</span>
              </div>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-3 flex items-center gap-2 mt-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <p className="text-[10px] text-blue-800 dark:text-blue-300">
                AI adjustments to manager ratings are logged with reason strings directly on the immutable ledger.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
