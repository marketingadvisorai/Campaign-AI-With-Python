import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign, 
  Users, 
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Eye,
  MousePointer,
  RefreshCw,
  Settings,
  ChevronRight,
  Play,
  Pause,
  MoreHorizontal,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Search,
  Mail,
  Youtube,
  Twitter,
  History,
  Calendar,
  Activity,
  BarChart3,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  FileImage
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';

// Mock data for AI Optimization stats
const AI_OPTIMIZATION_STATS = [
  {
    icon: Sparkles,
    label: 'Active Optimizations',
    value: '12',
    change: '+3',
    changeType: 'positive'
  },
  {
    icon: DollarSign,
    label: 'Cost Savings',
    value: '$2,847',
    change: '+18%',
    changeType: 'positive'
  },
  {
    icon: TrendingUp,
    label: 'Performance Boost',
    value: '+24%',
    change: '+6%',
    changeType: 'positive'
  },
  {
    icon: Target,
    label: 'Optimization Score',
    value: '87/100',
    change: '+5',
    changeType: 'positive'
  }
];

// Mock data for platforms
const CONNECTED_PLATFORMS = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    icon: Search,
    status: 'connected',
    aiEnabled: true,
    campaigns: 12,
    optimizations: 8,
    spend: '$2,450',
    lastSync: '2 min ago'
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads', 
    icon: Facebook,
    status: 'connected',
    aiEnabled: true,
    campaigns: 8,
    optimizations: 5,
    spend: '$1,890',
    lastSync: '5 min ago'
  }
];

const OPTIMIZED_CAMPAIGNS = [
  {
    id: 'camp-1',
    name: 'Coffee Shop Multi-Platform',
    platforms: ['Google Ads', 'Facebook'],
    status: 'optimizing',
    aiScore: '92/100',
    spend: '$2,500',
    roas: '4.2x',
    lastOptimized: '2 hours ago',
    optimizations: [
      { type: 'bid adjustment', status: 'active', impact: '+12% ROAS' },
      { type: 'audience expansion', status: 'learning', impact: '+8% reach' }
    ]
  }
];

const RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Increase Weekend Budgets',
    description: 'Your campaigns perform 34% better on weekends',
    impact: 'Expected +$450 revenue',
    priority: 'high',
    confidence: 92,
    campaign: 'Coffee Shop Campaign',
    action: 'Apply Change'
  }
];

const ACTIVE_OPTIMIZATIONS = [
  {
    id: 'opt-1',
    name: 'Smart Bidding',
    description: 'Automatically adjust bids based on performance',
    enabled: true,
    status: 'active',
    campaign: 'Coffee Shop Campaign',
    savings: '$234',
    impact: 'High',
    performance: 87
  }
];

const OPTIMIZATION_HISTORY = [
  {
    id: 'hist-1',
    type: 'Bid Adjustment',
    campaign: 'Coffee Shop Campaign',
    platform: 'Google Ads',
    status: 'success',
    action: 'Increased max CPC by 15%',
    date: '2024-01-15T10:30:00Z',
    savings: '$123',
    impact: {
      metric: 'ROAS',
      before: '3.2x',
      after: '4.1x',
      change: '+28%'
    }
  }
];

