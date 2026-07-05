import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, HelpCircle, TrendingUp, Award, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  RadialBarChart, RadialBar, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Button, Avatar } from '@/components/ui';
import { arjunPIScores } from '@/data/performance';
import { getPIColor, getRatingLabel, cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const historyData = arjunPIScores.map((p) => ({
  period: p.period,
  score: p.totalScore,
  rating: p.ratingPrediction,
})).reverse();

export default function PIPage() {
  const { user } = useAuthStore();
  const current = arjunPIScores[0];
  const [showExplain, setShowExplain] = useState(false);

  const components = [
    { label: 'Achievement Score', key: 'achievementScore', max: 40, value: current.components.achievementScore, color: '#22c55e', detail: current.explanation.achievementDetail },
    { label: 'Stakeholder Validation', key: 'stakeholderValidation', max: 20, value: current.components.stakeholderValidation, color: '#3b82f6', detail: current.explanation.stakeholderDetail },
    { label: 'Consistency Score', key: 'consistencyScore', max: 15, value: current.components.consistencyScore, color: '#8b5cf6', detail: current.explanation.consistencyDetail },
    { label: 'Leadership Behaviour', key: 'leadershipBehaviour', max: 10, value: current.components.leadershipBehaviour, color: '#f59e0b', detail: current.explanation.leadershipDetail },
    { label: 'Learning & Development', key: 'learningDevelopment', max: 10, value: current.components.learningDevelopment, color: '#06b6d4', detail: current.explanation.learningDetail },
    { label: 'Integrity Score', key: 'integrityScore', max: 5, value: current.components.integrityScore, color: '#10b981', detail: current.explanation.integrityDetail },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Performance Index (PI)
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your continuous performance score — FY 2024-25</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowExplain((v) => !v)}>
          <HelpCircle className="w-4 h-4" />
          Why is my PI Score {current.totalScore}?
        </Button>
      </div>

      {/* Explainable AI Panel */}
      <AnimatePresence>
        {showExplain && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="ai-panel p-5">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold gradient-text-ai">AI Explanation — Why is your PI Score {current.totalScore}?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {components.map((c) => (
                    <div key={c.label} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-foreground">{c.label}</span>
                        <span className="text-sm font-bold" style={{ color: c.color }}>+{c.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.detail}</p>
                    </div>
                  ))}
                  {current.components.negativeDeductions > 0 && (
                    <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">Negative Deductions</span>
                        <span className="text-sm font-bold text-red-400">-{current.components.negativeDeductions}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{current.explanation.negativeDetail}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Final PI Score</span>
                    <span className="text-2xl font-bold text-green-400">{current.totalScore} / 100</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current PI Score */}
        <Card>
          <CardHeader><CardTitle>Current PI Score</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {/* Big score ring */}
            <div className="relative">
              <svg width="160" height="160" className="-rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted/30" />
                <circle
                  cx="80" cy="80" r="70" fill="none" stroke="#22c55e" strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - current.totalScore / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-green-500">{current.totalScore}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </div>

            <div className="text-center">
              <Badge variant="success" className="text-sm px-4 py-1.5 mb-2">Rating 1 — Outstanding</Badge>
              <div className="text-xs text-muted-foreground">AI Confidence: 89%</div>
            </div>

            {/* Component breakdown */}
            <div className="w-full space-y-2.5">
              {components.map((c) => (
                <div key={c.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{c.label}</span>
                    <span className="font-semibold">{c.value}/{c.max}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(c.value / c.max) * 100}%`, background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PI Score History Chart */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                PI Score History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData}>
                    <defs>
                      <linearGradient id="piHistGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0056A6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0056A6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 95]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} />
                    <Area type="monotone" dataKey="score" stroke="#0056A6" strokeWidth={2} fill="url(#piHistGrad)" name="PI Score" dot={{ fill: '#0056A6', r: 3 }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* PI history table */}
          <Card>
            <CardHeader><CardTitle>Score History</CardTitle></CardHeader>
            <CardContent>
              <table className="data-table">
                <thead><tr><th>Period</th><th>PI</th><th>Predicted Rating</th><th>Trend</th></tr></thead>
                <tbody>
                  {arjunPIScores.map((s, i) => (
                    <tr key={s.id}>
                      <td className="text-sm">{s.period}</td>
                      <td>
                        <span className={cn('font-bold text-sm', getPIColor(s.totalScore))}>{s.totalScore}</span>
                      </td>
                      <td>
                        <Badge variant={s.ratingPrediction === 1 ? 'success' : 'info'}>
                          Rating {s.ratingPrediction} — {s.ratingPrediction === 1 ? 'Outstanding' : 'Exceeds'}
                        </Badge>
                      </td>
                      <td>
                        {i < arjunPIScores.length - 1 && (
                          <span className={cn('text-sm', s.totalScore > arjunPIScores[i + 1].totalScore ? 'text-green-500' : 'text-red-500')}>
                            {s.totalScore > arjunPIScores[i + 1].totalScore ? '↑' : '↓'}
                            {' '}{Math.abs(s.totalScore - arjunPIScores[i + 1].totalScore)} pts
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
