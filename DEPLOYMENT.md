# Wizzta Deployment Guide for Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: Set up a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

You'll need to set these environment variables in your Vercel project:

### Required Variables:
- `DATABASE_URL`: Your PostgreSQL connection string
  - Format: `postgresql://username:password@hostname:port/database_name`
  - Example: `postgresql://user:pass@ep-cool-darkness-123456.us-east-1.aws.neon.tech/neondb`

### Optional Variables:
- `NODE_ENV`: Set to `production` (automatically set by Vercel)
- `SESSION_SECRET`: A random string for session management (if using sessions)

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Node.js project

### 2. Configure Build Settings

Vercel should automatically detect your build configuration from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the required variables:
   - `DATABASE_URL`: Your database connection string
   - Any other environment variables your app needs

### 4. Deploy

1. Click **Deploy** in Vercel
2. Wait for the build to complete
3. Your app will be available at the provided Vercel URL

## Database Setup

### Option 1: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Set it as `DATABASE_URL` in Vercel

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Set it as `DATABASE_URL` in Vercel

### Option 3: PlanetScale
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get the connection string
4. Set it as `DATABASE_URL` in Vercel

## Database Migration

After setting up your database, you'll need to run migrations:

1. **Local Development**: Run `npm run db:push` to push schema changes
2. **Production**: The database schema should be set up before deployment

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes (`npm run check`)

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correctly set
   - Check database credentials and network access

3. **Static File Issues**:
   - Ensure `dist/public` directory is created during build
   - Check that static files are being served correctly

### Build Logs:
- Check Vercel build logs in the dashboard
- Look for any TypeScript or build errors
- Verify all dependencies are installed

## Post-Deployment

1. **Test Your Application**:
   - Visit your Vercel URL
   - Test all major functionality
   - Check API endpoints

2. **Monitor Performance**:
   - Use Vercel Analytics (if enabled)
   - Monitor database performance
   - Check for any errors in Vercel logs

## Custom Domain (Optional)

1. Go to **Settings** → **Domains** in your Vercel project
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

## Environment-Specific Deployments

You can set up different environments:

- **Production**: Main deployment
- **Preview**: Automatic deployments for pull requests
- **Development**: Local development with `npm run dev`

## Support

If you encounter issues:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test locally with `npm run build && npm start`