export function AIOptimizationPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
      case 'medium':
        return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950';
      case 'low':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
      default:
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900';
      case 'learning':
        return 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900';
      case 'paused':
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900';
    }
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl">AI Optimization</h2>
                <p className="text-muted-foreground">
                  Intelligent campaign optimization powered by machine learning
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_OPTIMIZATION_STATS.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="h-4 w-4 text-chart-1" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{stat.value}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Optimization Score */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Overall Optimization Score</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Excellent
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">87</div>
                    <div className="text-sm text-muted-foreground">Out of 100</div>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Budget Efficiency</div>
                      <div className="text-green-600">92/100</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Audience Quality</div>
                      <div className="text-green-600">89/100</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Creative Performance</div>
                      <div className="text-orange-600">78/100</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Timing Optimization</div>
                      <div className="text-green-600">91/100</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Insights */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg">AI Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="text-blue-800 dark:text-blue-200 mb-1">Peak Performance Detected</div>
                        <div className="text-blue-600 dark:text-blue-300">Your campaigns perform 34% better on weekends. Consider increasing weekend budgets.</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="text-green-800 dark:text-green-200 mb-1">Audience Opportunity</div>
                        <div className="text-green-600 dark:text-green-300">Lookalike audiences from your top customers show 280% higher conversion rates.</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="text-orange-800 dark:text-orange-200 mb-1">Timing Optimization</div>
                        <div className="text-orange-600 dark:text-orange-300">Shift 15% of budget from 2-6 AM to 7-9 PM for better performance.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>Auto-optimize All</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Budget Reallocation</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Audience Expansion</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>Creative Testing</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONNECTED_PLATFORMS.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Card key={platform.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground">Last sync: {platform.lastSync}</p>
                        </div>
                      </div>
                      <Badge className={`${platform.status === 'connected' ? 
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
                        {platform.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Campaigns</div>
                        <div className="text-lg">{platform.campaigns}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Optimizations</div>
                        <div className="text-lg">{platform.optimizations}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Monthly Spend</div>
                        <div className="text-lg">{platform.spend}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">AI Status</div>
                        <div className="flex items-center gap-2">
                          <Switch checked={platform.aiEnabled} />
                          <span className="text-sm">{platform.aiEnabled ? 'On' : 'Off'}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            {OPTIMIZED_CAMPAIGNS.map((campaign) => (
              <Card key={campaign.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{campaign.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Platforms: {campaign.platforms.join(', ')}</span>
                      <span>Last optimized: {campaign.lastOptimized}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">AI Score</div>
                    <div className="text-2xl">{campaign.aiScore}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Spend</div>
                    <div className="text-2xl">{campaign.spend}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">ROAS</div>
                    <div className="text-2xl">{campaign.roas}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Active Optimizations</h4>
                  {campaign.optimizations.map((opt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(opt.status)}>
                          {opt.status}
                        </Badge>
                        <span className="text-sm capitalize">{opt.type}</span>
                      </div>
                      <span className="text-sm text-green-600">{opt.impact}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            {RECOMMENDATIONS.map((rec) => (
              <Card key={rec.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">{rec.title}</h3>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{rec.description}</p>
                    <div className="text-sm text-muted-foreground">
                      Campaign: {rec.campaign}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium mb-1">{rec.impact}</div>
                    <div className="text-sm text-muted-foreground">
                      {rec.confidence}% confidence
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Progress value={rec.confidence} className="flex-1 mr-4" />
                  <Button size="sm">
                    {rec.action}
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Active Optimizations Tab */}
          <TabsContent value="active" className="space-y-4">
            {ACTIVE_OPTIMIZATIONS.map((opt) => (
              <Card key={opt.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{opt.name}</h3>
                    <p className="text-muted-foreground mb-2">{opt.description}</p>
                    <div className="text-sm text-muted-foreground">
                      Campaign: {opt.campaign}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={opt.enabled} />
                    <Badge className={getStatusColor(opt.status)}>
                      {opt.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                    <div className="text-xl text-green-600">{opt.savings}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Impact</div>
                    <div className="text-xl">{opt.impact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                    <div className="text-xl">{opt.performance}%</div>
                  </div>
                </div>

                <Progress value={opt.performance} className="mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Optimization Performance</span>
                  <span>{opt.performance}%</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {OPTIMIZATION_HISTORY.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{item.type}</h3>
                      <Badge className={item.status === 'success' ? 
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.campaign} • {item.platform}
                    </p>
                    <p className="text-sm">{item.action}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="text-green-600 font-medium">
                      Saved {item.savings}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{item.impact.metric}: </span>
                    <span>{item.impact.before} → {item.impact.after}</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    {item.impact.change}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}