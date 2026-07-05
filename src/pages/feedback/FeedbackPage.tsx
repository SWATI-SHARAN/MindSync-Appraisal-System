import React, { useState } from 'react';
import { BookOpen, Star, Send, Award, Cpu, User, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Textarea, Select, Label, Badge, Avatar, Progress } from '@/components/ui';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 'f1', from: 'Meena Krishnan', role: 'Manager - HR', content: 'Arjun contributed exceptionally to the hackathon. His solution was well-engineered and helped HR validate performance outcomes automatically.', date: '2024-11-10', rating: 5, isEndorsement: true, sentiment: 'positive', sentimentScore: 0.95, tags: ['Collaboration', 'Technical Delivery'] },
    { id: 'f2', from: 'Vikram Nair', role: 'Reporting Officer', content: 'Delivered the SAP configurations on time. Maintained excellent communication with the refinery teams during testing.', date: '2024-10-18', rating: 4, isEndorsement: false, sentiment: 'positive', sentimentScore: 0.82, tags: ['Reliability', 'Communication'] },
    { id: 'f3', from: 'Rajesh Patil', role: 'Internal Customer', content: 'Response times during the dispatcher downtime incident could be slightly improved, though the core issue was resolved completely.', date: '2024-09-02', rating: 3, isEndorsement: false, sentiment: 'neutral', sentimentScore: 0.51, tags: ['Response Time'] },
  ]);

  const [toUser, setToUser] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('5');
  const [isEndorsement, setIsEndorsement] = useState(false);

  // AI Sentiment simulation
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ score: number; sentiment: string; tags: string[] } | null>(null);

  const runSentimentAnalysis = () => {
    if (!content) return;
    setAnalyzing(true);
    setTimeout(() => {
      const text = content.toLowerCase();
      let score = 0.75;
      let sentiment = 'Positive';
      let tags = ['General Performance'];

      if (text.includes('great') || text.includes('excellent') || text.includes('amazing')) {
        score = 0.96;
        sentiment = 'Very Positive';
        tags.push('High Performer', 'Leadership');
      } else if (text.includes('delayed') || text.includes('late') || text.includes('slow')) {
        score = 0.35;
        sentiment = 'Negative';
        tags.push('Latency Issues');
      }

      setAiAnalysis({ score, sentiment, tags });
      setAnalyzing(false);
      toast.success('Sentiment analysis done!');
    }, 1000);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toUser || !content) {
      toast.error('Please complete the feedback form.');
      return;
    }

    const newFeed = {
      id: `f-${Date.now()}`,
      from: 'Arjun Sharma (You)',
      role: 'Deputy Manager',
      content,
      date: new Date().toISOString().split('T')[0],
      rating: parseInt(rating),
      isEndorsement,
      sentiment: aiAnalysis ? aiAnalysis.sentiment.toLowerCase() : 'positive',
      sentimentScore: aiAnalysis ? aiAnalysis.score : 0.8,
      tags: aiAnalysis ? aiAnalysis.tags : ['Collaboration'],
    };

    setFeedbacks([newFeed, ...feedbacks]);
    toast.success('Feedback submitted successfully!');
    setToUser('');
    setContent('');
    setAiAnalysis(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            360° Feedback & Endorsements
          </h1>
          <p className="text-sm text-muted-foreground">Exchange transparent, validated feedback and performance reviews within the organization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit feedback form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              Provide Feedback / Endorsement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendFeedback} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="toUser">Select Employee (Name or ID)</Label>
                <Input
                  id="toUser"
                  placeholder="e.g. Vikram Nair"
                  value={toUser}
                  onChange={(e) => setToUser(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="content">Your Feedback *</Label>
                <Textarea
                  id="content"
                  rows={4}
                  placeholder="Write clear, objective feedback. Specify projects and behaviors."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="ai" onClick={runSentimentAnalysis} className="flex-1 text-xs">
                  {analyzing ? 'AI Analyzing Sentiment…' : '⚡ Auto-Detect Sentiment & Tags'}
                </Button>
              </div>

              {aiAnalysis && (
                <div className="ai-panel p-3 rounded-lg">
                  <div className="font-semibold text-xs gradient-text-ai mb-2 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" /> Sentiment Analysis Result
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="stat-box">
                      <div className="text-[10px] text-muted-foreground">Class</div>
                      <div className="font-bold text-violet-500">{aiAnalysis.sentiment}</div>
                    </div>
                    <div className="stat-box">
                      <div className="text-[10px] text-muted-foreground">Confidence</div>
                      <div className="font-bold">{(aiAnalysis.score * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {aiAnalysis.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[9px]">{t}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="rating">Rating (1 - 5 stars)</Label>
                  <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </Select>
                </div>
                <div className="space-y-1 pt-6 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="endorse"
                    checked={isEndorsement}
                    onChange={(e) => setIsEndorsement(e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <Label htmlFor="endorse" className="cursor-pointer">Mark as Endorsement</Label>
                </div>
              </div>

              <Button type="submit" className="w-full text-xs">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback List Received */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Feedback Box
              </CardTitle>
              <CardDescription>Verified reviews and performance comments by manager chain & clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbacks.map((f) => (
                <div key={f.id} className="p-4 rounded-xl border border-border bg-card space-y-3 relative hover:shadow-enterprise transition-shadow">
                  {f.isEndorsement && (
                    <Badge variant="success" className="absolute top-4 right-4 flex items-center gap-1 text-[9px]">
                      <Award className="w-3 h-3 text-green-600 dark:text-green-400" /> Endorsement
                    </Badge>
                  )}
                  <div className="flex items-center gap-3">
                    <Avatar name={f.from} size="sm" />
                    <div>
                      <div className="font-semibold text-foreground">{f.from}</div>
                      <div className="text-[10px] text-muted-foreground">{f.role} · {formatDate(f.date)}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "{f.content}"
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 text-[9px]">
                    <div className="flex gap-0.5 mr-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= f.rating ? 'text-amber-500 fill-amber-500' : 'text-muted/40'}`} />
                      ))}
                    </div>
                    {f.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[9px]">{t}</Badge>
                    ))}
                    {f.sentimentScore && (
                      <Badge variant="info" className="ml-auto flex items-center gap-1 text-[9px]">
                        <Cpu className="w-2.5 h-2.5" /> Sentiment Confidence: {(f.sentimentScore * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
