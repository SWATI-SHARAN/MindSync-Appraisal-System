import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, CheckCircle, AlertTriangle, Search, Plus, X, Upload,
  Cpu, Zap, Info, Shield, Users, Building2, Eye, Award
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Select, Label, Badge, Progress, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';
import { arjunEvents } from '@/data/events';
import { formatDate, getImpactColor, getSentimentColor } from '@/lib/utils';
import { toast } from 'sonner';

interface AIAnalysisResult {
  ownership: number;
  leadership: number;
  initiative: number;
  innovation: number;
  teamwork: number;
  problemSolving: number;
  customerFocus: number;
  suggestedImpactScore: number;
  suggestedRatingInfluence: number;
  confidence: number;
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  autoTags: string[];
  explanation: string;
}

export default function EventsPage() {
  const { user } = useAuthStore();
  const [events, setEvents] = useState(arjunEvents);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof arjunEvents[0] | null>(null);

  // Form states
  const [formType, setFormType] = useState<'positive' | 'negative'>('positive');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [impactLevel, setImpactLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [impactCat, setImpactCat] = useState('Operational Efficiency');
  const [affectedDept, setAffectedDept] = useState('Information Technology');
  const [businessValue, setBusinessValue] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [fileName, setFileName] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState('');

  // AI analysis mock
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleTextChange = (text: string) => {
    setDesc(text);
    if (text.toLowerCase().includes('sap') && text.toLowerCase().includes('downtime')) {
      setDuplicateWarning('Warning: Similar event logged on Oct 12: "SAP Portal Downtime Recovery". Similiarity 87%.');
    } else {
      setDuplicateWarning('');
    }
  };

  const runAIAnalysis = () => {
    if (!desc) {
      toast.error('Please write a description first.');
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      // Rule-based simulation based on description keywords
      const text = desc.toLowerCase();
      let ownership = 70, leadership = 65, initiative = 75, innovation = 60, teamwork = 70;
      let score = 75;
      let tags = ['Execution'];
      let explanation = 'The event demonstrates solid execution and standard problem resolution.';

      if (text.includes('optimize') || text.includes('automated') || text.includes('innovation')) {
        innovation = 95;
        initiative = 90;
        score = 92;
        tags.push('Automation', 'Innovation');
        explanation = 'Highly innovative contribution. Automated manual efforts, creating long-term business value and high operational efficiency.';
      }
      if (text.includes('lead') || text.includes('led') || text.includes('guided')) {
        leadership = 90;
        teamwork = 85;
        score = 88;
        tags.push('Leadership', 'Collaboration');
        explanation = 'Strong leadership demonstrated. Guided team members during a high-stakes scenario to achieve critical outcomes.';
      }
      if (text.includes('saved') || text.includes('recovered') || text.includes('resolved')) {
        ownership = 92;
        score = 85;
        tags.push('Incident Response', 'Problem Solving');
        explanation = 'Excellent ownership. Quickly resolved operational issues and mitigated downtime, protecting business operations.';
      }

      setAiAnalysis({
        ownership,
        leadership,
        initiative,
        innovation,
        teamwork,
        problemSolving: Math.max(ownership, innovation),
        customerFocus: 80,
        suggestedImpactScore: score,
        suggestedRatingInfluence: +(score / 20).toFixed(2),
        confidence: 94,
        sentiment: text.includes('critical') ? 'neutral' : 'very_positive',
        sentimentScore: 0.88,
        autoTags: tags,
        explanation
      });
      setAnalyzing(false);
      toast.success('AI analysis complete.');
    }, 1200);
  };

  const handleLogEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const newEvent = {
      id: `ev-new-${Date.now()}`,
      type: formType,
      title,
      description: desc,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      submittedBy: user?.id ?? 'usr-emp-001',
      submittedByName: user?.name ?? 'Arjun Sharma',
      employeeId: user?.id ?? 'usr-emp-001',
      employeeName: user?.name ?? 'Arjun Sharma',
      departmentId: user?.departmentId ?? 'dept-03',
      impactCategory: impactCat,
      impactLevel,
      departmentAffected: affectedDept,
      businessValue,
      stakeholderIds: stakeholders ? stakeholders.split(',').map((s) => s.trim()) : [],
      evidenceIds: fileName ? ['ev-file-new'] : [],
      status: 'submitted' as const,
      aiScore: aiAnalysis ? {
        ...aiAnalysis,
        sentiment: aiAnalysis.sentiment as any,
        autoTags: aiAnalysis.autoTags
      } : undefined,
    };

    setEvents([newEvent, ...events]);
    toast.success('Event logged successfully.');
    setShowAddModal(false);
    // Reset form
    setTitle('');
    setDesc('');
    setBusinessValue('');
    setFileName('');
    setAiAnalysis(null);
    setDuplicateWarning('');
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === 'positive' && ev.type !== 'positive') return false;
    if (filter === 'negative' && ev.type !== 'negative') return false;
    return ev.title.toLowerCase().includes(search.toLowerCase()) || ev.description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Performance Ledger Events
          </h1>
          <p className="text-sm text-muted-foreground">Continuous capture of achievements, milestones, and challenges</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Performance Event
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'positive', 'negative'].map((t) => (
            <Button
              key={t}
              variant={filter === t ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(t as any)}
              className="capitalize text-xs"
            >
              {t} Events
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events…"
            className="pl-9 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredEvents.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No events found matching current criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((ev) => (
              <motion.div
                layout
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="cursor-pointer"
              >
                <Card className={`border-l-4 hover:shadow-card-hover transition-all duration-300 ${ev.type === 'positive' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">{formatDate(ev.date)}</div>
                        <h3 className="font-semibold text-sm hover:text-primary transition-colors">{ev.title}</h3>
                      </div>
                      <Badge variant={ev.status === 'approved' ? 'success' : 'warning'} className="text-[10px] capitalize">
                        {ev.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{ev.description}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 text-[10px]">
                      <Badge variant="secondary">{ev.impactCategory}</Badge>
                      <Badge className={getImpactColor(ev.impactLevel)}>{ev.impactLevel}</Badge>
                      {ev.aiScore && (
                        <Badge variant="info" className="flex items-center gap-1">
                          <Cpu className="w-2.5 h-2.5" /> AI Scored: {ev.aiScore.suggestedImpactScore}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Selected Event Details Panel */}
        <div className="space-y-4">
          {selectedEvent ? (
            <Card className="sticky top-6">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={selectedEvent.type === 'positive' ? 'success' : 'destructive'} className="capitalize text-[10px]">
                    {selectedEvent.type} Event
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)} className="h-6 w-6">
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <CardTitle className="text-base">{selectedEvent.title}</CardTitle>
                <CardDescription className="text-[10px]">Logged on {formatDate(selectedEvent.date)}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                <div>
                  <div className="font-semibold text-muted-foreground mb-1">Description</div>
                  <p className="leading-relaxed text-foreground">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 border-y border-border py-3">
                  <div>
                    <div className="text-muted-foreground">Impact Category</div>
                    <div className="font-medium text-foreground">{selectedEvent.impactCategory}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Impact Level</div>
                    <div className="font-medium capitalize text-foreground">{selectedEvent.impactLevel}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-muted-foreground">Affected Department</div>
                    <div className="font-medium text-foreground">{selectedEvent.departmentAffected}</div>
                  </div>
                  {selectedEvent.businessValue && (
                    <div className="mt-2">
                      <div className="text-muted-foreground">Business Value</div>
                      <div className="font-medium text-foreground">{selectedEvent.businessValue}</div>
                    </div>
                  )}
                </div>

                {selectedEvent.aiScore && (
                  <div className="ai-panel p-3">
                    <div className="flex items-center gap-1.5 font-semibold gradient-text-ai mb-2">
                      <Cpu className="w-4 h-4 text-violet-500" /> AI Insights Analyzer
                    </div>
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-muted-foreground">Ownership Competency</span>
                          <span className="font-semibold text-foreground">{selectedEvent.aiScore.ownership}%</span>
                        </div>
                        <Progress value={selectedEvent.aiScore.ownership} barClassName="bg-blue-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-muted-foreground">Innovation & Creativity</span>
                          <span className="font-semibold text-foreground">{selectedEvent.aiScore.innovation}%</span>
                        </div>
                        <Progress value={selectedEvent.aiScore.innovation} barClassName="bg-violet-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-muted-foreground">Problem Solving</span>
                          <span className="font-semibold text-foreground">{selectedEvent.aiScore.problemSolving}%</span>
                        </div>
                        <Progress value={selectedEvent.aiScore.problemSolving} barClassName="bg-green-500" />
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground italic mb-2">
                      "{selectedEvent.aiScore.explanation}"
                    </div>
                    <div className="flex justify-between text-[10px] pt-2 border-t border-border/30">
                      <span>Sentiment: <span className={getSentimentColor(selectedEvent.aiScore.sentiment)}>{selectedEvent.aiScore.sentiment.replace('_', ' ')}</span></span>
                      <span>Confidence: {selectedEvent.aiScore.confidence}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center border-dashed">
              <CardContent className="pt-6">
                <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">Select an event to view full analysis and validation details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Log Event Modal */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Log Performance Event
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>Capture details, upload evidence, and analyze impact immediately with AI.</CardDescription>
          </DialogHeader>
          <form onSubmit={handleLogEvent} className="space-y-4 pt-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Event Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formType === 'positive' ? 'default' : 'outline'}
                    className="flex-1 text-xs"
                    onClick={() => setFormType('positive')}
                  >
                    ✓ Achievement
                  </Button>
                  <Button
                    type="button"
                    variant={formType === 'negative' ? 'destructive' : 'outline'}
                    className="flex-1 text-xs"
                    onClick={() => setFormType('negative')}
                  >
                    ⚠ Challenge / Failure
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="impactLevel">Impact Severity</Label>
                <Select id="impactLevel" value={impactLevel} onChange={(e) => setImpactLevel(e.target.value as any)}>
                  <option value="low">Low Impact</option>
                  <option value="medium">Medium Impact</option>
                  <option value="high">High Impact</option>
                  <option value="critical">Critical Impact</option>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                required
                placeholder="e.g. Optimized SAP Web Dispatcher Configuration"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="desc">Event Description *</Label>
              <Textarea
                id="desc"
                required
                rows={4}
                placeholder="Provide a detailed description of what happened, what role you played, and the results achieved."
                value={desc}
                onChange={(e) => handleTextChange(e.target.value)}
              />
              {duplicateWarning && (
                <div className="text-red-500 font-medium flex items-center gap-1 mt-1 text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {duplicateWarning}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="ai" onClick={runAIAnalysis} disabled={analyzing} className="flex-1 text-xs">
                {analyzing ? 'AI Analyzing…' : '⚡ Extract Competencies & Scored Impact with AI'}
              </Button>
            </div>

            {/* AI analysis result display in modal */}
            {aiAnalysis && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ai-panel p-3">
                <div className="font-semibold text-xs gradient-text-ai mb-2 flex items-center gap-1">
                  <Cpu className="w-4 h-4 text-violet-500" /> Auto-Generated AI Review
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Suggested PI</div>
                    <div className="text-base font-bold text-violet-600 dark:text-violet-400">+{aiAnalysis.suggestedImpactScore}</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Confidence</div>
                    <div className="text-base font-bold">{aiAnalysis.confidence}%</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Sentiment</div>
                    <div className="text-base font-bold capitalize">{aiAnalysis.sentiment.replace('_', ' ')}</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Rating Boost</div>
                    <div className="text-base font-bold text-green-500">+{aiAnalysis.suggestedRatingInfluence} Rating</div>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  <strong>Explanation:</strong> {aiAnalysis.explanation}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="impactCat">Primary Impact Area</Label>
                <Select id="impactCat" value={impactCat} onChange={(e) => setImpactCat(e.target.value)}>
                  <option value="Operational Efficiency">Operational Efficiency</option>
                  <option value="Cost Optimization">Cost Optimization</option>
                  <option value="System Security">System Security</option>
                  <option value="Team Collaboration">Team Collaboration</option>
                  <option value="Customer Satisfaction">Customer Satisfaction</option>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="affectedDept">Affected Department</Label>
                <Select id="affectedDept" value={affectedDept} onChange={(e) => setAffectedDept(e.target.value)}>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Refinery Operations">Refinery Operations</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="businessValue">Business Value (e.g. $ Savings, Hrs Saved)</Label>
                <Input
                  id="businessValue"
                  placeholder="e.g. Saved 40 engineering hours per week"
                  value={businessValue}
                  onChange={(e) => setBusinessValue(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="stakeholders">Stakeholder Emails (comma-separated)</Label>
                <Input
                  id="stakeholders"
                  placeholder="e.g. ro001@hpcl.in, ic001@hpcl.in"
                  value={stakeholders}
                  onChange={(e) => setStakeholders(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Supporting Evidence Upload</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setFileName('architectural_diagram.pdf')}>
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <span className="text-xs font-medium text-foreground">{fileName || 'Click to mock upload file (PDF, PNG, Excel)'}</span>
                <p className="text-[10px] text-muted-foreground mt-1">Files are hashed & synced to Performance Ledger</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" className="text-xs">
                Log Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
