import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Search, Facebook, BarChart3, Store, Users, CheckCircle, AlertCircle, Star, TrendingUp, Zap, Shield, Clock, ExternalLink, BookOpen, Settings, Key, Link } from 'lucide-react';
const integrations = [
    {
        id: 'google-ads',
        name: 'Google Ads',
        icon: <Search className="h-8 w-8"/>,
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
        icon: <Facebook className="h-8 w-8"/>,
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
        icon: <BarChart3 className="h-8 w-8"/>,
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
        id: 'hubspot',
        name: 'HubSpot',
        icon: <Users className="h-8 w-8"/>,
        status: 'disconnected',
        description: 'CRM and marketing automation',
        category: 'crm',
        longDescription: 'Integrate with HubSpot CRM to sync leads, track customer journeys, and automate marketing workflows. Perfect for B2B campaign optimization.',
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
        icon: <Store className="h-8 w-8"/>,
        status: 'error',
        description: 'E-commerce platform',
        category: 'crm',
        longDescription: 'Connect your Shopify store to sync product catalogs, track sales, and optimize e-commerce campaigns. Drive more sales with AI-powered recommendations.',
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
    }
];
export function IntegrationModal({ isOpen, onClose }) {
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'advertising', name: 'Advertising' },
        { id: 'analytics', name: 'Analytics' },
        { id: 'crm', name: 'CRM & E-commerce' },
        { id: 'website', name: 'Website' }
    ];
    const filteredIntegrations = integrations.filter(integration => {
        const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            integration.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const getStatusIcon = (status) => {
        switch (status) {
            case 'connected':
                return <CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'error':
                return <AlertCircle className="h-4 w-4 text-destructive"/>;
            default:
                return <div className="h-4 w-4 rounded-full bg-muted"/>;
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'connected':
                return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>;
            case 'error':
                return <Badge variant="destructive">Connection Error</Badge>;
            default:
                return <Badge variant="secondary">Not Connected</Badge>;
        }
    };
    const handleConnect = (integration) => {
        console.log(`Connecting to ${integration.name}...`);
        // Mock connection logic
    };
    if (selectedIntegration) {
        return (<Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="flex h-full">
            {/* Left side - Integration details */}
            <div className="flex-1 p-6">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIntegration(null)} className="px-2">
                    ← Back
                  </Button>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    {selectedIntegration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <DialogTitle className="text-2xl">{selectedIntegration.name}</DialogTitle>
                      {getStatusIcon(selectedIntegration.status)}
                    </div>
                    <p className="text-muted-foreground mb-3">{selectedIntegration.longDescription}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {selectedIntegration.rating && (<div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                          <span>{selectedIntegration.rating}</span>
                        </div>)}
                      {selectedIntegration.users && (<div className="flex items-center gap-1">
                          <Users className="h-4 w-4"/>
                          <span>{selectedIntegration.users} users</span>
                        </div>)}
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4"/>
                        <span>Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-96 mt-4">
                  <TabsContent value="overview" className="space-y-4">
                    <Card className="p-4">
                      <h3 className="mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4"/>
                        Key Features
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedIntegration.features?.map((feature, index) => (<div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500"/>
                            <span>{feature}</span>
                          </div>))}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4"/>
                        Supported Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedIntegration.supportedFeatures?.map((feature, index) => (<Badge key={index} variant="outline">{feature}</Badge>))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="setup" className="space-y-4">
                    <Card className="p-4">
                      <h3 className="mb-3 flex items-center gap-2">
                        <Settings className="h-4 w-4"/>
                        Setup Steps
                      </h3>
                      <div className="space-y-3">
                        {selectedIntegration.setupSteps?.map((step, index) => (<div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                              {index + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>))}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="mb-3 flex items-center gap-2">
                        <Key className="h-4 w-4"/>
                        API Endpoints
                      </h3>
                      <div className="space-y-2">
                        {selectedIntegration.apiEndpoints?.map((endpoint, index) => (<div key={index} className="flex items-center gap-2 text-sm">
                            <Link className="h-3 w-3 text-muted-foreground"/>
                            <span>{endpoint}</span>
                          </div>))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-4">
                    <Card className="p-4">
                      <h3 className="mb-3">All Features</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedIntegration.features?.map((feature, index) => (<div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5"/>
                            <div>
                              <div className="text-sm">{feature}</div>
                              <div className="text-xs text-muted-foreground">
                                Available in this integration
                              </div>
                            </div>
                          </div>))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <Card className="p-4">
                      <h3 className="mb-3">Pricing Information</h3>
                      <div className="text-lg mb-2">{selectedIntegration.pricing}</div>
                      <p className="text-sm text-muted-foreground">
                        Integration is free. You only pay for the platform's standard pricing.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h3 className="mb-3">What's Included</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500"/>
                          <span>Full API access</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500"/>
                          <span>Real-time synchronization</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500"/>
                          <span>24/7 support</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500"/>
                          <span>Advanced analytics</span>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>

            {/* Right side - Connection status and actions */}
            <div className="w-80 border-l border-border p-6 bg-muted/20">
              <div className="space-y-4">
                <div className="text-center">
                  {getStatusBadge(selectedIntegration.status)}
                </div>

                {selectedIntegration.status === 'connected' ? (<div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Settings className="h-4 w-4 mr-2"/>
                      Manage Connection
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2"/>
                      View Analytics
                    </Button>
                    <Button className="w-full" variant="destructive">
                      Disconnect
                    </Button>
                  </div>) : (<div className="space-y-3">
                    <Button className="w-full" onClick={() => handleConnect(selectedIntegration)}>
                      Connect {selectedIntegration.name}
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2"/>
                      View Documentation
                    </Button>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2"/>
                      Visit Website
                    </Button>
                  </div>)}

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm">Last Activity</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4"/>
                    <span>Synced 2 hours ago</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm">Connection Health</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>API Status</span>
                      <span className="text-green-600">Healthy</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Data Sync</span>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Error</span>
                      <span className="text-muted-foreground">None</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>);
    }
    return (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">Explore Integrations</DialogTitle>
              <p className="text-muted-foreground">
                Connect your marketing platforms to enable AI-powered campaign creation
              </p>
            </DialogHeader>

            {/* Search and filters */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <input type="text" placeholder="Search integrations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background"/>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mt-4">
              {categories.map((category) => (<Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </Button>))}
            </div>
          </div>

          {/* Integration grid */}
          <ScrollArea className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (<Card key={integration.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedIntegration(integration)}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm truncate">{integration.name}</h3>
                        {getStatusIcon(integration.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {integration.description}
                      </p>
                      {getStatusBadge(integration.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {integration.rating && (<div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400"/>
                        <span>{integration.rating}</span>
                      </div>)}
                    {integration.users && (<span>{integration.users} users</span>)}
                  </div>
                </Card>))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>);
}
