# Financial Analysis Dashboard

A comprehensive, interactive financial data visualization dashboard built with Next.js, featuring AI-powered insights and beautiful charts.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

- **📊 Interactive Charts**: Line graphs, bar charts, and treemaps for financial metrics visualization
- **💡 AI-Powered Insights**: NLP analysis of management discussions, risks, and opportunities
- **📈 Financial Metrics**: Track revenue, EBITDA, PAT, EPS, profit margins, ROCE, and debt ratios
- **🎯 Segment Analysis**: Visualize segment-wise performance with interactive treemaps
- **🎨 Premium Dark Theme**: Modern glassmorphism design with vibrant gradients
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Fast, interactive dashboard with smooth animations

## 📋 Key Metrics Tracked

- Revenue Growth (5-year trends)
- EBITDA & PAT
- Earnings Per Share (EPS)
- Profit Margins
- Return on Capital Employed (ROCE)
- Debt-to-Equity Ratios
- Segment-wise Revenue Distribution

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Database**: Supabase
- **Deployment**: Vercel
- **NLP**: Natural language processing for sentiment analysis

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/cenk2025/analising.git
cd analising
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cenk2025/analising)

### Manual Deployment

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

5. **Production Deployment**:
```bash
vercel --prod
```

### Custom Domain Setup

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## 📊 Dashboard Tabs

### 1. Overview
- Executive summary
- Key financial metrics cards
- Revenue and profit margin trends
- Segment performance treemap

### 2. Financial Metrics
- Detailed ratio analysis
- 6 comprehensive charts covering all major financial indicators
- Year-over-year comparisons

### 3. Segment Analysis
- Interactive treemap visualization
- Detailed segment breakdown
- Growth rates and margins by segment

### 4. AI Insights
- Sentiment analysis (positive/neutral/negative)
- Key themes extraction
- Forward-looking statements
- Risk and opportunity identification

## 🎨 Design Features

- **Glassmorphism Effects**: Modern, translucent card designs
- **Gradient Text**: Eye-catching aurora gradients
- **Smooth Animations**: Fade-in and slide-in effects
- **Custom Scrollbar**: Styled to match the theme
- **Hover Effects**: Interactive elements with glow effects
- **Responsive Grid**: Adapts to all screen sizes

## 📁 Project Structure

```
financial-dashboard/
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard page
├── components/
│   ├── FinancialMetricsChart.tsx  # Reusable chart component
│   ├── SegmentTreemap.tsx         # Treemap visualization
│   ├── MetricCard.tsx             # Metric display cards
│   └── InsightsPanel.tsx          # AI insights display
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── mockData.ts           # Sample financial data
├── types/
│   └── financial.ts          # TypeScript interfaces
└── public/                   # Static assets
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom design tokens defined in `globals.css`:
- Custom color palette
- Gradient definitions
- Shadow utilities
- Animation keyframes

### Supabase Integration
The dashboard is configured to work with Supabase for:
- PDF document storage
- Financial data retrieval
- Real-time updates (future feature)

## 📝 Future Enhancements

- [ ] PDF upload and automatic data extraction
- [ ] Real-time data updates from Supabase
- [ ] Export dashboard as PDF report
- [ ] Comparison with industry benchmarks
- [ ] Multi-company analysis
- [ ] Historical data comparison
- [ ] Custom date range selection
- [ ] Advanced filtering options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Charts powered by [Recharts](https://recharts.org/)
- Database by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ using Next.js and TypeScript**
