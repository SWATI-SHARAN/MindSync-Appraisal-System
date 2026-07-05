import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, TrendingUp, CalendarCheck, Shield, Activity,
  FileText, Bot, BarChart3, Users, Settings, LogOut, Bell, Sun, Moon,
  Menu, X, ChevronDown, Zap, Target, Award, AlertTriangle, Building2,
  ClipboardList, FileSearch, Network, Lock, BookOpen, GitBranch, Cpu,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Avatar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  children?: NavItem[];
}

function getNavItems(role: UserRole): NavItem[] {
  const shared: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  const employeeItems: NavItem[] = [
    ...shared,
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'PI Score', href: '/pi', icon: TrendingUp },
    { label: 'My Events', href: '/events', icon: Activity },
    { label: 'Submit Achievement', href: '/events/new', icon: Award },
    { label: 'Evidence', href: '/evidence', icon: FileSearch },
    { label: 'Feedback', href: '/feedback', icon: BookOpen },
    { label: 'Performance Ledger', href: '/ledger', icon: ClipboardList },
    { label: 'AI Copilot', href: '/copilot', icon: Bot, badge: 'AI' },
    { label: 'Year-End Appraisal', href: '/appraisal', icon: FileText },
  ];

  const managerItems: NavItem[] = [
    ...shared,
    { label: 'My Team', href: '/team', icon: Users },
    { label: 'Log Event', href: '/events/new', icon: Activity },
    { label: 'Quarterly Review', href: '/consistency', icon: CalendarCheck },
    { label: 'Validation Queue', href: '/validation', icon: Shield, badge: '3' },
    { label: 'AI Event Analyzer', href: '/ai-analyzer', icon: Cpu, badge: 'AI' },
    { label: 'Performance Ledger', href: '/ledger', icon: ClipboardList },
    { label: 'AI Copilot', href: '/copilot', icon: Bot, badge: 'AI' },
  ];

  const reviewerItems: NavItem[] = [
    ...shared,
    { label: 'Ratification Queue', href: '/validation', icon: Shield, badge: '5' },
    { label: 'Performance Review', href: '/review', icon: TrendingUp },
    { label: 'Bias Alerts', href: '/bias', icon: AlertTriangle, badge: '2' },
    { label: 'Bell Curve', href: '/bell-curve', icon: Target },
    { label: 'Performance Ledger', href: '/ledger', icon: ClipboardList },
    { label: 'AI Copilot', href: '/copilot', icon: Bot, badge: 'AI' },
  ];

  const icItems: NavItem[] = [
    ...shared,
    { label: 'Provide Feedback', href: '/feedback/new', icon: BookOpen },
    { label: 'Endorsements', href: '/feedback', icon: Award },
    { label: 'Validation Queue', href: '/validation', icon: Shield },
  ];

  const hrItems: NavItem[] = [
    ...shared,
    { label: 'Employee Management', href: '/employees', icon: Users },
    { label: 'HR Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Bias Detection', href: '/bias', icon: AlertTriangle, badge: '5' },
    { label: 'Bell Curve Analysis', href: '/bell-curve', icon: Target },
    { label: 'Fairness Index', href: '/fairness', icon: Shield },
    { label: 'All Events', href: '/events', icon: Activity },
    { label: 'Validation Compliance', href: '/validation', icon: ClipboardList },
    { label: 'AI Governance', href: '/ai-governance', icon: Cpu, badge: 'AI' },
    { label: 'Reports', href: '/reports', icon: FileText },
    { label: 'System Config', href: '/config', icon: Settings },
    { label: 'SAP Integration', href: '/sap', icon: Network },
    { label: 'Audit Logs', href: '/audit', icon: Lock },
  ];

  const leaderItems: NavItem[] = [
    ...shared,
    { label: 'Org Dashboard', href: '/org', icon: Building2 },
    { label: 'Talent Heatmap', href: '/heatmap', icon: GitBranch },
    { label: 'Fairness Index', href: '/fairness', icon: Shield },
    { label: 'Bias Alerts', href: '/bias', icon: AlertTriangle, badge: '5' },
    { label: 'Bell Curve', href: '/bell-curve', icon: Target },
    { label: 'Succession Planning', href: '/succession', icon: Users },
    { label: 'AI Insights', href: '/ai-governance', icon: Cpu, badge: 'AI' },
    { label: 'Reports', href: '/reports', icon: FileText },
  ];

  const map: Record<UserRole, NavItem[]> = {
    employee: employeeItems,
    reporting_officer: managerItems,
    reviewing_officer: reviewerItems,
    internal_customer: icItems,
    hr_admin: hrItems,
    senior_leadership: leaderItems,
  };
  return map[role] ?? shared;
}

