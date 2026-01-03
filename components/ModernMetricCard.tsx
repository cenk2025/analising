'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    color?: string;
}

export default function ModernMetricCard({ title, value, change, icon, trend, color = '#6366f1' }: Props) {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
        if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'text-[var(--accent-success)]';
        if (trend === 'down') return 'text-[var(--accent-danger)]';
        return 'text-[var(--text-muted)]';
    };

    const getTrendBg = () => {
        if (trend === 'up') return 'bg-[var(--accent-success)]/10';
        if (trend === 'down') return 'bg-[var(--accent-danger)]/10';
        return 'bg-[var(--bg-tertiary)]';
    };

    return (
        <div className="metric-card-modern group">
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        {icon && (
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                                style={{
                                    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                                    border: `1px solid ${color}40`
                                }}
                            >
                                <div style={{ color }}>{icon}</div>
                            </div>
                        )}
                    </div>
                    <p className="text-sm font-medium text-[var(--text-muted)] mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-[var(--text-primary)]">{value}</h3>
                </div>
            </div>

            {change !== undefined && (
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getTrendBg()}`}>
                        <span className={getTrendColor()}>{getTrendIcon()}</span>
                        <span className={`text-sm font-semibold ${getTrendColor()}`}>
                            {Math.abs(change).toFixed(1)}%
                        </span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">vs viime vuosi</span>
                </div>
            )}

            {/* Decorative gradient orb */}
            <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                style={{ background: color }}
            ></div>
        </div>
    );
}
