export interface FinancialMetrics {
    year: string;
    revenue: number;
    ebitda: number;
    pat: number;
    eps: number;
    profitMargin: number;
    roce: number;
    debtToEquity: number;
}

export interface SegmentPerformance {
    segment: string;
    revenue: number;
    growth: number;
    margin: number;
}

export interface NLPInsights {
    themes: string[];
    forwardLookingStatements: string[];
    sentiment: {
        score: number;
        label: 'positive' | 'neutral' | 'negative';
    };
    risks: string[];
    opportunities: string[];
}

export interface DashboardData {
    companyName: string;
    reportPeriod: string;
    metrics: FinancialMetrics[];
    segments: SegmentPerformance[];
    insights: NLPInsights;
    summary: string;
}