function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    employee: 'Employee',
    reporting_officer: 'Reporting Officer',
    reviewing_officer: 'Reviewing Officer',
    internal_customer: 'Internal Customer',
    hr_admin: 'HR Administrator',
    senior_leadership: 'Senior Leadership',
  };
  return labels[role];
}

function getRoleBadgeVariant(role: UserRole): 'default' | 'success' | 'warning' | 'info' {
  const map: Record<UserRole, 'default' | 'success' | 'warning' | 'info'> = {
    employee: 'default',
    reporting_officer: 'info',
    reviewing_officer: 'warning',
    internal_customer: 'default',
    hr_admin: 'success',
    senior_leadership: 'warning',
  };
  return map[role];
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const navItems = getNavItems(user.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen((v) => !v);
    } else {
      setMobileSidebarOpen((v) => !v);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Animated Width Collapsible) */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cn(
          'hidden lg:flex flex-col flex-shrink-0 h-full border-r border-border',
          'bg-[#f8fafc] dark:bg-slate-900 overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center py-4 border-b border-border', sidebarOpen ? 'gap-3 px-5' : 'justify-center px-2')}>
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="font-bold text-sm text-foreground">MeritSync</div>
              <div className="text-xs text-muted-foreground">HPCL Platform</div>
            </div>
          )}
        </div>

        {/* User card */}
        <div className={cn('py-3 border-b border-border', sidebarOpen ? 'px-4' : 'flex flex-col items-center justify-center px-2')}>
          <div className="flex items-center gap-3">
            <Avatar name={user.name} size="md" />
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.employeeId}</div>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <div className="mt-2">
              <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                {getRoleLabel(user.role)}
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 no-scrollbar px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn('sidebar-item group', isActive && 'active', !sidebarOpen && 'justify-center px-0')}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                {sidebarOpen && <span className="flex-1 truncate">{item.label}</span>}
                {sidebarOpen && item.badge && (
                  <span className={cn(
                    'text-[10px] rounded px-1.5 py-0.5 font-semibold',
                    item.badge === 'AI' ? 'bg-primary/5 text-primary border border-primary/20' : 'bg-primary/10 text-primary'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="py-3 border-t border-border space-y-0.5 px-3">
          <button
            onClick={handleLogout}
            className={cn(
              'sidebar-item w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600',
              !sidebarOpen && 'justify-center px-0'
            )}
            title={!sidebarOpen ? 'Sign Out' : undefined}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(
              'fixed inset-y-0 left-0 z-50 flex flex-col w-64 h-full border-r border-border lg:hidden',
              'bg-[#f8fafc] dark:bg-slate-900 overflow-hidden'
            )}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-foreground">MeritSync</div>
                <div className="text-xs text-muted-foreground">HPCL Platform</div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-auto p-1 rounded hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User card */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.employeeId}</div>
                </div>
              </div>
              <div className="mt-2">
                <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                  {getRoleLabel(user.role)}
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 no-scrollbar">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={cn('sidebar-item group', isActive && 'active')}
                  >
                    <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'text-[10px] rounded px-1.5 py-0.5 font-semibold',
                        item.badge === 'AI' ? 'bg-primary/5 text-primary border border-primary/20' : 'bg-primary/10 text-primary'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-3 border-t border-border space-y-0.5">
              <button
                onClick={handleLogout}
                className="sidebar-item w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center px-4 gap-3 border-b border-border bg-card/80 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {navItems.find((n) => n.href === location.pathname)?.label ?? 'MeritSync'}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-1 w-80 bg-card border border-border rounded-lg shadow-enterprise-lg z-50"
                  >
                    <div className="p-4 border-b border-border">
                       <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                      {[
                        { title: 'Q4 Review Due', msg: 'Quarterly consistency review is due by Dec 31', time: '2h ago', type: 'warning' },
                        { title: 'Event Approved', msg: 'Your MeritSync event has been approved by Vikram Nair', time: '1d ago', type: 'success' },
                        { title: 'PI Updated', msg: 'Your PI score has been updated to 86', time: '2d ago', type: 'info' },
                        { title: 'Feedback Received', msg: 'Meena Krishnan has endorsed your contribution', time: '3d ago', type: 'success' },
                      ].map((n, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500')} />
                          <div>
                            <div className="text-xs font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground">{n.msg}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User avatar */}
            <div className="flex items-center gap-2 pl-2">
              <Avatar name={user.name} size="sm" />
              <div className="hidden md:block">
                <div className="text-xs font-medium text-foreground">{user.name.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground">{user.grade}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
