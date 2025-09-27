import { useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plug, 
  Search, 
  Facebook, 
  BarChart3, 
  Tag, 
  Bot,
  Globe, 
  Store,
  Users,
  Database,
  CheckCircle,
  AlertCircle,
  Star,
 
  Clock,
  
  Settings,
 
  Sparkles,
  Play,
  CheckCircle2,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowDown,
  Award,
  Target,
  Brain,

} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  category: 'advertising' | 'analytics' | 'website' | 'crm';
  longDescription?: string;
  features?: string[];
  pricing?: string;
  rating?: number;
  users?: string;
  setupSteps?: string[];
  apiEndpoints?: string[];
  supportedFeatures?: string[];
}

interface AIConnectStep {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  icon: ReactNode;
  status: 'pending' | 'completed' | 'current';
  estimatedTime: string;
  benefits: string[];
}

const integrations: Integration[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    icon: <Search className="h-8 w-8" />,
    status: 'connected',
    description: 'Search & Display campaigns',
    category: 'advertising',
    longDescription: 'Create and manage Google Ads campaigns directly from Campaign AI Studio. Launch search, display, video, and shopping campaigns with AI-powered optimization.',
    features: ['Search Campaigns', 'Display Network', 'Video Ads', 'Shopping Campaigns', 'Smart Bidding', 'Keyword Research'],
    pricing: 'Free integration • Pay per click',
    rating: 4.8,
    users: '2M+',
    setupSteps: [
      'Connect your Google Ads account',
      'Grant necessary permissions',
      'Select campaigns to sync',
      'Configure auto-optimization settings'
    ],
    apiEndpoints: ['Campaign Management', 'Keyword Research', 'Bid Management', 'Performance Reporting'],
    supportedFeatures: ['Real-time sync', 'Bulk operations', 'A/B testing', 'Smart recommendations']
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    icon: <Facebook className="h-8 w-8" />,
    status: 'connected',
    description: 'Social media advertising',
    category: 'advertising',
    longDescription: 'Manage Facebook and Instagram ad campaigns with advanced targeting and creative optimization. Reach your audience across Meta\'s family of apps.',
    features: ['Facebook Ads', 'Instagram Ads', 'Audience Targeting', 'Creative Tools', 'Lookalike Audiences', 'Pixel Tracking'],
    pricing: 'Free integration • Pay per impression/click',
    rating: 4.6,
    users: '3M+',
    setupSteps: [
      'Connect your Facebook Business account',
      'Install Facebook Pixel',
      'Set up conversion tracking',
      'Configure audience segments'
    ],
    apiEndpoints: ['Campaign Management', 'Audience Insights', 'Creative Testing', 'Attribution Reports'],
    supportedFeatures: ['Cross-platform campaigns', 'Dynamic ads', 'Retargeting', 'Conversion optimization']
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    icon: <BarChart3 className="h-8 w-8" />,
    status: 'connected',
    description: 'Website performance tracking',
    category: 'analytics',
    longDescription: 'Track website performance, user behavior, and conversion data. Get insights to optimize your campaigns and improve ROI.',
    features: ['Traffic Analysis', 'Conversion Tracking', 'Audience Insights', 'Custom Reports', 'Goal Tracking', 'E-commerce Tracking'],
    pricing: 'Free • Google Analytics 360 available',
    rating: 4.7,
    users: '10M+',
    setupSteps: [
      'Install Google Analytics tracking code',
      'Set up conversion goals',
      'Configure e-commerce tracking',
      'Connect to Campaign AI Studio'
    ],
    apiEndpoints: ['Reporting API', 'Real-time API', 'Management API', 'Data Import'],
    supportedFeatures: ['Real-time data', 'Custom dimensions', 'Attribution modeling', 'Audience insights']
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    icon: <Tag className="h-8 w-8" />,
    status: 'disconnected',
    description: 'Tag and pixel management',
    category: 'analytics',
    longDescription: 'Simplify tag management and tracking setup. Deploy marketing tags without changing code.',
    features: ['Tag Management', 'Pixel Tracking', 'Event Tracking', 'Conversion Tracking', 'Custom Variables', 'Debug Mode'],
    pricing: 'Free • GTM 360 available',
    rating: 4.5,
    users: '5M+',
    setupSteps: [
      'Create GTM container',
      'Install GTM code on website',
      'Configure tags and triggers',
      'Connect to Campaign AI Studio'
    ],
    apiEndpoints: ['Tag Manager API', 'Analytics API', 'Custom Events'],
    supportedFeatures: ['No-code deployment', 'Version control', 'Custom triggers', 'Real-time preview']
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    icon: <Users className="h-8 w-8" />,
    status: 'disconnected',
    description: 'CRM and marketing automation',
    category: 'crm',
    longDescription: 'Integrate with HubSpot CRM to sync leads, track customer journeys, and automate marketing workflows.',
    features: ['Contact Management', 'Lead Scoring', 'Email Marketing', 'Workflows', 'Deal Tracking', 'Sales Pipeline'],
    pricing: 'Free tier available • Paid plans from $50/month',
    rating: 4.5,
    users: '150K+',
    setupSteps: [
      'Connect your HubSpot account',
      'Map lead fields and properties',
      'Set up workflow triggers',
      'Configure lead scoring rules'
    ],
    apiEndpoints: ['Contacts API', 'Deals API', 'Companies API', 'Email Events API'],
    supportedFeatures: ['Lead sync', 'Custom properties', 'Automated workflows', 'Attribution tracking']
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: <Store className="h-8 w-8" />,
    status: 'error',
    description: 'E-commerce platform',
    category: 'crm',
    longDescription: 'Connect your Shopify store to sync product catalogs, track sales, and optimize e-commerce campaigns.',
    features: ['Product Sync', 'Order Tracking', 'Customer Data', 'Inventory Management', 'Sales Analytics', 'Dynamic Ads'],
    pricing: 'Free integration • Shopify plans from $29/month',
    rating: 4.4,
    users: '1.7M+',
    setupSteps: [
      'Install Campaign AI Studio app in Shopify',
      'Grant required permissions',
      'Sync product catalog',
      'Set up conversion tracking'
    ],
    apiEndpoints: ['Products API', 'Orders API', 'Customers API', 'Analytics API'],
    supportedFeatures: ['Product feed sync', 'Dynamic remarketing', 'Abandoned cart recovery', 'ROI tracking']
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: <Globe className="h-8 w-8" />,
    status: 'connected',
    description: 'Website content management',
    category: 'website',
    longDescription: 'Connect your WordPress site to track content performance and optimize your content marketing campaigns.',
    features: ['Content Tracking', 'SEO Analytics', 'User Engagement', 'Post Performance', 'Comment Analytics', 'Plugin Integration'],
    pricing: 'Free integration • WordPress hosting varies',
    rating: 4.3,
    users: '455M+',
    setupSteps: [
      'Install Campaign AI Studio plugin',
      'Configure tracking settings',
      'Set up content goals',
      'Connect analytics'
    ],
    apiEndpoints: ['Posts API', 'Users API', 'Comments API', 'Media API'],
    supportedFeatures: ['Content optimization', 'SEO tracking', 'User behavior analysis', 'Performance insights']
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: <Database className="h-8 w-8" />,
    status: 'disconnected',
    description: 'Customer relationship management',
    category: 'crm',
    longDescription: 'Integrate with Salesforce to sync customer data, track leads, and optimize B2B marketing campaigns.',
    features: ['Lead Management', 'Account Tracking', 'Opportunity Management', 'Custom Objects', 'Reports & Dashboards', 'Workflow Automation'],
    pricing: 'Free integration • Salesforce plans from $25/user/month',
    rating: 4.2,
    users: '150K+',
    setupSteps: [
      'Connect your Salesforce org',
      'Configure field mappings',
      'Set up lead routing',
      'Enable campaign tracking'
    ],
    apiEndpoints: ['REST API', 'SOAP API', 'Bulk API', 'Streaming API'],
    supportedFeatures: ['Real-time sync', 'Custom fields', 'Lead scoring', 'Campaign attribution']
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'advertising', name: 'Advertising' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'crm', name: 'CRM & E-commerce' },
  { id: 'website', name: 'Website' }
];

