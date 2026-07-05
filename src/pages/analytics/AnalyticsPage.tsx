import React from 'react';
import { BarChart3, TrendingUp, Users, ShieldAlert, Cpu, Heart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, Badge } from '@/components/ui';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const deptData = [
    { name: 'Refinery Operations', pi: 81, count: 120, positive: 250, negative: 45 },
    { name: 'Marketing & Sales', pi: 74, count: 95, positive: 180, negative: 32 },
    { name: 'Information Technology', pi: 84, count: 60, positive: 190, negative: 12 },
    { name: 'Finance & Accounts', pi: 79, count: 45, positive: 110, negative: 8 },
    { name: 'Human Resources', pi: 78, count: 30, positive: 90, negative: 5 },
  ];

  const distributionData = [
    { name: 'Rating 1 (Outstanding)', value: 12 },
    { name: 'Rating 2 (Exceeds)', value: 24 },
    { name: 'Rating 3 (Meets)', value: 50 },
    { name: 'Rating 4 (Partially)', value: 10 },
    { name: 'Rating 5 (Unsatisfactory)', value: 4 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Institutional Performance Analytics
          </h1>
          <p className="text-sm text-muted-foreground">Org-wide statistics, department health indices, and rating distributions</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Org Average PI', value: '79.2', sub: '/100', icon: TrendingUp, color: 'text-primary' },
          { label: 'Promotion Ready Talent', value: '64 Emps', sub: 'in E1-E5 grades', icon: Users, color: 'text-green-600' },
          { label: 'Bias Warnings Detected', value: '2 Flags', sub: 'Requires HR mitigation', icon: ShieldAlert, color: 'text-amber-600' },
          { label: 'Org Health Index (OHI)', value: '92.4%', sub: 'Outstanding alignment', icon: Heart, color: 'text-slate-600 dark:text-slate-400' },
        ].map((kpi, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wider">{kpi.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-foreground">{kpi.value}</span>
                  <span className="text-[10px] text-muted-foreground">{kpi.sub}</span>
                </div>
              </div>
              <div className="p-2 rounded bg-muted">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department performance matrix */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Department Performance Matrix</CardTitle>
            <CardDescription>Staff Count vs average performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deptData.map((d) => (
              <div key={d.name} className="space-y-1.5 p-3 border border-border/40 rounded bg-card">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">{d.name}</span>
                  <span className="text-muted-foreground">{d.count} employees</span>
                </div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span>Average Departmental PI Score</span>
                  <span className="font-bold text-primary">{d.pi}/100</span>
                </div>
                <Progress value={d.pi} barClassName="bg-primary" />
                <div className="flex gap-4 pt-1 text-[9px] text-muted-foreground">
                  <span className="text-green-600 font-medium">✓ {d.positive} achievements</span>
                  <span className="text-red-600 font-medium">⚠ {d.negative} challenges</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Rating distribution chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Overall Rating Distribution</CardTitle>
            <CardDescription>Target quota matching index</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2">
              {distributionData.map((entry, index) => (
                <div key={entry.name} className="flex justify-between items-center text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    {entry.name}
                  </span>
                  <span className="font-bold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
