# Campaign AI Studio

A comprehensive AI-powered marketing platform for creating, managing, and optimizing marketing campaigns across multiple channels.

## Features

- **ChatGPT-Style Interface**: Natural language campaign creation
- **Multi-Platform Integration**: Connect with Google Ads, Facebook Ads, YouTube, LinkedIn, and more
- **Campaign Analytics**: AI-powered insights and performance tracking
- **Workflow Builder**: Visual campaign automation
- **Dark Mode Support**: Complete theme system with persistent storage
- **Responsive Design**: Mobile-optimized ChatGPT-style layout
- **Authentication System**: Secure login with social media options

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Deploy to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

Or connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
app/
├── layout.jsx           # Root layout wrapper
├── page.jsx             # Main application page (client component)
├── globals.css          # Global styles (precompiled Tailwind layer)

components/
├── ui/                  # Reusable UI components (shadcn/ui inspired)
├── LoginPage.jsx        # Authentication interface
├── ChatInterface.jsx    # Main chat interface
├── AnalyticsPage.jsx    # Analytics dashboard
├── IntegrationsPage.jsx # Platform integrations
└── ...

public/
└── assets/              # Static assets used across the app
```

## Technology Stack

- **Next.js 14 (App Router)** - React framework & routing
- **React 18** - UI rendering
- **Precompiled Tailwind CSS v4 styles** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui-inspired components** - Reusable UI elements

## Environment Variables

No environment variables are required for the base application. All integrations use mock data for demonstration purposes.

## Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start the production server locally
- `npm run lint` - Run ESLint with Next.js defaults

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
