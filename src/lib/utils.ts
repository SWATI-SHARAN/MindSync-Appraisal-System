import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return formatDate(d);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function getPIColor(score: number): string {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 55) return 'text-amber-500';
  return 'text-red-500';
}

export function getPIBgColor(score: number): string {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 55) return 'bg-amber-500';
  return 'bg-red-500';
}

export function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: 'Outstanding',
    2: 'Exceeds Expectations',
    3: 'Meets Expectations',
    4: 'Partially Meets',
    5: 'Does Not Meet',
  };
  return labels[rating] ?? 'Unknown';
}

export function getRatingColor(rating: number): string {
  const colors: Record<number, string> = {
    1: 'text-green-600 dark:text-green-400',
    2: 'text-blue-600 dark:text-blue-400',
    3: 'text-amber-600 dark:text-amber-400',
    4: 'text-orange-600 dark:text-orange-400',
    5: 'text-red-600 dark:text-red-400',
  };
  return colors[rating] ?? 'text-muted-foreground';
}

export function getRatingBadgeClass(rating: number): string {
  const classes: Record<number, string> = {
    1: 'badge-success',
    2: 'badge-info',
    3: 'badge-warning',
    4: 'badge-danger',
    5: 'badge-danger',
  };
  return classes[rating] ?? 'badge-neutral';
}

export function getImpactColor(level: string): string {
  const colors: Record<string, string> = {
    low: 'badge-neutral',
    medium: 'badge-info',
    high: 'badge-warning',
    critical: 'badge-danger',
  };
  return colors[level] ?? 'badge-neutral';
}

export function getSentimentColor(sentiment: string): string {
  const colors: Record<string, string> = {
    very_positive: 'text-green-600 dark:text-green-400',
    positive: 'text-blue-600 dark:text-blue-400',
    neutral: 'text-gray-500',
    negative: 'text-orange-500',
    very_negative: 'text-red-600 dark:text-red-400',
  };
  return colors[sentiment] ?? 'text-muted-foreground';
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function calculateTrend(current: number, previous: number): { value: number; isUp: boolean } {
  const diff = current - previous;
  return { value: Math.abs(diff), isUp: diff >= 0 };
}

export function clampScore(score: number, min = 0, max = 100): number {
  return Math.min(Math.max(score, min), max);
}
