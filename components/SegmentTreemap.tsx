'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { SegmentPerformance } from '@/types/financial';

interface Props {
    segments: SegmentPerformance[];
}

export default function SegmentTreemap({ segments }: Props) {
    const data = segments.map(seg => ({
        name: seg.segment,
        size: seg.revenue,
        growth: seg.growth,
        margin: seg.margin
    }));

    const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    const CustomContent = (props: any) => {
        const { x, y, width, height, index, name, size, growth, margin } = props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: COLORS[index % COLORS.length],
                        stroke: '#fff',
                        strokeWidth: 2,
                        opacity: 0.8
                    }}
                />
                {width > 80 && height > 60 && (
                    <>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 - 10}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={14}
                            fontWeight="600"
                        >
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 10}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={12}
                        >
                            ${(size / 1000000).toFixed(1)}M
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 28}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={11}
                        >
                            Growth: {growth > 0 ? '+' : ''}{growth}%
                        </text>
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="chart-container animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-white">Segment Performance (Revenue Distribution)</h3>
            <ResponsiveContainer width="100%" height={400}>
                <Treemap
                    data={data}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomContent />}
                >
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(26, 29, 38, 0.95)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '8px',
                            color: '#f8fafc'
                        }}
                        formatter={(value: any, name?: string) => {
                            if (name === 'size') return [`$${(value / 1000000).toFixed(2)}M`, 'Revenue'];
                            return [value, name || ''];
                        }}
                    />
                </Treemap>
            </ResponsiveContainer>
        </div>
    );
}
