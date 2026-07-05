import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Zap, RotateCcw, ChevronRight, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Avatar } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { formatDateTime, cn } from '@/lib/utils';
import type { ChatMessage } from '@/types';

const SUGGESTED_QUESTIONS = [
  "What improved my PI score from 74 to 86 this year?",
  "Why did my consistency score increase in Q4?",
  "Which achievements contributed most to my score?",
  "What skills should I develop to get Rating 1?",
  "How does my performance compare to the team average?",
  "Why is there a negative deduction on my PI score?",
  "What is the organization's fairness index?",
  "Who are the top performers in IT department?",
];

const AI_RESPONSES: Record<string, string> = {
  'pi': `Your PI score increased from **74 (Dec 2023)** to **86 (Dec 2024)** — a gain of **+12 points** over the year. Here's what drove it:

🏆 **Achievement Score (+9 pts)**: Three high-impact events were approved — the MeritSync Platform (critical), SAP Migration (high), and Cybersecurity Incident Response (critical). Together they contributed +9 points to your achievement component.

✅ **Stakeholder Validation (+3 pts)**: All three events received full validation from your Reporting Officer, Reviewing Officer, and Internal Customer. This brought your validation component from 15 to 18.

📈 **Consistency Improvement (+2 pts)**: Your quarterly scores improved from 3.83 (Q1) to 4.67 (Q4), reflecting steady improvement throughout the year.

💡 **Recommendation**: Focus on getting one more critical-impact event validated in Q1 2025 to maintain momentum towards Rating 1.`,

  'rating': `Based on your current PI Score of **86/100**, the AI predicts **Rating 1 (Outstanding)** with **89% confidence**.

The main factors supporting this prediction:
- ✅ Achievement score (37/40) — top 5% of organization
- ✅ All events validated by all stakeholders
- ✅ Q4 consistency score: 4.67/5 (highest in your team)
- ✅ Zero integrity violations

⚠️ **Risk Factor**: The bell curve may limit Rating 1 count to ~10% of department. Your PI Score ranks you in the top 3% of IT department, making you a strong candidate to retain Rating 1.`,

  'skills': `Based on your competency analysis and HPCL leadership framework, I recommend focusing on:

1. **Strategic Thinking** (Currently 82%) — Take the HPCL Strategic Leadership Programme (Q1 2025). Contributes +3 to Leadership Behaviour score.

2. **Financial Acumen** (Not yet tracked) — Complete CFO Finance for Non-Finance certification. Adds a new L&D point (+1 PI).

3. **Cross-functional Collaboration** (84%) — Lead one cross-department project per quarter. Each validated project adds to consistency + achievement.

4. **Digital Competency** — Contribute to HPCL AI/ML Digital Transformation initiative. Could qualify as a critical-impact innovation event.`,

  'compare': `Comparing your performance to your team (IT Department):

| Metric | You | Team Avg | Dept Avg |
|--------|-----|----------|----------|
| PI Score | **86** | 73 | 76 |
| Events Logged | 4 | 2.8 | 3.1 |
| Consistency | **4.67** | 3.9 | 4.0 |
| L&D Hours | 48 | 22 | 25 |

You are **ranked #1** in your immediate team and **top 3% in IT department**. Your PI Score of 86 is significantly above both team and department averages.`,

  'fairness': `The HPCL Organization Fairness Index for FY 2024 is **82%**.

This is calculated based on:
- Evidence-backed events: 94% of events have uploaded evidence
- Validation compliance: 91% of events completed full 360° workflow  
- Bell curve adjustments: 8.2% of employees had ratings adjusted downward
- Bias alert resolution rate: 40% of detected bias flags were resolved

**Industry benchmark**: 75%. HPCL is performing above average.

⚠️ **5 active bias alerts** detected including 1 high-severity favoritism case and 1 manager rating variance anomaly. HR is reviewing.`,

  'top': `Top 5 performers in IT Department (by PI Score, FY 2024):

1. 🥇 **Arjun Sharma** — PI: 86 | Rating: 1 (Outstanding)
2. 🥈 **Divya Menon** — PI: 79 | Rating: 2 (Exceeds)
3. 🥉 **Ramesh Patel** — PI: 71 | Rating: 2 (Exceeds)
4. **Kavita Reddy** — PI: 68 | Rating: 3 (Meets)
5. **Suresh Chand** — PI: 64 | Rating: 3 (Meets)

The IT department has the highest proportion of Rating 1 employees (15%) vs org average of 11.6%.`,

  'default': `I'm the HPCL MeritSync Copilot. I can help you understand:

- 📊 Your PI Score breakdown and trends
- 🎯 What's driving your performance rating  
- 💡 Skill development recommendations
- 🔍 How your performance compares to peers
- ⚖️ Fairness index and bias detection insights
- 👥 Team and organization performance data

Try asking: *"What improved my PI score this year?"* or *"What skills should I develop?"*`,
};

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('pi') || q.includes('improve') || q.includes('increase') || q.includes('decreased') || q.includes('score')) return AI_RESPONSES.pi;
  if (q.includes('rating') || q.includes('predict') || q.includes('confidence')) return AI_RESPONSES.rating;
  if (q.includes('skill') || q.includes('develop') || q.includes('learn') || q.includes('should')) return AI_RESPONSES.skills;
  if (q.includes('compare') || q.includes('team') || q.includes('average') || q.includes('peer')) return AI_RESPONSES.compare;
  if (q.includes('fair') || q.includes('index') || q.includes('bias') || q.includes('organisation') || q.includes('organization')) return AI_RESPONSES.fairness;
  if (q.includes('top') || q.includes('best') || q.includes('performer') || q.includes('rank')) return AI_RESPONSES.top;
  return AI_RESPONSES.default;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- /gm, '• ')
    .replace(/\n/g, '<br/>');
}

