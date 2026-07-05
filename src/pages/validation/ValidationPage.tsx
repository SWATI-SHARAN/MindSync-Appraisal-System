import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertTriangle, Eye, Clock, XCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

export default function ValidationPage() {
  const [pendingQueue, setPendingQueue] = useState([
    { id: 'ev-001', title: 'SAP Portal Web Dispatcher Optimizations', employee: 'Arjun Sharma', department: 'Information Technology', impact: 'High', date: '2024-10-12', currentStep: 2, steps: ['Created', 'Evidence Uploaded', 'Reporting Officer Approval', 'Reviewing Officer Ratification', 'AI Verification'] },
    { id: 'ev-002', title: 'Refinery Boiler Shutdown Mitigation', employee: 'Kiran Patel', department: 'Refinery Operations', impact: 'Critical', date: '2024-11-05', currentStep: 2, steps: ['Created', 'Evidence Uploaded', 'Reporting Officer Approval', 'Reviewing Officer Ratification', 'AI Verification'] },
  ]);

  const [selectedEv, setSelectedEv] = useState<typeof pendingQueue[0] | null>(pendingQueue[0]);

  const handleApprove = (id: string) => {
    toast.success('Performance event validated and advanced to the next level.');
    setPendingQueue(pendingQueue.filter((item) => item.id !== id));
    setSelectedEv(null);
  };

  const handleReject = (id: string) => {
    toast.error('Event rejected and sent back to employee for details.');
    setPendingQueue(pendingQueue.filter((item) => item.id !== id));
    setSelectedEv(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            360° Validation Queue
          </h1>
          <p className="text-sm text-muted-foreground">Approve, reject, or request information on team achievements and performance milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Queue list */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Pending Items ({pendingQueue.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingQueue.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  All validation requests processed. Nice job!
                </div>
              ) : (
                pendingQueue.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEv(item)}
                    className={`p-4 rounded-xl border border-border bg-card cursor-pointer hover:shadow-enterprise transition-all ${selectedEv?.id === item.id ? 'border-primary ring-1 ring-primary' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-sm hover:text-primary transition-colors">{item.title}</h3>
                        <div className="text-[10px] text-muted-foreground mt-1">Submitted by {item.employee} · {item.department}</div>
                      </div>
                      <Badge variant={item.impact === 'Critical' ? 'destructive' : 'warning'} className="text-[10px]">{item.impact}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                      <span>Logged: {formatDate(item.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Stage: {item.steps[item.currentStep]}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel for selected event */}
        <div className="lg:col-span-1">
          {selectedEv ? (
            <Card>
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-sm">Validate Milestone</CardTitle>
                <CardDescription className="text-[10px]">Review evidence and validation chain before signing off.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <div className="font-semibold text-muted-foreground mb-1">Performance Claim</div>
                  <p className="leading-relaxed text-foreground">{selectedEv.title}</p>
                </div>

                {/* Validation Pipeline Stepper */}
                <div className="space-y-3 pt-2">
                  <div className="font-semibold text-muted-foreground">Validation Stepper</div>
                  <div className="space-y-3 pl-3 border-l border-border relative">
                    {selectedEv.steps.map((step, idx) => {
                      const isDone = idx < selectedEv.currentStep;
                      const isCurrent = idx === selectedEv.currentStep;
                      return (
                        <div key={idx} className="relative pl-3">
                          <div className={`absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full border-2 ${isDone ? 'bg-green-500 border-green-500' : isCurrent ? 'bg-primary border-primary animate-pulse' : 'bg-background border-border'}`} />
                          <div className={`font-medium ${isCurrent ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="destructive" onClick={() => handleReject(selectedEv.id)} className="flex-1 text-xs gap-1">
                    <XCircle className="w-4 h-4" /> Decline
                  </Button>
                  <Button onClick={() => handleApprove(selectedEv.id)} className="flex-1 text-xs gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Validate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center border-dashed">
              <CardContent className="pt-6">
                <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">Select a pending request to validate evidence.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
