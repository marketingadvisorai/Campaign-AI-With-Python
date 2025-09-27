# Deployment Instructions

## Vercel Deployment (Recommended)

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect the Next.js app
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   pnpm add -g vercel
   ```

2. In your project directory, run:

   ```bash
   vercel
   ```

3. Follow the prompts:

   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **campaign-ai-studio** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

4. Your app will be deployed and you'll get a live URL!

### Option 3: Manual Deployment to a Node Host

1. Build the project:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   pnpm start
   ```

3. Deploy the `.next` build output and run the same command in your hosting environment.

## Other Hosting Options

### Netlify

1. Build: `pnpm build`
2. Publish using the official Next.js Netlify adapter or Netlify Edge Functions

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `pnpm build`
3. Set the framework preset to Next.js

### GitHub Pages

GitHub Pages is intended for static sites. To deploy a Next.js app you would need to export a static build or use GitHub Actions to run a Node server. Vercel or Netlify are recommended.

## Environment Configuration

The app works out of the box with no environment variables needed. All features use mock data for demonstration.

For production use, you would need to:

1. Set up real API integrations
2. Configure authentication providers
3. Add environment variables for API keys

## Build Verification

Before deploying, verify your build works locally:

```bash
pnpm build
pnpm start
```

This starts a local server with the production build to test everything works correctly.
