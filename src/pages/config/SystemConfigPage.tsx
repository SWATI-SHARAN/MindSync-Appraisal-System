import React, { useState } from 'react';
import { Settings, Lock, Network, Database, CheckCircle2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Label, Select, Badge } from '@/components/ui';
import { toast } from 'sonner';

export default function SystemConfigPage() {
  const [threshold, setThreshold] = useState('85');
  const [minEvidence, setMinEvidence] = useState('2');
  const [syncFreq, setSyncFreq] = useState('Daily');
  const [loading, setLoading] = useState(false);

  const [auditLogs, setAuditLogs] = useState([
    { timestamp: '2024-11-20 14:30:15', user: 'AI Engine', action: 'BLOCK_VALIDATED', details: 'Added performance transaction hash for employee Arjun Sharma.' },
    { timestamp: '2024-11-20 11:15:22', user: 'Suresh Pillai (DGM)', action: 'RATING_RATIFIED', details: 'Confirmed Outstanding rating for E4 Arjun Sharma.' },
    { timestamp: '2024-11-20 09:00:00', user: 'System Cron', action: 'SAP_SYNC_COMPLETED', details: 'Synchronized 500 employee records and certification credits.' },
    { timestamp: '2024-11-19 16:45:00', user: 'Vikram Nair (Mgr)', action: 'EVENT_APPROVED', details: 'Validated event ID ev-001.' },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('System configuration parameters saved.');
  };

  const triggerSync = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('SAP databases synchronized successfully. 12 new certifications detected.');
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            System Control & Audit Configuration
          </h1>
          <p className="text-sm text-muted-foreground">Adjust system parameters, force SAP synchronization, and view system logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" /> System Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="threshold">Outstanding Rating PI Threshold</Label>
                <Input
                  id="threshold"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  type="number"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="evidence">Min Evidence Attachments for High Event</Label>
                <Input
                  id="evidence"
                  value={minEvidence}
                  onChange={(e) => setMinEvidence(e.target.value)}
                  type="number"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="frequency">SAP Sync Frequency</Label>
                <Select id="frequency" value={syncFreq} onChange={(e) => setSyncFreq(e.target.value)}>
                  <option value="Realtime">Real-time webhooks</option>
                  <option value="Hourly">Hourly batch</option>
                  <option value="Daily">Daily batch</option>
                </Select>
              </div>

              <Button type="submit" className="w-full text-xs">Save Parameters</Button>
            </form>
          </CardContent>
        </Card>

        {/* SAP Sync panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" /> SAP Fiori Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-700 dark:text-green-400">Connection: Active</span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Last batch sync completed today at 09:00 AM. 500 records matched.
              </p>
            </div>
            <Button onClick={triggerSync} disabled={loading} className="w-full text-xs gap-1.5">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Syncing SAP…' : 'Force Sync SAP Database'}
            </Button>
          </CardContent>
        </Card>

        {/* Audit Log viewer */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Security Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-72 overflow-y-auto">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-3 border border-border/40 rounded-xl bg-card space-y-1">
                <div className="flex justify-between text-[9px] text-muted-foreground">
                  <span>{log.timestamp}</span>
                  <Badge variant="secondary" className="text-[8px] font-mono">{log.action}</Badge>
                </div>
                <div className="font-semibold text-foreground">{log.user}</div>
                <p className="text-[10px] text-muted-foreground leading-normal">{log.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
