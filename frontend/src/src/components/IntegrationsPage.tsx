import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, Plus, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  status: 'active' | 'inactive' | 'error';
  logo: string;
}

const integrations: Integration[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Create and manage Google advertising campaigns',
    category: 'Advertising',
    connected: true,
    status: 'active',
    logo: '🟢'
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    description: 'Manage Facebook and Instagram advertising',
    category: 'Advertising',
    connected: true,
    status: 'active',
    logo: '🔵'
  },
  {
    id: 'youtube-ads',
    name: 'YouTube Ads',
    description: 'Create video advertising campaigns on YouTube',
    category: 'Advertising',
    connected: false,
    status: 'inactive',
    logo: '🔴'
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    description: 'B2B advertising and lead generation',
    category: 'Advertising',
    connected: false,
    status: 'inactive',
    logo: '🔷'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Connect your e-commerce store for better targeting',
    category: 'E-commerce',
    connected: true,
    status: 'active',
    logo: '🟢'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing automation and campaigns',
    category: 'Email Marketing',
    connected: false,
    status: 'inactive',
    logo: '🟡'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM integration for lead tracking and nurturing',
    category: 'CRM',
    connected: true,
    status: 'error',
    logo: '🟠'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Enterprise CRM and lead management',
    category: 'CRM',
    connected: false,
    status: 'inactive',
    logo: '☁️'
  }
];

export function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Advertising', 'E-commerce', 'Email Marketing', 'CRM'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (integrationId: string) => {
    // Handle connection logic here
    console.log(`Connecting to ${integrationId}`);
  };

  const handleDisconnect = (integrationId: string) => {
    // Handle disconnection logic here
    console.log(`Disconnecting from ${integrationId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (connected: boolean, status: string) => {
    if (!connected) {
      return <Badge variant="secondary">Not Connected</Badge>;
    }
    
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-medium text-foreground">Integrations</h1>
              <p className="text-muted-foreground">Connect your marketing tools and platforms</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search integrations..." 
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Browse All
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  {getStatusBadge(integration.connected, integration.status)}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>
              
              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      Disconnect
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleConnect(integration.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No integrations found</h3>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}