export default function CopilotPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sessionId: 'session-1',
      role: 'assistant',
      content: `Hello **${user?.name?.split(' ')[0] ?? 'there'}**! 👋 I'm your **HPCL MeritSync Copilot**.\n\nI have access to your complete performance data, organizational insights, and HPCL benchmark information. Ask me anything about your performance, PI score, career development, or organizational metrics!\n\n${AI_RESPONSES.default}`,
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sessionId: 'session-1',
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sessionId: 'session-1',
      role: 'assistant',
      content: getAIResponse(query),
      timestamp: new Date().toISOString(),
      metadata: { confidence: Math.round(82 + Math.random() * 15) },
    };

    setIsTyping(false);
    setMessages((m) => [...m, aiMsg]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] max-w-4xl mx-auto p-4 gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">AI Performance Copilot</h1>
          <p className="text-xs text-muted-foreground">Org-wide intelligence · HPCL MeritSync · Always learning</p>
        </div>
        <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={() => setMessages([])}>
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </Button>
      </div>

      {/* Suggested questions */}
      <div className="flex gap-2 flex-wrap">
        {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            {q.length > 40 ? q.slice(0, 40) + '…' : q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              {msg.role === 'assistant' ? (
                <div className="w-8 h-8 rounded bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              ) : (
                <Avatar name={user?.name ?? 'U'} size="sm" className="mt-1" />
              )}
              <div className={cn(
                'max-w-[80%] rounded-lg px-4 py-3 text-xs',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-card border border-border rounded-tl-sm text-foreground'
              )}>
                <div
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
                <div className={cn('text-[10px] mt-2 flex items-center gap-2', msg.role === 'user' ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground')}>
                  {msg.metadata?.confidence && (
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-2.5 h-2.5" /> {msg.metadata.confidence}% confidence
                    </span>
                  )}
                  <span>{new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-card border border-border rounded-lg rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        className="flex gap-2 border border-border rounded p-2 bg-card focus-within:border-primary transition-colors"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your performance, PI score, achievements, career…"
          className="flex-1 bg-transparent outline-none text-xs px-2 placeholder:text-muted-foreground"
          id="copilot-input"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="h-8 w-8">
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
}
