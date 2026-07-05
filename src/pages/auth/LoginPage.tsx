import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Zap, Shield, BarChart3, Users, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Input, Label, Alert } from '@/components/ui';
import { cn } from '@/lib/utils';

const roleCredentials = [
  { role: 'Employee', email: 'emp001@hpcl.in', password: 'Employee@123', color: 'from-blue-500 to-blue-600', icon: '👤' },
  { role: 'Reporting Officer', email: 'ro001@hpcl.in', password: 'Manager@123', color: 'from-violet-500 to-violet-600', icon: '👔' },
  { role: 'Reviewing Officer', email: 'rev001@hpcl.in', password: 'Reviewer@123', color: 'from-indigo-500 to-indigo-600', icon: '🔍' },
  { role: 'Internal Customer', email: 'ic001@hpcl.in', password: 'Customer@123', color: 'from-cyan-500 to-cyan-600', icon: '🤝' },
  { role: 'HR Administrator', email: 'hr001@hpcl.in', password: 'HRAdmin@123', color: 'from-emerald-500 to-emerald-600', icon: '⚙️' },
  { role: 'Senior Leadership', email: 'sl001@hpcl.in', password: 'Leader@123', color: 'from-amber-500 to-amber-600', icon: '🏛️' },
];

const features = [
  { icon: Shield, text: 'Evidence-backed ratings', color: 'text-blue-400' },
  { icon: BarChart3, text: 'AI bias detection', color: 'text-violet-400' },
  { icon: Users, text: '360° validation workflow', color: 'text-cyan-400' },
  { icon: Zap, text: 'Continuous PI scoring', color: 'text-amber-400' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error ?? 'Login failed');
    }
  };

  const fillCredentials = (cred: typeof roleCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[48%] bg-[#002b54] dark:bg-slate-950 border-r border-border relative flex-col justify-between p-12">
        <div className="relative z-10">
          {/* HPCL Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">MeritSync</div>
              <div className="text-xs text-blue-200/70">HPCL Continuous Performance Platform</div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            Continuous Insights.<br />
            <span className="text-blue-300">Confident Decisions.</span>
          </h1>
          <p className="text-blue-100/80 text-sm leading-relaxed mb-10 max-w-md">
            Replacing annual subjective appraisals with evidence-backed, transparent, auditable, and bias-resistant performance management.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-2.5 border border-white/10 bg-white/5 rounded-md p-3">
                <f.icon className="w-4 h-4 flex-shrink-0 text-blue-300" />
                <span className="text-xs text-white/90 font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-8">
          {[
            { label: 'Employees', value: '500+' },
            { label: 'Departments', value: '20' },
            { label: 'Events Tracked', value: '1300+' },
          ].map((s) => (
            <div key={s.label} className="text-left">
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-[10px] text-blue-300 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 bg-slate-50 dark:bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-card border border-border p-8 rounded-lg shadow-enterprise"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight">MeritSync</div>
              <div className="text-[10px] text-muted-foreground">HPCL Performance Platform</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Use your corporate HPCL credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" id="login-form">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@hpcl.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-xs h-9"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 text-xs h-9"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="py-2.5 px-3">
                <div className="flex items-center gap-2 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </Alert>
            )}

            <Button
              type="submit"
              id="login-submit"
              className="w-full mt-2 h-9 text-xs"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-1.5 justify-center">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </div>
              ) : (
                <div className="flex items-center gap-1 justify-center">
                  Sign In <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 border-t border-border/80 pt-6">
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-3">Quick Access Demo Accounts</div>
            <div className="grid grid-cols-2 gap-2">
              {roleCredentials.map((cred) => (
                <button
                  key={cred.role}
                  id={`demo-${cred.role.replace(/\s+/g, '-').toLowerCase()}`}
                  type="button"
                  onClick={() => fillCredentials(cred)}
                  className={cn(
                    'flex items-center gap-2 p-2 rounded border border-border/70 text-left transition-all duration-150',
                    'hover:border-primary/40 hover:bg-muted/30',
                    email === cred.email ? 'border-primary bg-primary/5' : 'bg-muted/10'
                  )}
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-foreground truncate">{cred.role}</div>
                    <div className="text-[9px] text-muted-foreground truncate mt-0.5">{cred.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center mt-6">
            © 2024 HPCL Digital Innovation Team · MeritSync v2.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}
