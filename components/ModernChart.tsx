'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
    data: { year: string; value: number }[];
    title: string;
    color?: string;
    type?: 'area' | 'line' | 'bar';
}

export default function ModernChart({ data, title, color = '#00d4ff', type = 'area' }: Props) {
    const options: ApexOptions = {
        chart: {
            type: type,
            toolbar: { show: false },
            background: 'transparent',
            fontFamily: 'Poppins, sans-serif',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
        },
        theme: {
            mode: 'dark',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [color],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.1,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: 'rgba(0, 212, 255, 0.1)',
            strokeDashArray: 4,
        },
        xaxis: {
            categories: data.map(d => d.year),
            labels: {
                style: {
                    colors: '#6b7a99',
                    fontSize: '12px',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#6b7a99',
                    fontSize: '12px',
                },
                formatter: (value) => {
                    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
                    return `$${value.toFixed(0)}`;
                },
            },
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: (value) => {
                    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
                    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
                    return `$${value.toFixed(2)}`;
                },
            },
        },
        colors: [color],
    };

    const series = [{
        name: title,
        data: data.map(d => d.value),
    }];

    return (
        <div className="chart-modern animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full" style={{ background: color }}></span>
                {title}
            </h3>
            <Chart options={options} series={series} type={type} height={300} />
        </div>
    );
}
