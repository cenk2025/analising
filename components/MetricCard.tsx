'use client';

interface Props {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
}

export default function MetricCard({ title, value, change, icon, trend }: Props) {
    const getTrendColor = () => {
        if (!trend) return 'text-gray-400';
        if (trend === 'up') return 'text-green-400';
        if (trend === 'down') return 'text-red-400';
        return 'text-gray-400';
    };

    const getTrendIcon = () => {
        if (trend === 'up') return '↑';
        if (trend === 'down') return '↓';
        return '→';
    };

    return (
        <div className="metric-card animate-fade-in">
            <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-400">{title}</h4>
                {icon && <div className="text-indigo-400">{icon}</div>}
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    {change !== undefined && (
                        <p className={`text-sm font-medium mt-1 ${getTrendColor()}`}>
                            {getTrendIcon()} {Math.abs(change)}% vs last year
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
