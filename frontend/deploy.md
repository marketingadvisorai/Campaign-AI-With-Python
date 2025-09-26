# Deployment Instructions

## Vercel Deployment (Recommended)

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
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

### Option 3: Manual Upload

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload the `dist` folder contents to any static hosting provider

## Other Hosting Options

### Netlify

1. Build: `npm run build`
2. Publish directory: `dist`
3. Drag and drop the `dist` folder to Netlify

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `dist`

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Build and deploy: `npm run build && npm run deploy`

## Environment Configuration

The app works out of the box with no environment variables needed. All features use mock data for demonstration.

For production use, you would need to:

1. Set up real API integrations
2. Configure authentication providers
3. Add environment variables for API keys

## Build Verification

Before deploying, verify your build works locally:

```bash
npm run build
npm run preview
```

This starts a local server with the production build to test everything works correctly.