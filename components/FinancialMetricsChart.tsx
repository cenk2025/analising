'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinancialMetrics } from '@/types/financial';

interface Props {
    data: FinancialMetrics[];
    type: 'line' | 'bar';
    dataKey: keyof FinancialMetrics;
    title: string;
    color: string;
}

export default function FinancialMetricsChart({ data, type, dataKey, title, color }: Props) {
    const ChartComponent = type === 'line' ? LineChart : BarChart;
    const DataComponent = type === 'line' ? Line : Bar;

    return (
        <div className="chart-container animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <ChartComponent data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis
                        dataKey="year"
                        stroke="#cbd5e1"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#cbd5e1"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(26, 29, 38, 0.95)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '8px',
                            color: '#f8fafc'
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            color: '#cbd5e1'
                        }}
                    />
                    <DataComponent
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        fill={color}
                        strokeWidth={2}
                    />
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
}
