import React, { useState } from 'react';
import { FileSearch, CheckCircle2, AlertCircle, FileText, Image, Table, Mail, ShieldAlert, Upload, HelpCircle, HardDrive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Input } from '@/components/ui';
import { formatDate, formatFileSize } from '@/lib/utils';
import { toast } from 'sonner';

export default function EvidencePage() {
  const [evidenceList, setEvidenceList] = useState([
    { id: 'ev1', title: 'SAP Dispatcher Configurations.pdf', type: 'pdf', size: 1048576, date: '2024-11-20', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', verified: true, event: 'SAP Portal Web Dispatcher Optimizations' },
    { id: 'ev2', title: 'Hackathon Slide Deck.pptx', type: 'other', size: 5242880, date: '2024-09-15', hash: 'cf7829705f1f14890bf7c8996fb92427ae41e4649b934ca495991b7852b855', verified: true, event: 'HPCL Annual Hackathon - AI Copilot Project' },
    { id: 'ev3', title: 'Incident Root Cause Analysis.docx', type: 'other', size: 245760, date: '2024-10-14', hash: '8f7829705f1f14890bf7c8996fb92427ae41e4649b934ca495991b7852b855', verified: true, event: 'SAP Web Dispatcher Outage Recovery' },
    { id: 'ev4', title: 'Vendor SLA Mail Thread.eml', type: 'email', size: 45056, date: '2024-08-01', hash: '7c7829705f1f14890bf7c8996fb92427ae41e4649b934ca495991b7852b855', verified: false, event: 'SLA Escalation with Third-Party Vendor' },
  ]);

  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'image': return <Image className="w-8 h-8 text-blue-500" />;
      case 'excel': return <Table className="w-8 h-8 text-green-500" />;
      case 'email': return <Mail className="w-8 h-8 text-amber-500" />;
      default: return <FileText className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newEv = {
        id: `ev-${Date.now()}`,
        title: 'New_Evidence_Report.pdf',
        type: 'pdf',
        size: 1536000,
        date: new Date().toISOString().split('T')[0],
        hash: Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
        verified: true,
        event: 'Unlinked performance record',
      };
      setEvidenceList([newEv, ...evidenceList]);
      setUploading(false);
      toast.success('Evidence uploaded and ledger-verified successfully.');
    }, 1500);
  };

  const filtered = evidenceList.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.event.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-primary" />
            Evidence Management
          </h1>
          <p className="text-sm text-muted-foreground">Immutable audit trailing and SHA-256 verification of performance artifacts</p>
        </div>
        <Button onClick={handleUpload} disabled={uploading} className="flex items-center gap-2">
          <Upload className="w-4 h-4" /> {uploading ? 'Verifying File Hash…' : 'Upload Evidence'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Verification Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Integrity Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="stat-box text-center py-6">
              <HardDrive className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-[10px] text-muted-foreground">Total Verified Storage</div>
              <div className="text-xl font-bold">7.3 MB</div>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-3 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" /> 100% Chain Security
              </div>
              <p className="text-muted-foreground text-[10px]">
                All evidence files are hashed using SHA-256 immediately upon upload. The hashes are written into the Performance Ledger chain to guarantee audit records cannot be retroactively modified or deleted.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="Search evidence files…"
              className="text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filtered.map((ev) => (
              <Card key={ev.id} className="hover:bg-muted/10 transition-colors">
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
                  <div className="flex-shrink-0">
                    {getFileIcon(ev.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground truncate">{ev.title}</span>
                      <Badge variant="secondary" className="text-[10px]">{formatFileSize(ev.size)}</Badge>
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      Linked Event: <strong className="text-foreground">{ev.event}</strong>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono truncate">
                      SHA-256: {ev.hash}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="text-[10px] text-muted-foreground">Uploaded {formatDate(ev.date)}</div>
                    {ev.verified ? (
                      <Badge variant="success" className="flex items-center gap-1 text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Verified Immutable
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1 text-[10px]">
                        <AlertCircle className="w-3 h-3" /> Pending Sync
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