const aiConnectSteps: AIConnectStep[] = [
  {
    id: 'essential-advertising',
    title: 'Connect Essential Advertising Platforms',
    description: 'Start with the most important advertising platforms to reach your audience effectively',
    platforms: ['google-ads', 'facebook-ads'],
    icon: <Target className="h-6 w-6" />,
    status: 'current',
    estimatedTime: '5-10 minutes',
    benefits: [
      'Reach 95% of internet users',
      'AI-powered bid optimization',
      'Cross-platform audience insights'
    ]
  },
  {
    id: 'tracking-analytics',
    title: 'Set Up Tracking & Analytics',
    description: 'Enable comprehensive tracking to measure campaign performance and optimize results',
    platforms: ['google-analytics', 'google-tag-manager'],
    icon: <BarChart3 className="h-6 w-6" />,
    status: 'pending',
    estimatedTime: '10-15 minutes',
    benefits: [
      'Real-time performance insights',
      'Conversion tracking',
      'Attribution modeling'
    ]
  },
  {
    id: 'customer-data',
    title: 'Connect Customer Data Sources',
    description: 'Integrate your CRM and e-commerce platforms for personalized campaigns',
    platforms: ['hubspot', 'shopify'],
    icon: <Users className="h-6 w-6" />,
    status: 'pending',
    estimatedTime: '10-20 minutes',
    benefits: [
      'Personalized customer journeys',
      'Dynamic product ads',
      'Lead scoring and nurturing'
    ]
  },
  {
    id: 'expand-reach',
    title: 'Expand Your Reach',
    description: 'Add more platforms to maximize your marketing reach and effectiveness',
    platforms: ['instagram', 'twitter', 'linkedin', 'youtube'],
    icon: <Globe className="h-6 w-6" />,
    status: 'pending',
    estimatedTime: '15-25 minutes',
    benefits: [
      'Multi-channel presence',
      'Platform-specific content optimization',
      'Broader audience reach'
    ]
  }
];

