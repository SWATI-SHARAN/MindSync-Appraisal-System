import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, User, TrendingUp, Award, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { toast } from 'sonner';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([
    { id: 'rev-01', name: 'Arjun Sharma', designation: 'Deputy Manager', piScore: 86, predictedRating: 1, managerRating: 1, currentStatus: 'Pending Ratification' },
    { id: 'rev-02', name: 'Kiran Patel', designation: 'Senior Engineer', piScore: 78, predictedRating: 2, managerRating: 2, currentStatus: 'Pending Ratification' },
  ]);

  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(reviews[0]);

  const handleRatify = (id: string) => {
    toast.success('Performance rating ratified and sealed in the ledger.');
    setReviews(reviews.filter((r) => r.id !== id));
    setSelectedReview(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Performance Ratification & Review
          </h1>
          <p className="text-sm text-muted-foreground">Reviewing Officer dashboard to lock ratings, resolve discrepancies, and check for bias indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review list */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Ratification Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviews.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  All appraisal reviews ratified successfully.
                </div>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReview(r)}
                    className={`p-4 rounded-xl border border-border bg-card cursor-pointer hover:shadow-enterprise transition-all ${selectedReview?.id === r.id ? 'border-primary ring-1 ring-primary' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <User className="w-8 h-8 text-muted-foreground bg-muted p-1.5 rounded-lg" />
                        <div>
                          <h3 className="font-semibold text-sm hover:text-primary transition-colors">{r.name}</h3>
                          <div className="text-[10px] text-muted-foreground">{r.designation} · PI Score: {r.piScore}</div>
                        </div>
                      </div>
                      <Badge variant="warning" className="text-[9px]">{r.currentStatus}</Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-1">
          {selectedReview ? (
            <Card>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm">Approve Dossier: {selectedReview.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">Manager Score</div>
                    <div className="text-base font-bold text-foreground">Rating {selectedReview.managerRating}</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[10px] text-muted-foreground">AI Predicted Score</div>
                    <div className="text-base font-bold text-primary">Rating {selectedReview.predictedRating}</div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-3 space-y-1">
                  <div className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Direct Alignment Detected
                  </div>
                  <p className="text-muted-foreground text-[10px]">
                    The reporting manager's appraisal rating exactly matches the AI prediction index score ({selectedReview.piScore} PI Score). Zero bias flags found.
                  </p>
                </div>

                <Button onClick={() => handleRatify(selectedReview.id)} className="w-full text-xs gap-1.5 mt-2">
                  <CheckCircle2 className="w-4 h-4" /> Ratify Performance Rating
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center border-dashed">
              <CardContent className="pt-6">
                <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">Select an employee request to check alignment data.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
