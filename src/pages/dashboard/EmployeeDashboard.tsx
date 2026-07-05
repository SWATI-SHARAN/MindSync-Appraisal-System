import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Award, AlertTriangle, CheckCircle, Clock, Zap,
  ArrowUp, ArrowDown, Star, Target, Activity, BookOpen, ChevronRight,
  BarChart2, Shield, Bot
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar, AreaChart, Area
} from 'recharts';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Avatar, Button } from '@/components/ui';
import { arjunPIScores, arjunConsistencyReviews, piTrendData } from '@/data/performance';
import { arjunEvents } from '@/data/events';
import { getPIColor, getRatingLabel, getRatingColor, formatDate, cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

function PIRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? '#16a34a' : score >= 70 ? '#0056A6' : score >= 55 ? '#d97706' : '#dc2626';

  return (
    <div className="relative flex items-center justify-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/40" />
        <circle
          cx="64" cy="64" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-3xl font-bold', getPIColor(score))}>{score}</span>
        <span className="text-xs text-muted-foreground font-medium">/100</span>
      </div>
    </div>
  );
}

const competencyData = [
  { subject: 'Ownership', A: 92 },
  { subject: 'Leadership', A: 88 },
  { subject: 'Initiative', A: 95 },
  { subject: 'Innovation', A: 96 },
  { subject: 'Teamwork', A: 84 },
  { subject: 'Problem Solving', A: 90 },
  { subject: 'Customer Focus', A: 87 },
];

