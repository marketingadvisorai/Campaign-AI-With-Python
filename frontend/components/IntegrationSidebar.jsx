import { useState } from 'react';
import { Badge } from './ui/badge';
import { Plug, Search, Facebook, BarChart3, Tag, Globe, Store, Users, Database, CheckCircle, AlertCircle } from 'lucide-react';
const integrations = [
    {
        id: 'google-ads',
        name: 'Google Ads',
        icon: <Search className="h-5 w-5"/>,
        status: 'connected',
        description: 'Search & Display campaigns',
        category: 'advertising'
    },
    {
        id: 'facebook-ads',
        name: 'Facebook Ads',
        icon: <Facebook className="h-5 w-5"/>,
        status: 'connected',
        description: 'Social media advertising',
        category: 'advertising'
    },
    {
        id: 'google-analytics',
        name: 'Google Analytics',
        icon: <BarChart3 className="h-5 w-5"/>,
        status: 'connected',
        description: 'Website performance tracking',
        category: 'analytics'
    },
    {
        id: 'google-tag-manager',
        name: 'Google Tag Manager',
        icon: <Tag className="h-5 w-5"/>,
        status: 'disconnected',
        description: 'Tag and pixel management',
        category: 'analytics'
    },
    {
        id: 'wordpress',
        name: 'WordPress',
        icon: <Globe className="h-5 w-5"/>,
        status: 'connected',
        description: 'Website content management',
        category: 'website'
    },
    {
        id: 'hubspot',
        name: 'HubSpot',
        icon: <Users className="h-5 w-5"/>,
        status: 'disconnected',
        description: 'CRM and marketing automation',
        category: 'crm'
    },
    {
        id: 'shopify',
        name: 'Shopify',
        icon: <Store className="h-5 w-5"/>,
        status: 'error',
        description: 'E-commerce platform',
        category: 'crm'
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        icon: <Database className="h-5 w-5"/>,
        status: 'disconnected',
        description: 'Customer relationship management',
        category: 'crm'
    }
];
const categoryLabels = {
    advertising: 'Advertising Platforms',
    analytics: 'Analytics & Tracking',
    website: 'Website Platforms',
    crm: 'CRM & E-commerce'
};
export function IntegrationSidebar() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                return <Badge variant="destructive">Error</Badge>;
            default:
                return <Badge variant="secondary">Disconnected</Badge>;
        }
    };
    const handleConnect = (integration) => {
        // Mock connection logic
        console.log(`Connecting to ${integration.name}...`);
    };
    const groupedIntegrations = integrations.reduce((acc, integration) => {
        if (!acc[integration.category]) {
            acc[integration.category] = [];
        }
        acc[integration.category].push(integration);
        return acc;
    }, {});
    return (<div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Plug className="h-5 w-5 text-sidebar-foreground"/>
          <h2 className="text-sidebar-foreground">Connect & Integrate</h2>
        </div>
        <p className="text-sidebar-foreground/60 text-sm">
          Connect your marketing platforms to enable AI-powered campaign creation
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-center">
          <p className="text-sidebar-foreground/60 text-xs mb-2">
            {integrations.filter(i => i.status === 'connected').length} of {integrations.length} platforms connected
          </p>
          <div className="w-full bg-sidebar-border rounded-full h-2">
            <div className="bg-sidebar-primary h-2 rounded-full transition-all duration-300" style={{
            width: `${(integrations.filter(i => i.status === 'connected').length / integrations.length) * 100}%`
        }}/>
          </div>
        </div>
      </div>
    </div>);
}
