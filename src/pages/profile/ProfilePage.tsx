import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Shield, Award, BookOpen, Clock, Network, CheckCircle, Flame } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, Avatar, Badge, Progress } from '@/components/ui';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const mockLearning = [
    { id: 'l1', title: 'HPCL Leadership Development Program', provider: 'HPCL Academy', date: '2024-10-15', hours: 40, piContrib: 5 },
    { id: 'l2', title: 'Enterprise Architecture & Cloud Systems', provider: 'Microsoft', date: '2024-08-20', hours: 24, piContrib: 3 },
    { id: 'l3', title: 'Agile & DevOps Certification', provider: 'Scrum.org', date: '2024-05-11', hours: 16, piContrib: 2 },
  ];

  const ratingHistory = [
    { year: 2023, rating: 1, pi: 88, band: 'Outstanding', manager: 'Vikram Nair' },
    { year: 2022, rating: 2, pi: 81, band: 'Exceeds Expectations', manager: 'Vikram Nair' },
    { year: 2021, rating: 2, pi: 79, band: 'Exceeds Expectations', manager: 'Sanjay Sen' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: Profile card */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="text-center p-6">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-center">
                <Avatar name={user.name} size="xl" className="border-4 border-primary/20 w-24 h-24" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.designation}</p>
              </div>
              <div className="flex justify-center gap-2">
                <Badge variant="info">{user.grade}</Badge>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="border-t border-border pt-4 text-left space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Joined: {formatDate(user.joiningDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>ID: {user.employeeId}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Chain */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Network className="w-4 h-4 text-primary" />
                Reporting Chain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {user.reviewingOfficerName && (
                <div className="relative">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-border border-2 border-background" />
                  <div className="text-xs text-muted-foreground">Reviewing Officer</div>
                  <div className="text-sm font-medium">{user.reviewingOfficerName}</div>
                  <div className="text-xs text-muted-foreground">DGM · E7</div>
                </div>
              )}
              {user.managerName && (
                <div className="relative">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="text-xs text-muted-foreground">Reporting Officer</div>
                  <div className="text-sm font-medium">{user.managerName}</div>
                  <div className="text-xs text-muted-foreground">Senior Manager · E6</div>
                </div>
              )}
              <div className="relative">
                <div className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background shadow-enterprise" />
                <div className="text-xs text-muted-foreground">Employee (You)</div>
                <div className="text-sm font-semibold text-primary">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.designation} · {user.grade}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Details and Charts */}
        <div className="flex-1 space-y-6">
          {/* L&D Certifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="w-4 h-4 text-primary" />
                Learning & Development (SAP Sync)
              </CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Synced: Today, 08:00 AM
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="stat-box">
                  <div className="text-xs text-muted-foreground">Total Training Hours</div>
                  <div className="text-2xl font-bold">80 Hours</div>
                </div>
                <div className="stat-box">
                  <div className="text-xs text-muted-foreground">PI Contribution</div>
                  <div className="text-2xl font-bold text-green-500">+10 Points</div>
                </div>
              </div>
              <div className="space-y-3">
                {mockLearning.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.provider} · {formatDate(item.date)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{item.hours} hrs</div>
                      <Badge variant="success" className="text-[10px]">+{item.piContrib} PI</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Award className="w-4 h-4 text-primary" />
                Annual Appraisal History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-medium text-xs">
                      <th className="py-2">Year</th>
                      <th className="py-2">Evidence-based PI Score</th>
                      <th className="py-2">Final Rating Band</th>
                      <th className="py-2">Reporting Manager</th>
                      <th className="py-2 text-right">Audit Trail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {ratingHistory.map((history) => (
                      <tr key={history.year} className="hover:bg-muted/20">
                        <td className="py-3 font-semibold">{history.year}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{history.pi}</span>
                            <Progress value={history.pi} className="w-20 h-1.5" />
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant={history.rating === 1 ? 'success' : 'info'} className="text-xs">
                            Rating {history.rating} · {history.band}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">{history.manager}</td>
                        <td className="py-3 text-right">
                          <span className="text-xs text-green-500 font-medium flex items-center justify-end gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Immutable
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
