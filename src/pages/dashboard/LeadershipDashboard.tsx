import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, TrendingUp, Shield, AlertTriangle, Users,
  Target, Zap, ChevronRight, BarChart3, Activity
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Button } from '@/components/ui';
import { deptPerformanceData, ratingDistribution, biasFlags, piTrendData } from '@/data/performance';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const talentData = [
  { name: 'R&D', potential: 88, performance: 78, size: 25 },
  { name: 'IT', potential: 85, performance: 76, size: 32 },
  { name: 'Strategy', potential: 82, performance: 74, size: 15 },
  { name: 'Marketing', potential: 78, performance: 74, size: 38 },
  { name: 'Projects', potential: 76, performance: 71, size: 35 },
  { name: 'Finance', potential: 72, performance: 70, size: 28 },
  { name: 'SCL', potential: 70, performance: 68, size: 40 },
  { name: 'Refinery', potential: 68, performance: 72, size: 45 },
];

const successionPool = [
  { name: 'Arjun Sharma', dept: 'IT', grade: 'E4', pi: 86, readiness: 94, target: 'DGM - IT' },
  { name: 'Dr. Kavita Rao', dept: 'R&D', grade: 'E6', pi: 82, readiness: 88, target: 'Director - Innovation' },
  { name: 'Priya Menon', dept: 'HR', grade: 'E6', pi: 79, readiness: 85, target: 'VP - Human Resources' },
  { name: 'Deepak Mehta', dept: 'Projects', grade: 'E5', pi: 77, readiness: 80, target: 'GM - Projects' },
];

export default function LeadershipDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leadership Intelligence Dashboard</h1>
        <p className="text-muted-foreground text-xs mt-1">Enterprise-wide talent insights — HPCL Command View</p>
      </div>

      {/* Enterprise KPIs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Organization PI Score', value: '73.2', icon: TrendingUp, color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20 border border-green-200/50', sub: '+4.2 vs last year' },
          { label: 'Fairness Index', value: '82%', icon: Shield, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50', sub: 'Industry benchmark: 75%' },
          { label: 'Active Bias Alerts', value: '5', icon: AlertTriangle, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20 border border-red-200/50', sub: '3 high severity' },
          { label: 'Future Leaders', value: '23', icon: Users, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800 border border-border/50', sub: 'Promotion ready' },
        ].map((m) => (
          <Card key={m.label} className="metric-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wider">{m.label}</p>
                <p className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">{m.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{m.sub}</p>
              </div>
              <div className={cn('p-2 rounded', m.bg)}>
                <m.icon className={cn('w-4.5 h-4.5', m.color)} />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization PI Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Organization PI Score Trend — FY 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={piTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                   <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                   <YAxis domain={[65, 90]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} />
                   <Line type="monotone" dataKey="org" stroke="#0056A6" strokeWidth={2} dot={{ fill: '#0056A6', r: 3 }} name="Org PI Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Talent Scatter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Talent Potential vs Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                  <XAxis type="number" dataKey="performance" name="Performance" domain={[65, 92]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} label={{ value: 'Performance', position: 'bottom', fontSize: 10, fill: '#64748b' }} />
                  <YAxis type="number" dataKey="potential" name="Potential" domain={[65, 92]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} label={{ value: 'Potential', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                  <ZAxis type="number" dataKey="size" range={[40, 200]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} formatter={(v, n, p) => [v, n === 'performance' ? 'Performance PI Score' : n === 'potential' ? 'Potential Score' : 'Headcount']} />
                  <Scatter data={talentData} fill="#0056A6" fillOpacity={0.7} name="Departments" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Succession Planning */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Succession Planning — High Potential Pool
            </CardTitle>
            <Link to="/succession"><Button variant="ghost" size="sm" className="text-xs">Full Report <ChevronRight className="w-3.5 h-3.5" /></Button></Link>
          </div>
        </CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>PI Score</th>
                <th>Promotion Readiness</th>
                <th>Target Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {successionPool.map((e) => (
                <tr key={e.name}>
                  <td>
                    <div className="font-semibold text-xs text-foreground">{e.name}</div>
                    <div className="text-[10px] text-muted-foreground">Grade {e.grade}</div>
                  </td>
                  <td className="text-xs text-muted-foreground">{e.dept}</td>
                  <td>
                    <span className="font-bold text-green-600 text-xs">{e.pi}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Progress value={e.readiness} className="w-20 h-1" barClassName="bg-primary" />
                      <span className="text-[10px] font-semibold">{e.readiness}%</span>
                    </div>
                  </td>
                  <td className="text-xs text-muted-foreground">{e.target}</td>
                  <td><Badge variant="success">Ready</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Fairness Index', value: 82, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30', icon: Shield, desc: 'Equity in appraisals' },
          { label: 'Trust Score', value: 78, color: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40', icon: Zap, desc: 'System confidence' },
          { label: 'Org Health Index', value: 74, color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30', icon: Activity, desc: 'Workforce effectiveness' },
          { label: 'AI Transparency', value: 91, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30', icon: Target, desc: 'Explainability score' },
        ].map((f) => (
          <Card key={f.label} className={cn('p-4 border', f.bg)}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{f.label}</div>
              <f.icon className={cn('w-4 h-4', f.color)} />
            </div>
            <div className="text-xl font-bold tracking-tight text-slate-800 dark:text-white mb-2">
              {f.value}%
            </div>
            <Progress value={f.value} className="h-1 mb-2" barClassName={cn('bg-', f.color.split(' ')[0].replace('text-', ''))} />
            <div className="text-[10px] text-muted-foreground">{f.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
