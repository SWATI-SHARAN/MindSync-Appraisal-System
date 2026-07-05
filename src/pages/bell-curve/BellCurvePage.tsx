import React, { useState } from 'react';
import { Target, AlertTriangle, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';

export default function BellCurvePage() {
  const [adjusted, setAdjusted] = useState(false);

  const initialData = [
    { name: 'Rating 1 (Outstanding)', recommended: 15, quota: 10, actual: 15 },
    { name: 'Rating 2 (Exceeds)', recommended: 25, quota: 20, actual: 25 },
    { name: 'Rating 3 (Meets)', recommended: 45, quota: 50, actual: 48 },
    { name: 'Rating 4 (Partially Meets)', recommended: 10, quota: 15, actual: 12 },
    { name: 'Rating 5 (Does Not Meet)', recommended: 5, quota: 5, actual: 5 },
  ];

  const adjustedData = [
    { name: 'Rating 1 (Outstanding)', recommended: 15, quota: 10, actual: 10 },
    { name: 'Rating 2 (Exceeds)', recommended: 25, quota: 20, actual: 20 },
    { name: 'Rating 3 (Meets)', recommended: 45, quota: 50, actual: 52 },
    { name: 'Rating 4 (Partially Meets)', recommended: 10, quota: 15, actual: 13 },
    { name: 'Rating 5 (Does Not Meet)', recommended: 5, quota: 5, actual: 5 },
  ];

  const data = adjusted ? adjustedData : initialData;

  const triggerAdjustment = () => {
    setAdjusted(true);
    toast.success('Bell curve auto-adjust completed. Normalised 12 employee ratings to fit departmental quotas.');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Bell Curve Analyzer & Normalizer
          </h1>
          <p className="text-sm text-muted-foreground">Adjust actual manager ratings to align with institutional department quotas</p>
        </div>
        <Button onClick={triggerAdjustment} disabled={adjusted} className="flex items-center gap-2">
          ⚡ Auto-Fit Bell Curve Quotas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart representation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Rating Distribution Comparison</CardTitle>
            <CardDescription>Target Quota % vs Realized Rating Count %</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="quota" fill="#3b82f6" name="Target Quota %" />
                  <Bar dataKey="actual" fill="#8b5cf6" name="Actual / Assigned %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quota breakdown details */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-primary" /> Quota Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Rating 1 (Outstanding) Limit</span>
                <Badge variant={adjusted ? 'success' : 'destructive'}>{adjusted ? 'In Quota (10%)' : 'Exceeded (15%)'}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Rating 2 (Exceeds) Limit</span>
                <Badge variant={adjusted ? 'success' : 'destructive'}>{adjusted ? 'In Quota (20%)' : 'Exceeded (25%)'}</Badge>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-3 text-xs leading-relaxed text-blue-700 dark:text-blue-300">
              <div className="font-semibold flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Objective Normalization
              </div>
              <p className="text-[10px]">
                When managers inflate scores, the auto-fit engine targets employees with the lowest validation score weightings (e.g. unverified achievements or low feedback consistency) for normalization adjustments, protecting true top performers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
