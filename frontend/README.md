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
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The app will be available at `http://localhost:3000`.

### Production Build

```bash
pnpm build
pnpm start
```

The `start` command runs the production server using the output from the `.next` directory.

## Deploy to Vercel

1. Install the Vercel CLI (optional):
   ```bash
   pnpm add -g vercel
   ```

2. From the `frontend` directory run:
   ```bash
   vercel --prod
   ```

Vercel automatically detects the Next.js app and configures the correct build and output settings.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout wrapper
│   └── page.tsx          # Application entry point
├── components/           # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── LoginPage.tsx     # Authentication interface
│   ├── ChatInterface.tsx # Main chat interface
│   ├── AnalyticsPage.tsx # Analytics dashboard
│   ├── IntegrationsPage.tsx # Platform integrations
│   └── ...
└── app/globals.css       # Global styles (Tailwind CSS)
```

## Technology Stack

- **Next.js 14** - React framework & routing
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component library

## Environment Variables

No environment variables are required for the base application. All integrations use mock data for demonstration purposes.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint via Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
