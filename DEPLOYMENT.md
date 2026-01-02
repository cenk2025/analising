# Vercel Deployment Guide

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Paste your GitHub repository URL: `https://github.com/cenk2025/analising`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yttqhzimwdkbkbfhsomo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dHFoemltd2RrYmtiZmhzb21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTI0OTgsImV4cCI6MjA4Mjk2ODQ5OH0.vvfA3F7frc1aC6yz-s_PKAjU6wqrl2YiHJi0gjJ_5u0
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_SXFclRvgNuhaQ4Tn79CuDQ_hu2CmN01
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your dashboard will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from Project Directory**:
```bash
cd /Users/cenkyakinlar/.gemini/antigravity/scratch/financial-dashboard
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **financial-dashboard** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

5. **Add Environment Variables**:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://yttqhzimwdkbkbfhsomo.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste the anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste the service role key
```

6. **Deploy to Production**:
```bash
vercel --prod
```

## Custom Domain Setup

### Adding a Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter your domain name (e.g., `dashboard.yourdomain.com`)

2. **Configure DNS**:
   
   **For Root Domain** (e.g., `yourdomain.com`):
   - Add an **A Record**:
     - Name: `@`
     - Value: `76.76.21.21`
   
   **For Subdomain** (e.g., `dashboard.yourdomain.com`):
   - Add a **CNAME Record**:
     - Name: `dashboard`
     - Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation**:
   - Usually takes 5-30 minutes
   - Vercel will automatically provision SSL certificate

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (private) | Yes |

## Build Configuration

The project uses the following build settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Troubleshooting

### Build Fails

**Issue**: Build fails with module not found errors
**Solution**: 
```bash
# Clear cache and rebuild
vercel --force
```

### Environment Variables Not Working

**Issue**: Dashboard shows errors about missing Supabase configuration
**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Ensure all variables are added for **Production**, **Preview**, and **Development**
3. Redeploy the project

### CSS Not Loading

**Issue**: Styles not appearing correctly
**Solution**:
1. Check that `globals.css` is imported in `app/layout.tsx`
2. Verify Tailwind CSS is configured correctly
3. Clear browser cache

### Slow Performance

**Issue**: Dashboard loads slowly
**Solution**:
1. Enable Vercel Analytics in project settings
2. Consider using Vercel Edge Functions for API routes
3. Optimize images using Next.js Image component

## Monitoring & Analytics

### Enable Vercel Analytics

1. Go to your project dashboard
2. Click "Analytics" tab
3. Click "Enable Analytics"
4. View real-time performance metrics

### Enable Speed Insights

1. Install the package:
```bash
npm install @vercel/speed-insights
```

2. Add to your layout:
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request or push to other branches

### Disable Auto-Deploy

If you want manual control:
1. Go to Settings → Git
2. Toggle "Production Branch" off
3. Deploy manually via CLI or dashboard

## Performance Optimization

### Recommended Settings

1. **Enable Edge Runtime** (for faster global performance):
   - Add to `app/layout.tsx`:
   ```tsx
   export const runtime = 'edge';
   ```

2. **Enable Image Optimization**:
   - Already configured by default in Next.js

3. **Enable Compression**:
   - Automatically enabled by Vercel

## Security Best Practices

1. **Never commit `.env.local`** to Git (already in `.gitignore`)
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** in Supabase dashboard
4. **Enable Vercel's DDoS protection** (automatic)
5. **Set up proper CORS** in Supabase if needed

## Scaling

Vercel automatically scales based on traffic. For high-traffic scenarios:

1. **Upgrade to Pro Plan** for:
   - Unlimited bandwidth
   - Advanced analytics
   - Priority support

2. **Use Edge Functions** for global performance

3. **Enable ISR** (Incremental Static Regeneration) for data that doesn't change frequently

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)

## Deployment Checklist

- [ ] GitHub repository is up to date
- [ ] All environment variables are set in Vercel
- [ ] Custom domain DNS is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are enabled
- [ ] Test the production URL
- [ ] Verify all tabs work correctly
- [ ] Check mobile responsiveness
- [ ] Monitor initial performance metrics

---

**Your dashboard is now live! 🎉**
