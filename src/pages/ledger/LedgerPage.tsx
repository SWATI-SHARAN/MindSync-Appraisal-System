import React, { useState } from 'react';
import { ClipboardList, Shield, Search, CheckCircle2, Lock, ArrowUpRight, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Input, Badge } from '@/components/ui';
import { formatDateTime } from '@/lib/utils';

export default function LedgerPage() {
  const [ledgerBlocks, setLedgerBlocks] = useState([
    { id: 'tx-009', action: 'EVENT_VERIFIED', actor: 'AI Engine', role: 'ai', details: 'Validated impact category "Operational Efficiency" for event "SAP Portal Web Dispatcher Optimizations".', timestamp: '2024-11-20T14:30:15Z', blockIndex: 1403, hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2' },
    { id: 'tx-008', action: 'EVENT_APPROVED', actor: 'Suresh Pillai', role: 'reviewing_officer', details: 'Ratified validation for event "SAP Portal Web Dispatcher Optimizations" with positive confirmation.', timestamp: '2024-11-20T11:15:22Z', blockIndex: 1402, hash: 'f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1' },
    { id: 'tx-007', action: 'EVENT_VALIDATED', actor: 'Vikram Nair', role: 'reporting_officer', details: 'Approved event "SAP Portal Web Dispatcher Optimizations" with rating weight +0.45.', timestamp: '2024-11-19T16:45:00Z', blockIndex: 1401, hash: '3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d' },
    { id: 'tx-006', action: 'FEEDBACK_LOGGED', actor: 'Meena Krishnan', role: 'internal_customer', details: 'Submitted endorsement feedback for Arjun Sharma regarding project support.', timestamp: '2024-11-10T10:05:40Z', blockIndex: 1398, hash: 'b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6' },
    { id: 'tx-005', action: 'CONSISTENCY_SUBMITTED', actor: 'Vikram Nair', role: 'reporting_officer', details: 'Submitted Q4 consistency review ratings (overall: 4.67/5) for Arjun Sharma.', timestamp: '2024-10-31T18:22:11Z', blockIndex: 1388, hash: '7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b' },
    { id: 'tx-004', action: 'EVENT_CREATED', actor: 'Arjun Sharma', role: 'employee', details: 'Created performance event "SAP Portal Web Dispatcher Optimizations" and uploaded architectural_diagram.pdf.', timestamp: '2024-10-12T09:14:52Z', blockIndex: 1374, hash: 'f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6' },
  ]);

  const [search, setSearch] = useState('');

  const filtered = ledgerBlocks.filter((b) =>
    b.action.toLowerCase().includes(search.toLowerCase()) ||
    b.actor.toLowerCase().includes(search.toLowerCase()) ||
    b.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            Performance Ledger
          </h1>
          <p className="text-sm text-muted-foreground">Cryptographically signed, immutable audit trial ensuring complete platform accountability</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
          <Shield className="w-4 h-4" /> Blockchain-grade Audit Guard Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Ledger statistics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Ledger Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="stat-box">
              <div className="text-[10px] text-muted-foreground">Current Ledger Height</div>
              <div className="text-xl font-bold">Block #1403</div>
            </div>
            <div className="stat-box">
              <div className="text-[10px] text-muted-foreground">Total Transactions</div>
              <div className="text-xl font-bold">12,488 Trans</div>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-3">
              <div className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 mb-1">
                <Lock className="w-3.5 h-3.5" /> Immutable Guarantee
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Every action is cryptographically sealed. Changes to prior blocks require invalidating the entire manager chain. This prevents back-dating ratings or erasing records.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline viewer */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="Search ledger blocks (Action, Actor, Details)…"
              className="text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative border-l border-border pl-6 space-y-6 ml-2">
            {filtered.map((block) => (
              <div key={block.id} className="relative">
                {/* Node icon */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-enterprise" />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">Block #{block.blockIndex}</span>
                    <Badge variant={block.action.startsWith('EVENT') ? 'success' : 'info'} className="text-[9px] font-semibold tracking-wider font-mono">
                      {block.action}
                    </Badge>
                    <span className="text-muted-foreground text-[10px] ml-auto">{formatDateTime(block.timestamp)}</span>
                  </div>
                  <Card className="bg-card/40">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <p className="font-medium text-foreground text-xs leading-relaxed">{block.details}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[9px] text-muted-foreground border-t border-border/40 pt-2 font-mono">
                        <div>
                          Actor: <strong className="text-foreground">{block.actor}</strong> ({block.role.replace('_', ' ')})
                        </div>
                        <div className="truncate flex-1 max-w-sm ml-auto">
                          Hash: <span className="text-foreground">{block.hash}</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