interface IntegrationsPageProps {
  onShowOnboarding?: () => void;
}

export function IntegrationsPage({ onShowOnboarding }: IntegrationsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ai-connect');
  const [currentStep, setCurrentStep] = useState(0);

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Connection Error</Badge>;
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  const handleConnect = (integration: Integration) => {
    console.log(`Connecting to ${integration.name}...`);
    // Show onboarding modal when trying to connect any channel
    if (onShowOnboarding) {
      onShowOnboarding();
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case 'google-ads':
        return <Search className="h-5 w-5" />;
      case 'facebook-ads':
        return <Facebook className="h-5 w-5" />;
      case 'google-analytics':
        return <BarChart3 className="h-5 w-5" />;
      case 'google-tag-manager':
        return <Tag className="h-5 w-5" />;
      case 'hubspot':
        return <Users className="h-5 w-5" />;
      case 'shopify':
        return <Store className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getPlatformName = (platformId: string) => {
    const platform = integrations.find(i => i.id === platformId);
    return platform ? platform.name : platformId;
  };

  const startStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleStepConnect = (platformId: string) => {
    console.log(`Connecting to ${platformId}...`);
    // Show onboarding modal when trying to connect any channel
    if (onShowOnboarding) {
      onShowOnboarding();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Plug className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
              <h1 className="text-xl sm:text-2xl">Connect & Integrate</h1>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
          Connect your marketing platforms to enable AI-powered campaign creation
        </p>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-full sm:max-w-md">
            <TabsTrigger value="ai-connect" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">AI Connect</span>
              <span className="xs:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="all-integrations" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Plug className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">All Integrations</span>
              <span className="xs:hidden">All</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* AI Connect Tab */}
          <TabsContent value="ai-connect" className="m-0 h-full">
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Progress Overview */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl text-blue-900 dark:text-blue-100">AI-Guided Setup</h3>
                      <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300">Let AI guide you through connecting your platforms step-by-step</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs sm:text-sm self-start sm:self-auto">
                    {aiConnectSteps.filter(s => s.status === 'completed').length} of {aiConnectSteps.length} completed
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">30-60 minutes total</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Complete setup time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">Professional Setup</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Industry best practices</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-2">
                      <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-200">AI Optimization</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Auto-optimization enabled</p>
                  </div>
                </div>
              </Card>

              {/* Ready to get started section */}
              <Card className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <Image
                      src="/assets/10157d43732b6b78326298306e998e3ffad38209.png"
                      alt="AI Setup Wizard"
                      width={128}
                      height={128}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl text-emerald-900 dark:text-emerald-100 mb-1">Ready to get started?</h3>
                      <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-300">Connect all platforms automatically with our smart setup wizard</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-sm">
                      Skip Setup
                    </Button>
                    <Button className="gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-sm">
                      <Sparkles className="h-4 w-4" />
                      Start AI Setup
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Setup Steps */}
              <div className="space-y-4 sm:space-y-6">
                {aiConnectSteps.map((step, index) => (
                  <Card key={step.id} className={`p-4 sm:p-6 transition-all duration-200 ${
                    step.status === 'current' ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/50' :
                    step.status === 'completed' ? 'bg-green-50/50 dark:bg-green-950/50' :
                    'hover:shadow-md'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      {/* Step Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                        step.status === 'current' ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        ) : (
                          <span className={
                            step.status === 'current' ? 'text-blue-600' :
                            'text-gray-600'
                          }>
                            {step.icon}
                          </span>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className="text-base sm:text-lg mb-1">{step.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.estimatedTime}
                            </Badge>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            {step.status === 'completed' ? (
                              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            ) : step.status === 'current' ? (
                              <Button 
                                onClick={() => startStep(index)}
                                className="gap-2 text-sm w-full sm:w-auto"
                                size="sm"
                              >
                                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                                Start Setup
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                onClick={() => startStep(index)}
                                className="gap-2 text-sm w-full sm:w-auto"
                                size="sm"
                              >
                                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                                Start Setup
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Platforms */}
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Platforms to connect:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.platforms.map((platformId) => (
                              <div key={platformId} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-background border border-border rounded-lg">
                                {getPlatformIcon(platformId)}
                                <span className="text-xs sm:text-sm">{getPlatformName(platformId)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Benefits:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {step.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Connection Progress */}
                        {step.status === 'current' && (
                          <div className="mt-4 p-3 sm:p-4 bg-background border border-border rounded-lg">
                            <h5 className="text-sm mb-3">Quick Connect:</h5>
                            <div className="space-y-2">
                              {step.platforms.map((platformId) => (
                                <div key={platformId} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md gap-3">
                                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    {getPlatformIcon(platformId)}
                                    <span className="text-xs sm:text-sm truncate">{getPlatformName(platformId)}</span>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleStepConnect(platformId)}
                                    className="text-xs flex-shrink-0"
                                  >
                                    Connect
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step Connector */}
                    {index < aiConnectSteps.length - 1 && (
                      <div className="flex justify-center mt-4 sm:mt-6 mb-0">
                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* All Integrations Tab */}
          <TabsContent value="all-integrations" className="m-0 h-full">
            <div className="h-full flex flex-col">
              {/* Search and filters */}
              <div className="p-4 sm:p-6 border-b border-border flex-shrink-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm"
                      />
                    </div>
                  </div>

                  {/* Category tabs */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="text-xs sm:text-sm"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Integration grid */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredIntegrations.map((integration) => (
                    <Card key={integration.id} className="p-4 sm:p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          {integration.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-lg truncate">{integration.name}</h3>
                            {getStatusIcon(integration.status)}
                          </div>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">
                            {integration.description}
                          </p>
                          {getStatusBadge(integration.status)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
                        {integration.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{integration.rating}</span>
                          </div>
                        )}
                        {integration.users && (
                          <span>{integration.users} users</span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {integration.status === 'connected' ? (
                          <div className="space-y-2">
                            <Button className="w-full" variant="outline" size="sm">
                              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              <span className="text-xs sm:text-sm">Manage Connection</span>
                            </Button>
                            <Button className="w-full" variant="outline" size="sm">
                              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              <span className="text-xs sm:text-sm">View Analytics</span>
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            className="w-full" 
                            onClick={() => handleConnect(integration)}
                            size="sm"
                          >
                            <span className="text-xs sm:text-sm">Connect {integration.name}</span>
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}