'use client';

import { useState } from 'react';
import FinancialMetricsChart from '@/components/FinancialMetricsChart';
import SegmentTreemap from '@/components/SegmentTreemap';
import MetricCard from '@/components/MetricCard';
import InsightsPanel from '@/components/InsightsPanel';
import { mockDashboardData } from '@/lib/mockData';

type TabType = 'overview' | 'metrics' | 'segments' | 'insights';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const data = mockDashboardData;

  // Calculate latest metrics for overview cards
  const latestMetrics = data.metrics[data.metrics.length - 1];
  const previousMetrics = data.metrics[data.metrics.length - 2];

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card mb-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text">{data.companyName}</h1>
              <p className="text-gray-400 mt-1">Financial Analysis Dashboard • {data.reportPeriod}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-2 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`tab-button ${activeTab === 'metrics' ? 'active' : ''}`}
            >
              Financial Metrics
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`tab-button ${activeTab === 'segments' ? 'active' : ''}`}
            >
              Segment Analysis
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
            >
              AI Insights
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Executive Summary */}
            <div className="glass-card p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-white">Executive Summary</h2>
              <p className="text-gray-300 leading-relaxed">{data.summary}</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Revenue"
                value={`$${(latestMetrics.revenue / 1000000).toFixed(1)}M`}
                change={calculateChange(latestMetrics.revenue, previousMetrics.revenue)}
                trend="up"
              />
              <MetricCard
                title="EBITDA"
                value={`$${(latestMetrics.ebitda / 1000000).toFixed(1)}M`}
                change={calculateChange(latestMetrics.ebitda, previousMetrics.ebitda)}
                trend="up"
              />
              <MetricCard
                title="PAT"
                value={`$${(latestMetrics.pat / 1000000).toFixed(1)}M`}
                change={calculateChange(latestMetrics.pat, previousMetrics.pat)}
                trend="up"
              />
              <MetricCard
                title="EPS"
                value={`$${latestMetrics.eps.toFixed(2)}`}
                change={calculateChange(latestMetrics.eps, previousMetrics.eps)}
                trend="up"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialMetricsChart
                data={data.metrics}
                type="line"
                dataKey="revenue"
                title="Revenue Trend (5 Years)"
                color="#6366f1"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="bar"
                dataKey="profitMargin"
                title="Profit Margin (%)"
                color="#10b981"
              />
            </div>

            {/* Segment Performance */}
            <SegmentTreemap segments={data.segments} />
          </div>
        )}

        {/* Financial Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Profit Margin"
                value={`${latestMetrics.profitMargin.toFixed(2)}%`}
                change={calculateChange(latestMetrics.profitMargin, previousMetrics.profitMargin)}
                trend="up"
              />
              <MetricCard
                title="ROCE"
                value={`${latestMetrics.roce.toFixed(1)}%`}
                change={calculateChange(latestMetrics.roce, previousMetrics.roce)}
                trend="up"
              />
              <MetricCard
                title="Debt-to-Equity"
                value={latestMetrics.debtToEquity.toFixed(2)}
                change={calculateChange(latestMetrics.debtToEquity, previousMetrics.debtToEquity)}
                trend="down"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialMetricsChart
                data={data.metrics}
                type="line"
                dataKey="revenue"
                title="Revenue Growth"
                color="#6366f1"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="line"
                dataKey="ebitda"
                title="EBITDA Trend"
                color="#8b5cf6"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="line"
                dataKey="pat"
                title="PAT (Profit After Tax)"
                color="#10b981"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="line"
                dataKey="eps"
                title="Earnings Per Share"
                color="#f59e0b"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="bar"
                dataKey="roce"
                title="Return on Capital Employed"
                color="#3b82f6"
              />
              <FinancialMetricsChart
                data={data.metrics}
                type="bar"
                dataKey="debtToEquity"
                title="Debt-to-Equity Ratio"
                color="#ef4444"
              />
            </div>
          </div>
        )}

        {/* Segment Analysis Tab */}
        {activeTab === 'segments' && (
          <div className="space-y-8">
            <SegmentTreemap segments={data.segments} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.segments.map((segment, index) => (
                <div key={index} className="glass-card p-6 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-white">{segment.segment}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Revenue</span>
                      <span className="text-white font-semibold">
                        ${(segment.revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Growth Rate</span>
                      <span className="text-green-400 font-semibold">
                        +{segment.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Margin</span>
                      <span className="text-blue-400 font-semibold">
                        {segment.margin}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            <InsightsPanel insights={data.insights} />
          </div>
        )}
      </main>
    </div>
  );
}

