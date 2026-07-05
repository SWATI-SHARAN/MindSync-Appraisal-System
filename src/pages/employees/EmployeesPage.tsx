import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, ArrowRight, Sparkles, Building2, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Select, Badge, Avatar } from '@/components/ui';
import { allUsers } from '@/data/users';

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered employees
  const filtered = allUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || u.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const departmentsList = Array.from(new Set(allUsers.map((u) => u.department)));

  // Mock score helper (PI Score and Promotion readiness)
  const getMockMetrics = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const pi = 60 + (hash % 36); // 60 to 95
    const readiness = 30 + (hash % 66); // 30 to 95
    return { pi, readiness };
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Talent Management Database
          </h1>
          <p className="text-sm text-muted-foreground">Comprehensive search, department filtration, and promotion readiness insights for all HPCL personnel</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-2 w-full md:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or employee ID…"
              className="pl-9 text-xs"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }} className="text-xs">
            <option value="all">All Departments</option>
            {departmentsList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginated.map((emp) => {
          const metrics = getMockMetrics(emp.id);
          return (
            <Card key={emp.id} className="hover:shadow-card-hover hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar name={emp.name} size="md" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">{emp.name}</h3>
                    <div className="text-[10px] text-muted-foreground truncate">{emp.designation} · {emp.grade}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-muted-foreground">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{emp.location}</span>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="stat-box">
                    <div className="text-[9px] text-muted-foreground">PI Score</div>
                    <div className="font-bold text-sm text-primary">{metrics.pi}</div>
                  </div>
                  <div className="stat-box">
                    <div className="text-[9px] text-muted-foreground">Readiness</div>
                    <Badge variant={metrics.readiness >= 75 ? 'success' : 'secondary'} className="text-[8px] mt-0.5">
                      {metrics.readiness}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-muted-foreground text-[10px]">
            Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} employees
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
