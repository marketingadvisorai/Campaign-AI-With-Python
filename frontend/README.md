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
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── LoginPage.tsx    # Authentication interface
│   ├── ChatInterface.tsx # Main chat interface
│   ├── AnalyticsPage.tsx # Analytics dashboard
│   ├── IntegrationsPage.tsx # Platform integrations
│   └── ...
├── styles/
│   └── globals.css      # Global styles (Tailwind CSS)
└── main.tsx            # Application entry point
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component library

## Environment Variables

No environment variables are required for the base application. All integrations use mock data for demonstration purposes.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details