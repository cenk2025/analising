import { DashboardData } from '@/types/financial';

export const mockDashboardData: DashboardData = {
    companyName: "Sample Corporation",
    reportPeriod: "FY 2019-2024",
    summary: "The company has demonstrated strong financial performance over the past five years with consistent revenue growth and improving profitability margins. Strategic initiatives in digital transformation and market expansion have positioned the company well for future growth.",
    metrics: [
        {
            year: "2020",
            revenue: 45000000,
            ebitda: 12000000,
            pat: 7500000,
            eps: 3.75,
            profitMargin: 16.67,
            roce: 18.5,
            debtToEquity: 0.45
        },
        {
            year: "2021",
            revenue: 52000000,
            ebitda: 14500000,
            pat: 9200000,
            eps: 4.60,
            profitMargin: 17.69,
            roce: 20.2,
            debtToEquity: 0.38
        },
        {
            year: "2022",
            revenue: 61000000,
            ebitda: 17200000,
            pat: 11000000,
            eps: 5.50,
            profitMargin: 18.03,
            roce: 22.8,
            debtToEquity: 0.32
        },
        {
            year: "2023",
            revenue: 72000000,
            ebitda: 20500000,
            pat: 13500000,
            eps: 6.75,
            profitMargin: 18.75,
            roce: 24.5,
            debtToEquity: 0.28
        },
        {
            year: "2024",
            revenue: 85000000,
            ebitda: 24000000,
            pat: 16200000,
            eps: 8.10,
            profitMargin: 19.06,
            roce: 26.3,
            debtToEquity: 0.22
        }
    ],
    segments: [
        {
            segment: "Technology Solutions",
            revenue: 35000000,
            growth: 18.5,
            margin: 22.3
        },
        {
            segment: "Consulting Services",
            revenue: 25000000,
            growth: 12.8,
            margin: 18.5
        },
        {
            segment: "Cloud Infrastructure",
            revenue: 15000000,
            growth: 25.4,
            margin: 20.1
        },
        {
            segment: "Data Analytics",
            revenue: 10000000,
            growth: 32.6,
            margin: 24.8
        }
    ],
    insights: {
        themes: [
            "Digital Transformation",
            "Market Expansion",
            "Operational Excellence",
            "Innovation Focus",
            "Customer-Centric Strategy",
            "Sustainability Initiatives"
        ],
        forwardLookingStatements: [
            "Expected to achieve 15-20% revenue growth in the next fiscal year driven by new product launches",
            "Planning to expand into three new geographic markets in Southeast Asia",
            "Investing $10M in R&D to develop next-generation AI-powered solutions",
            "Targeting 25% EBITDA margin by FY2026 through operational efficiencies",
            "Committed to achieving carbon neutrality by 2030"
        ],
        sentiment: {
            score: 0.78,
            label: "positive"
        },
        risks: [
            "Increasing competition from global technology giants",
            "Potential economic downturn affecting enterprise IT spending",
            "Cybersecurity threats and data privacy regulations",
            "Talent acquisition and retention challenges in competitive markets",
            "Foreign exchange volatility impacting international operations",
            "Supply chain disruptions affecting hardware delivery timelines"
        ],
        opportunities: [
            "Growing demand for cloud migration and digital transformation services",
            "Expansion into emerging markets with high growth potential",
            "Strategic partnerships with leading technology providers",
            "Increasing adoption of AI and machine learning solutions",
            "Government initiatives promoting digital infrastructure development",
            "Cross-selling opportunities across existing customer base"
        ]
    }
};
