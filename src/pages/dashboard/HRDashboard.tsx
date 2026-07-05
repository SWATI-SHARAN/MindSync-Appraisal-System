import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Shield, AlertTriangle, TrendingUp, Users, Target,
  CheckCircle, ChevronRight, Activity
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Button } from '@/components/ui';
import { ratingDistribution, deptPerformanceData, biasFlags } from '@/data/performance';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const COLORS = ['#16a34a', '#0056A6', '#d97706', '#ea580c', '#dc2626'];

export default function HRDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">HR Analytics Dashboard</h1>
        <p className="text-muted-foreground text-xs mt-1">Organization-wide performance intelligence — HPCL FY 2024-25</p>
      </div>

      {/* Top KPIs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Employees', value: '500', icon: Users, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
          { label: 'Org Avg PI Score', value: '73.2', icon: TrendingUp, color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20 border border-green-200/50' },
          { label: 'Fairness Index', value: '82%', icon: Shield, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50' },
          { label: 'Bias Alerts', value: '5', icon: AlertTriangle, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20 border border-red-200/50' },
          { label: 'Validated Events', value: '1,243', icon: CheckCircle, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
        ].map((m) => (
          <Card key={m.label} className="metric-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wider">{m.label}</p>
                <p className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">{m.value}</p>
              </div>
              <div className={cn('p-2 rounded', m.bg)}>
                <m.icon className={cn('w-4.5 h-4.5', m.color)} />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Rating Distribution — FY 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ratingDistribution} dataKey="count" nameKey="rating" cx="50%" cy="50%" outerRadius={80} label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}>
                    {ratingDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
              {ratingDistribution.map((r, i) => {
                const barColors = ['bg-green-600', 'bg-primary', 'bg-amber-600', 'bg-orange-600', 'bg-red-600'];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                    <span className="text-xs flex-1 text-muted-foreground">{r.rating}</span>
                    <Progress value={r.percentage} className="w-24 h-1" barClassName={barColors[i]} />
                    <span className="text-xs font-semibold w-12 text-right">{r.count} ({r.percentage}%)</span>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Department Avg PI Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                  <XAxis type="number" domain={[60, 82]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} width={55} />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} />
                  <Bar dataKey="avgPI" fill="#0056A6" radius={[0, 2, 2, 0]} name="Avg PI Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bias Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              AI Bias Detection Alerts
              <Badge variant="destructive">{biasFlags.filter(b => !b.isReviewed).length} unreviewed</Badge>
            </CardTitle>
            <Link to="/bias"><Button variant="ghost" size="sm" className="text-xs">Full Report <ChevronRight className="w-3.5 h-3.5" /></Button></Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {biasFlags.map((flag) => (
            <div key={flag.id} className={cn(
              'flex items-start gap-3.5 p-3.5 rounded border text-xs',
              flag.severity === 'high' ? 'border-red-100 bg-red-50/20 dark:border-red-950/20 dark:bg-red-950/5 text-red-900 dark:text-red-300' :
              flag.severity === 'medium' ? 'border-amber-100 bg-amber-50/20 dark:border-amber-950/20 dark:bg-amber-950/5 text-amber-900 dark:text-amber-300' :
              'border-border bg-muted/10'
            )}>
              <div className={cn('p-1.5 rounded flex-shrink-0', flag.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' : flag.severity === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-muted')}>
                <AlertTriangle className={cn('w-4 h-4', flag.severity === 'high' ? 'text-red-600' : flag.severity === 'medium' ? 'text-amber-600' : 'text-muted-foreground')} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold capitalize text-xs">{flag.biasType.replace(/_/g, ' ')}</span>
                  <Badge variant={flag.severity === 'high' ? 'destructive' : 'secondary'}>
                    {flag.severity}
                  </Badge>
                  <Badge variant={flag.isReviewed ? 'success' : 'warning'}>
                    {flag.isReviewed ? 'Reviewed' : 'Pending Review'}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">AI Confidence: {flag.aiConfidence}%</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{flag.explanation}</p>
                {flag.resolution && (
                  <p className="text-[11px] text-green-600 dark:text-green-400 mt-1 font-semibold">Resolution: {flag.resolution}</p>
                )}
              </div>
              {!flag.isReviewed && (
                <Button size="sm" variant="outline" className="flex-shrink-0 text-xs">Review</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Fairness Index', value: '82', unit: '%', desc: 'Appraisal equity score', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30', icon: Shield },
          { label: 'Trust Score', value: '78', unit: '%', desc: 'System confidence rating', color: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40', icon: Target },
          { label: 'Promotion Ready', value: '23', unit: '', desc: 'Employees — high potential', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30', icon: TrendingUp },
          { label: 'Org Health Index', value: '74', unit: '%', desc: 'Overall workforce effectiveness', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30', icon: Activity },
        ].map((f) => (
          <Card key={f.label} className={cn('p-4 border', f.bg)}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{f.label}</div>
              <f.icon className={cn('w-4 h-4', f.color)} />
            </div>
            <div className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              {f.value}<span className="text-xs font-normal text-muted-foreground ml-0.5">{f.unit}</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">{f.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
