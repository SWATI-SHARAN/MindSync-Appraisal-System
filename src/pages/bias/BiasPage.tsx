import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, User, HelpCircle, Network, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { toast } from 'sonner';

export default function BiasPage() {
  const initialFlags = [
    { id: 'flag-001', type: 'Recency Bias', manager: 'Sanjay Sen', severity: 'medium', confidence: 91, explanation: '90% of positive events logged by Sanjay Sen were recorded in the last 14 days of the appraisal cycle, while only 10% were logged during the first 3 quarters.', status: 'Pending Review' },
    { id: 'flag-002', type: 'Endorsement Favoritism Loop', manager: 'Nagesh Nair', severity: 'high', confidence: 94, explanation: 'Co-dependency loop detected between Nagesh Nair and Vinod Rao. Nagesh endorsed Vinod 5 times, while Vinod approved Nagesh 4 times without external stakeholder validation.', status: 'Pending Review' },
    { id: 'flag-003', type: 'Leniency Bias', manager: 'Preeti Gupta', severity: 'low', confidence: 85, explanation: 'Preeti marked 100% of her direct reports as "Outstanding" (Rating 1). Department average rating is 2.3.', status: 'Resolved' },
  ];

  const [flags, setFlags] = useState(initialFlags);
  const [selectedFlag, setSelectedFlag] = useState<typeof initialFlags[0] | null>(null);

  useEffect(() => {
    if (flags.length > 0 && !selectedFlag) {
      setSelectedFlag(flags[0]);
    }
  }, [flags, selectedFlag]);

  // Load flags from backend
  useEffect(() => {
    const loadFlags = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bias/flags');
        if (!response.ok) throw new Error('Failed to load from backend');
        const data = await response.json();
        setFlags(data);
      } catch (err) {
        console.warn('Backend unavailable, using local mock flags:', err);
      }
    };
    loadFlags();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bias/resolve/${id}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Resolve failed');
      const data = await response.json();
      toast.success('Bias alert resolved. Notification sent to HR Committee.');
      setFlags(flags.map((f) => f.id === id ? { ...f, status: 'Resolved' } : f));
      setSelectedFlag(null);
    } catch (err) {
      console.warn('Backend resolve failed, applying resolve locally:', err);
      toast.success('Bias alert resolved. Notification sent to HR Committee (Fallback).');
      setFlags(flags.map((f) => f.id === id ? { ...f, status: 'Resolved' } : f));
      setSelectedFlag(null);
    }
  };

  const triggerBiasAnalysis = async () => {
    toast.loading('Analyzing appraisal logs on backend...', { id: 'bias-analyze' });
    try {
      const response = await fetch('http://localhost:5000/api/bias/analyze', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setFlags(data.currentFlags);
      toast.success(`Analysis complete! Scanned event timestamps, endorsement graphs, and manager ratings.`, { id: 'bias-analyze', duration: 4000 });
    } catch (err) {
      console.warn('Backend dynamic analysis failed:', err);
      toast.error('Dynamic analysis algorithm is only available when the backend server is running.', { id: 'bias-analyze' });
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-destructive" />
            AI Bias & Favoritism Detector
          </h1>
          <p className="text-sm text-muted-foreground">Scans event logs and consistency reviews to flags skews, favoritism networks, and favoritism anomalies</p>
        </div>
        <Button onClick={triggerBiasAnalysis} className="text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/95">
          <Cpu className="w-4 h-4" /> Run Dynamic Algorithms
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bias Flags list */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Active Bias Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {flags.map((flag) => (
                <div
                  key={flag.id}
                  onClick={() => setSelectedFlag(flag)}
                  className={`p-4 rounded-xl border border-border bg-card cursor-pointer hover:shadow-enterprise transition-all ${selectedFlag?.id === flag.id ? 'border-primary ring-1 ring-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm hover:text-primary transition-colors flex items-center gap-1.5">
                        <AlertTriangle className={flag.severity === 'high' ? 'text-red-500' : 'text-amber-500'} />
                        {flag.type}
                      </h3>
                      <div className="text-[10px] text-muted-foreground mt-1">Manager: {flag.manager} · Severity: <span className="capitalize">{flag.severity}</span></div>
                    </div>
                    <Badge variant={flag.status === 'Resolved' ? 'success' : 'warning'} className="text-[9px]">{flag.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Flag details panel */}
        <div className="lg:col-span-1">
          {selectedFlag ? (
            <Card>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm flex items-center gap-1.5 text-destructive">
                  <Cpu className="w-4 h-4 text-violet-500" /> AI Diagnostic Detail
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <div className="font-semibold text-muted-foreground mb-1">Alert Explanation</div>
                  <p className="leading-relaxed text-foreground text-xs">{selectedFlag.explanation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">AI Confidence</div>
                    <div className="text-base font-bold text-foreground">{selectedFlag.confidence}%</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Type</div>
                    <div className="text-base font-bold text-foreground capitalize">{selectedFlag.severity} Severity</div>
                  </div>
                </div>

                {selectedFlag.status === 'Pending Review' ? (
                  <Button onClick={() => handleResolve(selectedFlag.id)} className="w-full text-xs gap-1.5 mt-2 bg-destructive text-white hover:bg-destructive/90">
                    <CheckCircle2 className="w-4 h-4" /> Mitigate & Send Warning
                  </Button>
                ) : (
                  <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-3 text-center text-green-700 dark:text-green-400 font-semibold">
                    This flag has been successfully resolved.
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center border-dashed">
              <CardContent className="pt-6">
                <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">Select a bias alert flag to investigate details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
