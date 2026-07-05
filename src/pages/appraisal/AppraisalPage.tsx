import React, { useRef, useState } from 'react';
import { FileText, Download, ShieldCheck, Printer, CheckCircle, Award, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Progress } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function AppraisalPage() {
  const { user } = useAuthStore();
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const handleExportPDF = () => {
    setExporting(true);
    toast.info('Generating official HPCL Appraisal Report…');
    setTimeout(() => {
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob(['Mock Appraisal PDF Report Content'], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `HPCL_Appraisal_${user.name.replace(/\s+/g, '_')}_2024.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setExporting(false);
      toast.success('Appraisal PDF downloaded successfully.');
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Year-End Appraisal Report
          </h1>
          <p className="text-sm text-muted-foreground">Auto-collated, evidence-backed evaluation dossiers for final committee ratification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print Dossier
          </Button>
          <Button onClick={handleExportPDF} disabled={exporting} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> {exporting ? 'Compiling PDF…' : 'Export Official PDF'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Status card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Report Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-4 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto" />
              <div>
                <div className="font-semibold text-green-800 dark:text-green-400">Ready for Committee</div>
                <div className="text-[10px] text-muted-foreground mt-1">Hashed & Sealed on Dec 15</div>
              </div>
              <Badge variant="success">Code: Verified</Badge>
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Appraisal Period</span>
                <span className="font-medium text-foreground">FY 2024-2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Form Status</span>
                <span className="font-medium text-foreground">Submitted</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ledger Sync</span>
                <span className="font-medium text-green-500">Synchronized</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Printable Report Panel */}
        <div className="lg:col-span-3" ref={reportRef}>
          <Card className="p-8 border shadow-enterprise-lg bg-card text-foreground">
            <CardContent className="space-y-8">
              {/* HPCL Logo Placeholder */}
              <div className="flex justify-between items-start border-b border-border pb-6">
                <div>
                  <div className="text-lg font-bold">Hindustan Petroleum Corporation Limited</div>
                  <div className="text-muted-foreground">Continuous Performance Evaluation System</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Official Employee Dossier</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-primary">MeritSync</div>
                  <div className="text-[10px] text-muted-foreground">Dossier ID: HPCL-2024-DM-001</div>
                </div>
              </div>

              {/* Employee demographics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Employee Name</div>
                  <div className="font-semibold text-foreground">{user.name}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Employee ID</div>
                  <div className="font-semibold text-foreground">{user.employeeId}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Grade / Designation</div>
                  <div className="font-semibold text-foreground">{user.grade} / {user.designation}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Department</div>
                  <div className="font-semibold text-foreground">{user.department}</div>
                </div>
              </div>

              {/* Evaluation score summary */}
              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" /> Evaluation Summary Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="stat-box">
                    <div className="text-muted-foreground mb-1">Evidence-backed PI Score</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-green-600">86</span>
                      <span className="text-muted-foreground">/ 100</span>
                    </div>
                    <Progress value={86} className="h-1 mt-2" barClassName="bg-green-600" />
                  </div>
                  <div className="stat-box">
                    <div className="text-muted-foreground mb-1">AI Predicted Rating</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-primary">Rating 1</span>
                      <span className="text-xs text-muted-foreground font-semibold">Outstanding</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2">89% confidence scoring logic</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-muted-foreground mb-1">Endorsements Received</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-violet-500">3 Peer</span>
                      <span className="text-muted-foreground">Endorsements</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2">Validated by managers</div>
                  </div>
                </div>
              </div>

              {/* collated achievements list */}
              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" /> Verified Achievements & Milestones
                </h3>
                <div className="space-y-4 pt-2">
                  {[
                    { title: 'SAP Portal Web Dispatcher Optimizations', date: 'Oct 12, 2024', desc: 'Successfully optimized the dispatcher parameters reducing the refinery network configuration load by 35% and improving uptime metrics.', impact: 'High Operational Efficiency' },
                    { title: 'HPCL Annual Hackathon - AI Copilot Project', date: 'Sep 15, 2024', desc: 'Engineered an AI-powered copilot module for continuous talent validation, winning first place in the innovation category.', impact: 'Critical Innovation' },
                  ].map((ach, i) => (
                    <div key={i} className="space-y-1 relative pl-4 border-l-2 border-border">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-foreground">{ach.title}</span>
                        <span className="text-muted-foreground">{ach.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[10px]">{ach.desc}</p>
                      <Badge variant="secondary" className="text-[8px] mt-1">{ach.impact}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Committee Sign-off blocks */}
              <div className="border-t border-border pt-12 grid grid-cols-2 gap-8 text-center text-[10px]">
                <div>
                  <div className="border-b border-border pb-8 mb-2 mx-auto max-w-[150px]"></div>
                  <div className="font-bold text-foreground">Vikram Nair</div>
                  <div className="text-muted-foreground">Reporting Officer (E6)</div>
                </div>
                <div>
                  <div className="border-b border-border pb-8 mb-2 mx-auto max-w-[150px]"></div>
                  <div className="font-bold text-foreground">Suresh Pillai</div>
                  <div className="text-muted-foreground">Reviewing Officer (E7)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
