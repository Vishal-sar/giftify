# Deployment Guide

## Vercel Deployment

This Next.js application is ready to be deployed on Vercel, the recommended platform for Next.js apps.

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (free)
- Supabase project with API keys

### Step-by-Step Deployment

#### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Select your GitHub repository (`Vishal-sar/giftify`)
4. Click "Import"

#### 2. Configure Environment Variables
In the Vercel dashboard, go to **Settings > Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

Get these values from:
- **Supabase URL & Key**: Your Supabase project settings
- **WhatsApp Number**: Your configured WhatsApp business account

#### 3. Deploy
Click "Deploy" and Vercel will automatically:
- Install dependencies
- Run the build
- Deploy to production
- Assign a URL (e.g., `giftify.vercel.app`)

#### 4. Custom Domain (Optional)
In **Settings > Domains**, add your custom domain and follow DNS configuration.

### Health Check
After deployment, verify the app is healthy:
```bash
curl https://your-domain.vercel.app/api/health
```

You should receive:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-12T12:00:00.000Z",
  "environment": "production"
}
```

### Monitoring & Logs

1. **Build Logs**: View in Vercel dashboard under Deployments
2. **Runtime Logs**: Click on a deployment → Logs tab
3. **Error Monitoring**: Set up error tracking (Sentry, LogRocket, etc.)

### Automatic Deployments
- **Main branch**: Automatically deploys production when merged to main
- **Pull requests**: Preview deployments generated automatically
- **Other branches**: Manual deployment from Vercel dashboard

### Troubleshooting

**Build Fails**
- Check logs: `npm run build` locally first
- Verify all environment variables are set
- Check Node.js version compatibility

**Environment Variables Not Working**
- Ensure `NEXT_PUBLIC_*` prefix for client-side variables
- Redeploy after updating variables
- Check `.env.production` file locally

**Database Connection Issues**
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Review Supabase permissions/policies

### Rollback
If a deployment causes issues:
1. Go to Deployments in Vercel dashboard
2. Select the previous good deployment
3. Click "Promote to Production"

### Performance Tips
- Monitor Build Output Analysis in Vercel dashboard
- Use Vercel Analytics for real-time performance metrics
- Optimize images with Next.js Image component
- Enable caching headers in `vercel.json`

---

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your values
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# Run development server
npm run dev

# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure
```
src/
  ├── pages/         # Next.js pages (routing)
  ├── app/           # Global styles
  ├── components/    # React components
  ├── lib/           # Utilities and helpers
  └── styles/        # CSS files
```

## Technologies
- **Framework**: Next.js 15+
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animation**: Framer Motion
- **Icons**: Lucide React & Radix Icons
- **Payment**: Razorpay
- **Email**: Nodemailer
- **Forms**: Zod validation

## Support
For deployment issues, refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
