import React, { useState } from 'react';
import { Users, Search, Star, Target, CheckCircle2, AlertTriangle, Shield, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Select, Label, Badge, Avatar, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '@/components/ui';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

export default function TeamPage() {
  const [team, setTeam] = useState([
    { id: 'usr-emp-001', name: 'Arjun Sharma', designation: 'Deputy Manager', grade: 'E4', pi: 86, rating: 1, department: 'Information Technology', lastReview: '2024-Q4' },
    { id: 'usr-emp-002', name: 'Kiran Patel', designation: 'Senior Engineer', grade: 'E3', pi: 78, rating: 2, department: 'Information Technology', lastReview: '2024-Q4' },
    { id: 'usr-emp-003', name: 'Seema Rao', designation: 'Engineer', grade: 'E2', pi: 64, rating: 3, department: 'Information Technology', lastReview: '2024-Q3' },
  ]);

  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Consistency review form states
  const [timeliness, setTimeliness] = useState('5');
  const [quality, setQuality] = useState('5');
  const [collaboration, setCollaboration] = useState('4');
  const [ownership, setOwnership] = useState('5');
  const [communication, setCommunication] = useState('4');
  const [discipline, setDiscipline] = useState('5');
  const [comments, setComments] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    toast.success(`Consistency review submitted for ${selectedMember.name}`);
    setShowReviewModal(false);
    setComments('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            My Team & Performance Management
          </h1>
          <p className="text-sm text-muted-foreground">Monitor team PI scores, validate achievements, and log consistency reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team list */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Team Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {team.map((member) => (
                <div key={member.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-border bg-card hover:bg-muted/10 transition-colors gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} size="md" />
                    <div>
                      <div className="font-semibold text-sm text-foreground">{member.name}</div>
                      <div className="text-muted-foreground">{member.designation} · Grade {member.grade}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-[10px] text-muted-foreground">PI Score</div>
                      <div className="font-bold text-sm text-primary">{member.pi}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-muted-foreground">Last Review</div>
                      <Badge variant="secondary" className="mt-0.5 text-[9px]">{member.lastReview}</Badge>
                    </div>
                    <Button
                      onClick={() => { setSelectedMember(member); setShowReviewModal(true); }}
                      size="sm"
                      className="text-[10px] h-8"
                    >
                      Quarterly Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Manager guidelines card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Manager Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              MeritSync tracks daily achievements automatically, but managers must review consistency parameters quarterly.
            </p>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-3 space-y-1 text-amber-800 dark:text-amber-300">
              <div className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Q4 Appraisals Close Dec 31
              </div>
              <p className="text-[10px]">
                Please complete reviews for all direct reports. Scores will automatically merge with project indicators in the final appraisal dossier.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Consistency Review Modal */}
      <Dialog open={showReviewModal} onClose={() => setShowReviewModal(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Quarterly Consistency Review: {selectedMember?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="timeliness">Timeliness (1 - 5)</Label>
                <Select id="timeliness" value={timeliness} onChange={(e) => setTimeliness(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="quality">Work Quality (1 - 5)</Label>
                <Select id="quality" value={quality} onChange={(e) => setQuality(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="collaboration">Collaboration (1 - 5)</Label>
                <Select id="collaboration" value={collaboration} onChange={(e) => setCollaboration(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="ownership">Ownership (1 - 5)</Label>
                <Select id="ownership" value={ownership} onChange={(e) => setOwnership(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="communication">Communication (1 - 5)</Label>
                <Select id="communication" value={communication} onChange={(e) => setCommunication(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="discipline">Discipline (1 - 5)</Label>
                <Select id="discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="comments">Manager Comments *</Label>
              <Textarea
                id="comments"
                rows={3}
                required
                placeholder="Detail key behaviors, strengths, and development areas observed during this quarter."
                value={comments}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setShowReviewModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
