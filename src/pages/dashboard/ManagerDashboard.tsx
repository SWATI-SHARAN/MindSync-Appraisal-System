import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Activity, Shield, CheckCircle, Clock, AlertTriangle,
  TrendingUp, BarChart3, ChevronRight, Star, FileText
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Avatar, Button } from '@/components/ui';
import { arjunEvents } from '@/data/events';
import { arjunConsistencyReviews } from '@/data/performance';
import { formatDate, getRatingLabel, cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const teamMembers = [
  { name: 'Arjun Sharma', id: 'HPCL0001', pi: 86, rating: 1, grade: 'E4', events: 4, trend: 'up' },
  { name: 'Divya Menon', id: 'HPCL0018', pi: 79, rating: 2, grade: 'E3', events: 3, trend: 'up' },
  { name: 'Ramesh Patel', id: 'HPCL0031', pi: 71, rating: 2, grade: 'E4', events: 5, trend: 'stable' },
  { name: 'Sunita Roy', id: 'HPCL0045', pi: 64, rating: 3, grade: 'E3', events: 2, trend: 'down' },
  { name: 'Manoj Tiwari', id: 'HPCL0062', pi: 58, rating: 3, grade: 'E2', events: 1, trend: 'stable' },
];

const pendingValidations = [
  { employee: 'Divya Menon', event: 'Process automation initiative saving 30 hrs/week', type: 'positive', daysAgo: 2 },
  { employee: 'Ramesh Patel', event: 'Quarterly KPI target exceeded by 18%', type: 'positive', daysAgo: 5 },
  { employee: 'Manoj Tiwari', event: 'SLA breach — critical ticket unresolved for 72 hrs', type: 'negative', daysAgo: 1 },
];

const teamPITrend = [
  { month: 'Sep', avg: 68 }, { month: 'Oct', avg: 70 }, { month: 'Nov', avg: 72 }, { month: 'Dec', avg: 73 },
];

export default function ManagerDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reporting Officer Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your team's performance events, reviews, and validations</p>
      </div>

      {/* KPI Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Team Size', value: '5', icon: Users, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
          { label: 'Pending Validations', value: '3', icon: Shield, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50' },
          { label: 'Events This Month', value: '8', icon: Activity, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50' },
          { label: 'Avg Team PI Score', value: '71.6', icon: TrendingUp, color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20 border border-green-200/50' },
        ].map((m) => (
          <Card key={m.label} className="metric-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                <p className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">{m.value}</p>
              </div>
              <div className={cn('p-2 rounded', m.bg)}>
                <m.icon className={cn('w-4.5 h-4.5', m.color)} />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  My Team — PI Score Overview
                </CardTitle>
                <Link to="/team"><Button variant="ghost" size="sm" className="text-xs">View All <ChevronRight className="w-3 h-3" /></Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>PI Score</th>
                    <th>Predicted Rating</th>
                    <th>Events</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <Avatar name={m.name} size="sm" />
                          <div>
                            <div className="text-sm font-medium">{m.name}</div>
                            <div className="text-xs text-muted-foreground">{m.id} · {m.grade}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={cn('font-bold text-xs', m.pi >= 80 ? 'text-green-600' : m.pi >= 65 ? 'text-blue-600' : 'text-amber-600')}>
                            {m.pi}
                          </span>
                          <Progress value={m.pi} className="w-16 h-1" />
                        </div>
                      </td>
                      <td>
                        <Badge variant={m.rating === 1 ? 'success' : m.rating === 2 ? 'info' : 'warning'}>
                          Rating {m.rating}
                        </Badge>
                      </td>
                      <td className="text-xs text-muted-foreground">{m.events} events</td>
                      <td>
                        <div className={cn(
                          'flex items-center gap-1 text-xs',
                          m.trend === 'up' ? 'text-green-600' : m.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                        )}>
                          {m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '—'} Trend
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Team Avg PI Trend */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4 text-primary" />
                Team Avg PI Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={teamPITrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 80]} tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 11 }} />
                    <Line type="monotone" dataKey="avg" stroke="#0056A6" strokeWidth={2} dot={{ fill: '#0056A6', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader><CardTitle className="text-xs font-semibold">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {[
                { label: 'Log Positive Event', to: '/events/new', icon: CheckCircle, color: 'text-green-600' },
                { label: 'Log Negative Event', to: '/events/new', icon: AlertTriangle, color: 'text-red-600' },
                { label: 'Submit Q4 Review', to: '/consistency', icon: Star, color: 'text-amber-600' },
                { label: 'AI Event Analyzer', to: '/ai-analyzer', icon: Activity, color: 'text-slate-600' },
              ].map((a) => (
                <Link key={a.label} to={a.to}>
                  <button className="w-full flex items-center gap-2.5 p-2 rounded hover:bg-muted/40 transition-colors text-left">
                    <a.icon className={cn('w-4 h-4', a.color)} />
                    <span className="text-xs font-medium">{a.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                  </button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pending Validations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              Pending Validations
              <Badge variant="warning">{pendingValidations.length}</Badge>
            </CardTitle>
            <Link to="/validation"><Button variant="ghost" size="sm" className="text-xs">Validate All <ChevronRight className="w-3.5 h-3.5" /></Button></Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendingValidations.map((v, i) => (
            <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className={cn('w-8 h-8 rounded flex items-center justify-center flex-shrink-0', v.type === 'positive' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20')}>
                {v.type === 'positive' ? <CheckCircle className="w-4.5 h-4.5 text-green-600 dark:text-green-400" /> : <AlertTriangle className="w-4.5 h-4.5 text-red-600 dark:text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs text-foreground">{v.employee}</div>
                <div className="text-[11px] text-muted-foreground truncate mt-0.5">{v.event}</div>
                <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Submitted {v.daysAgo}d ago
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/10">Reject</Button>
                <Button size="sm" className="text-xs">Approve</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
