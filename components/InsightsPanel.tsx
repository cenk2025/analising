'use client';

import { NLPInsights } from '@/types/financial';

interface Props {
    insights: NLPInsights;
}

export default function InsightsPanel({ insights }: Props) {
    const getSentimentColor = (label: string) => {
        if (label === 'positive') return 'text-green-400';
        if (label === 'negative') return 'text-red-400';
        return 'text-gray-400';
    };

    const getSentimentBg = (label: string) => {
        if (label === 'positive') return 'bg-green-500/20 border-green-500/30';
        if (label === 'negative') return 'bg-red-500/20 border-red-500/30';
        return 'bg-gray-500/20 border-gray-500/30';
    };

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 gradient-text">AI-Powered Insights</h2>

            {/* Sentiment Analysis */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Overall Sentiment</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${getSentimentBg(insights.sentiment.label)}`}>
                    <span className={`text-xl font-bold ${getSentimentColor(insights.sentiment.label)}`}>
                        {insights.sentiment.label.toUpperCase()}
                    </span>
                    <span className="ml-3 text-gray-300">
                        Score: {(insights.sentiment.score * 100).toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Key Themes */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Key Themes</h3>
                <div className="flex flex-wrap gap-2">
                    {insights.themes.map((theme, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-300"
                        >
                            {theme}
                        </span>
                    ))}
                </div>
            </div>

            {/* Forward-Looking Statements */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Forward-Looking Statements</h3>
                <ul className="space-y-2">
                    {insights.forwardLookingStatements.map((statement, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-blue-400 mr-2">→</span>
                            <span className="text-gray-300 text-sm">{statement}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Risks */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                    <span className="text-red-400 mr-2">⚠️</span>
                    Key Risks
                </h3>
                <ul className="space-y-2">
                    {insights.risks.map((risk, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span className="text-gray-300 text-sm">{risk}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Opportunities */}
            <div>
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Opportunities
                </h3>
                <ul className="space-y-2">
                    {insights.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            <span className="text-gray-300 text-sm">{opportunity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