export default function EmployeeDashboard() {
  const { user } = useAuthStore();
  const currentPI = arjunPIScores[0];
  const recentEvents = arjunEvents.slice(0, 3);
  const latestReview = arjunConsistencyReviews[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg bg-card border border-border border-l-4 border-l-primary p-5 text-foreground shadow-enterprise"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar name={user?.name ?? 'User'} size="lg" />
          <div className="flex-1">
            <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-0.5">Appraisal Portal</div>
            <h1 className="text-xl font-bold tracking-tight mb-1">{user?.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{user?.designation}</span>
              <span>·</span>
              <span>{user?.department}</span>
              <span>·</span>
              <span>Grade {user?.grade}</span>
              <span>·</span>
              <span>{user?.employeeId}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-semibold">
              FY 2024-25 Active
            </Badge>
            <div className="text-[10px] text-muted-foreground">Last updated: {formatDate(new Date())}</div>
          </div>
        </div>
      </motion.div>

      {/* Key metrics */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'PI Score', value: '86', sub: '/ 100', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100/50 dark:bg-green-900/10', trend: '+8 vs last year' },
          { label: 'Rating Prediction', value: '1', sub: 'Outstanding', icon: Award, color: 'text-amber-600', bg: 'bg-amber-100/50 dark:bg-amber-900/10', trend: '89% confidence' },
          { label: 'Events Logged', value: '3', sub: 'Positive · 1 Negative', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100/50 dark:bg-blue-900/10', trend: 'All validated' },
          { label: 'Consistency', value: '4.67', sub: '/ 5.0 — Q4', icon: Target, color: 'text-violet-600', bg: 'bg-violet-100/50 dark:bg-violet-900/10', trend: 'Top 10% of dept' },
        ].map((m, i) => (
          <motion.div key={m.label} variants={item}>
            <Card className="metric-card hover:border-primary/40 transition-all duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{m.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={cn('text-2xl font-bold', m.color)}>{m.value}</span>
                    <span className="text-xs text-muted-foreground">{m.sub}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{m.trend}</p>
                </div>
                <div className={cn('p-2 rounded', m.bg)}>
                  <m.icon className={cn('w-4.5 h-4.5', m.color)} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PI Score Engine */}
        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  PI Score Breakdown
                </CardTitle>
                <Link to="/pi">
                  <Button variant="ghost" size="sm" className="text-xs">Details <ChevronRight className="w-3 h-3" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-5">
              <PIRing score={currentPI.totalScore} />
              <div className="w-full space-y-3">
                {[
                  { label: 'Achievement Score', value: currentPI.components.achievementScore, max: 40, color: 'bg-green-500' },
                  { label: 'Stakeholder Validation', value: currentPI.components.stakeholderValidation, max: 20, color: 'bg-blue-500' },
                  { label: 'Consistency Score', value: currentPI.components.consistencyScore, max: 15, color: 'bg-violet-500' },
                  { label: 'Leadership Behaviour', value: currentPI.components.leadershipBehaviour, max: 10, color: 'bg-amber-500' },
                  { label: 'Learning & Development', value: currentPI.components.learningDevelopment, max: 10, color: 'bg-cyan-500' },
                  { label: 'Integrity Score', value: currentPI.components.integrityScore, max: 5, color: 'bg-emerald-500' },
                ].map((c) => (
                  <div key={c.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{c.label}</span>
                      <span className="font-semibold">{c.value}<span className="text-muted-foreground">/{c.max}</span></span>
                    </div>
                    <Progress value={(c.value / c.max) * 100} barClassName={c.color} />
                  </div>
                ))}
                {currentPI.components.negativeDeductions > 0 && (
                  <div className="flex justify-between text-xs text-red-500">
                    <span>Negative Deductions</span>
                    <span>-{currentPI.components.negativeDeductions}</span>
                  </div>
                )}
              </div>
              <div className="w-full rounded border border-green-200 bg-green-50/20 dark:border-green-800/20 dark:bg-green-950/10 p-3.5 text-center">
                <div className="text-xs text-muted-foreground mb-1">AI Rating Prediction</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">Rating 1</span>
                  <Badge variant="success">89% confidence</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PI Trend Chart */}
        <motion.div variants={item} initial="hidden" animate="show" className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" />
                PI Trend — FY 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={piTrendData}>
                    <defs>
                      <linearGradient id="piGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0056A6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#0056A6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="orgGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.05} />
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 95]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }}
                      labelStyle={{ fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="pi" stroke="#0056A6" strokeWidth={2} fill="url(#piGrad)" name="Your PI Score" dot={{ fill: '#0056A6', r: 3 }} activeDot={{ r: 5 }} />
                    <Area type="monotone" dataKey="org" stroke="#64748b" strokeWidth={1.5} fill="url(#orgGrad)" strokeDasharray="3 3" name="Org Average" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Competency Radar */}
              <div className="border-t border-border pt-4">
                <div className="text-xs font-semibold text-muted-foreground mb-3">AI Competency Analysis</div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={competencyData}>
                      <PolarGrid stroke="rgba(148,163,184,0.2)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
                      <Radar name="Score" dataKey="A" stroke="#0056A6" fill="#0056A6" fillOpacity={0.1} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Events + Consistency Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Recent Events
                </CardTitle>
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="text-xs">View All <ChevronRight className="w-3 h-3" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {arjunEvents.map((ev) => (
                <div key={ev.id} className="flex gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    ev.type === 'positive' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  )}>
                    {ev.type === 'positive'
                      ? <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      : <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{ev.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={ev.impactLevel === 'critical' ? 'destructive' : ev.impactLevel === 'high' ? 'warning' : 'info'} className="text-xs">
                        {ev.impactLevel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(ev.date)}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant={ev.status === 'approved' ? 'success' : 'warning'} className="text-xs capitalize">
                      {ev.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quarterly Review + Explainable AI */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Q4 Consistency Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(latestReview.scores).map(([key, val]) => (
                  <div key={key} className="stat-box">
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">{val}</span>
                      <span className="text-xs text-muted-foreground">/5</span>
                      <div className="flex gap-0.5 ml-auto">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <div key={s} className={cn('w-1.5 h-4 rounded-full', s <= val ? 'bg-primary' : 'bg-muted')} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground italic">
                "{latestReview.comments}"
                <div className="mt-1 font-medium text-foreground not-italic">— {latestReview.reviewerName}</div>
              </div>
            </CardContent>
          </Card>

          {/* AI Copilot hint */}
          <div className="ai-panel p-4">
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-primary/10 text-primary border border-primary/25 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground mb-1">AI Performance Copilot</div>
                <p className="text-xs text-muted-foreground">
                  Your PI Score increased by <span className="text-primary font-semibold">+14 points</span> this year. 
                  Your Innovation event drove the biggest boost. Ask me anything!
                </p>
                <Link to="/copilot">
                  <Button variant="ai" size="sm" className="mt-3 text-[11px] h-7">
                    <Bot className="w-3.5 h-3.5" /> Chat with Copilot
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Validation Workflow */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              360° Validation Status — MeritSync Platform Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {[
                { label: 'Event Created', role: 'Employee', status: 'completed' },
                { label: 'Evidence Upload', role: 'Employee', status: 'completed' },
                { label: 'Reporting Officer', role: 'Vikram Nair', status: 'completed' },
                { label: 'Reviewing Officer', role: 'Suresh Pillai', status: 'completed' },
                { label: 'Internal Customer', role: 'Meena Krishnan', status: 'completed' },
                { label: 'AI Verification', role: 'AI Engine', status: 'completed' },
                { label: 'Final Approval', role: 'System', status: 'completed' },
              ].map((step, idx, arr) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-1 text-center min-w-[80px]">
                    <div className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                      step.status === 'completed' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                    )}>
                      {step.status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <div className="text-[11px] font-semibold text-foreground">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">{step.role}</div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="hidden sm:block flex-1 h-px bg-green-600/35 min-w-[20px]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
