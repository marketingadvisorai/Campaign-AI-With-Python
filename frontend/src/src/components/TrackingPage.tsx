import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Target, Plus, Search, Settings, Eye, EyeOff, Activity } from 'lucide-react';

interface TrackingEvent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggers: number;
  lastTriggered: string;
  category: string;
}

const trackingEvents: TrackingEvent[] = [
  {
    id: 'page-view',
    name: 'Page View',
    description: 'Track when users visit your website pages',
    status: 'active',
    triggers: 12547,
    lastTriggered: '2 minutes ago',
    category: 'Website'
  },
  {
    id: 'form-submit',
    name: 'Form Submission',
    description: 'Track when users submit contact forms',
    status: 'active',
    triggers: 342,
    lastTriggered: '15 minutes ago',
    category: 'Conversion'
  },
  {
    id: 'purchase',
    name: 'Purchase Complete',
    description: 'Track completed purchases and revenue',
    status: 'active',
    triggers: 89,
    lastTriggered: '1 hour ago',
    category: 'E-commerce'
  },
  {
    id: 'video-play',
    name: 'Video Play',
    description: 'Track when users play embedded videos',
    status: 'inactive',
    triggers: 256,
    lastTriggered: '3 hours ago',
    category: 'Engagement'
  },
  {
    id: 'download',
    name: 'File Download',
    description: 'Track PDF and file downloads',
    status: 'active',
    triggers: 123,
    lastTriggered: '45 minutes ago',
    category: 'Engagement'
  },
  {
    id: 'newsletter-signup',
    name: 'Newsletter Signup',
    description: 'Track newsletter subscription events',
    status: 'active',
    triggers: 67,
    lastTriggered: '30 minutes ago',
    category: 'Conversion'
  }
];

export function TrackingPage() {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-medium text-foreground">Tracking</h1>
              <p className="text-muted-foreground">Monitor conversion events and campaign performance</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-xs text-green-600">2 added this week</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Triggers</p>
                  <p className="text-3xl font-bold">13.4K</p>
                  <p className="text-xs text-blue-600">+1.2K this week</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold">4.8%</p>
                  <p className="text-xs text-purple-600">+0.3% improvement</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Tracking Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Tracking Events</h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Global Settings
              </Button>
            </div>
            
            <div className="space-y-4">
              {trackingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch checked={event.status === 'active'} />
                      {event.status === 'active' ? (
                        <Eye className="h-4 w-4 text-green-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{event.triggers.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">triggers</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm">{event.lastTriggered}</p>
                      <p className="text-xs text-muted-foreground">last triggered</p>
                    </div>
                    
                    <Badge variant="outline">{event.category}</Badge>
                    
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Purchase Complete event triggered</p>
                  <p className="text-xs text-muted-foreground">Order #12345 - $127.50 revenue</p>
                </div>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Form Submission event triggered</p>
                  <p className="text-xs text-muted-foreground">Contact form on /contact page</p>
                </div>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Newsletter Signup event triggered</p>
                  <p className="text-xs text-muted-foreground">Homepage newsletter form</p>
                </div>
                <p className="text-xs text-muted-foreground">30 minutes ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}