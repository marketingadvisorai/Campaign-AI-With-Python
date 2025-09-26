import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Target, 
  Plus, 
  Eye, 
  Code, 
  Check, 
  AlertCircle, 
  DollarSign, 
  ShoppingCart, 
  UserPlus, 
  MousePointer, 
  Copy, 
  ExternalLink,
  TrendingUp,
  Activity,
  Sparkles,
  Play,
  Pause,
  BarChart,
  Facebook,
  Zap,
  Brain,
  Settings
} from 'lucide-react';

export function TrackingPage() {
  const [trackingEvents, setTrackingEvents] = useState([
    { 
      id: 'purchase', 
      name: 'Purchase', 
      icon: DollarSign, 
      enabled: true, 
      value: 50, 
      status: 'active', 
      conversions: 127,
      platforms: {
        facebook: { enabled: true, connected: true },
        google_analytics: { enabled: true, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'lead', 
      name: 'Lead Generation', 
      icon: UserPlus, 
      enabled: true, 
      value: 25, 
      status: 'active', 
      conversions: 89,
      platforms: {
        facebook: { enabled: true, connected: true },
        google_analytics: { enabled: true, connected: true },
        google_ads: { enabled: true, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'add-to-cart', 
      name: 'Add to Cart', 
      icon: ShoppingCart, 
      enabled: false, 
      value: 0, 
      status: 'inactive', 
      conversions: 0,
      platforms: {
        facebook: { enabled: false, connected: true },
        google_analytics: { enabled: false, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'page-view', 
      name: 'Page View', 
      icon: Eye, 
      enabled: true, 
      value: 0, 
      status: 'active', 
      conversions: 2834,
      platforms: {
        facebook: { enabled: false, connected: true },
        google_analytics: { enabled: true, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'click', 
      name: 'Link Click', 
      icon: MousePointer, 
      enabled: false, 
      value: 0, 
      status: 'inactive', 
      conversions: 0,
      platforms: {
        facebook: { enabled: false, connected: true },
        google_analytics: { enabled: false, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'session-start', 
      name: 'Session Start', 
      icon: Play, 
      enabled: true, 
      value: 0, 
      status: 'active', 
      conversions: 1256,
      platforms: {
        facebook: { enabled: false, connected: true },
        google_analytics: { enabled: true, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
    { 
      id: 'form-submit', 
      name: 'Form Submit', 
      icon: Target, 
      enabled: true, 
      value: 15, 
      status: 'active', 
      conversions: 45,
      platforms: {
        facebook: { enabled: true, connected: true },
        google_analytics: { enabled: true, connected: true },
        google_ads: { enabled: false, connected: false },
        custom: { enabled: false, connected: false }
      }
    },
  ]);

  const [aiAutoTrackingEnabled, setAiAutoTrackingEnabled] = useState(false);

  // Enhanced platforms with proper icons
  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook Pixel', 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      icon: Facebook
    },
    { 
      id: 'google_analytics', 
      name: 'Google Analytics', 
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      icon: BarChart
    },
    { 
      id: 'google_ads', 
      name: 'Google Ads', 
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      icon: Target
    },
    { 
      id: 'custom', 
      name: 'Custom Script', 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      icon: Code
    }
  ];

  const totalConversions = trackingEvents.reduce((sum, event) => sum + (event.enabled ? event.conversions : 0), 0);
  const totalValue = trackingEvents.reduce((sum, event) => sum + (event.enabled ? event.conversions * event.value : 0), 0);

  const toggleEventPlatform = (eventId: string, platformId: string, enabled: boolean) => {
    setTrackingEvents(trackingEvents.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          platforms: {
            ...event.platforms,
            [platformId]: {
              ...event.platforms[platformId],
              enabled
            }
          }
        };
      }
      return event;
    }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1>Conversion Tracking</h1>
          <p className="text-muted-foreground">
            Monitor and configure conversion tracking across all your marketing campaigns
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-chart-1" />
              <span className="text-sm">Active Events</span>
            </div>
            <div className="text-2xl">{trackingEvents.filter(e => e.enabled).length}</div>
            <div className="text-xs text-muted-foreground">of {trackingEvents.length} total</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-chart-2" />
              <span className="text-sm">Total Conversions</span>
            </div>
            <div className="text-2xl">{totalConversions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+12% this week</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-chart-3" />
              <span className="text-sm">Conversion Value</span>
            </div>
            <div className="text-2xl">${totalValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+18% this month</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-chart-4" />
              <span className="text-sm">Avg. Conv. Rate</span>
            </div>
            <div className="text-2xl">4.2%</div>
            <div className="text-xs text-muted-foreground">+0.3% vs last month</div>
          </Card>
        </div>

        {/* AI Auto Tracking */}
        <div className="space-y-6">
          <h2>AI Auto Tracking</h2>
          
          <Card className={`p-6 transition-all duration-300 ${
            aiAutoTrackingEnabled 
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800' 
              : 'bg-card'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  aiAutoTrackingEnabled 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-foreground flex items-center gap-2">
                    AI Auto Tracking 
                    {aiAutoTrackingEnabled && <Zap className="h-4 w-4 text-blue-500" />}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {aiAutoTrackingEnabled 
                      ? 'AI is automatically detecting and tracking conversion events across all platforms'
                      : 'Let AI automatically detect and track important user interactions and conversions'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={aiAutoTrackingEnabled ? 'default' : 'secondary'}
                  className={aiAutoTrackingEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                >
                  {aiAutoTrackingEnabled ? (
                    <><Check className="h-3 w-3 mr-1" />Active</>
                  ) : (
                    <><Pause className="h-3 w-3 mr-1" />Inactive</>
                  )}
                </Badge>
                <Switch
                  checked={aiAutoTrackingEnabled}
                  onCheckedChange={setAiAutoTrackingEnabled}
                />
              </div>
            </div>
            
            {aiAutoTrackingEnabled && (
              <div className="space-y-6 pt-4 border-t border-border">
                {/* AI Tracking Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-foreground text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Auto-Detected Events
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Eye className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm">Page Views</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                            <MousePointer className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="text-sm">Button Clicks</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <Play className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="text-sm">Session Duration</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-red-100 dark:bg-red-900 flex items-center justify-center">
                            <Target className="h-3 w-3 text-red-600 dark:text-red-400" />
                          </div>
                          <span className="text-sm">Form Interactions</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-foreground text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4 text-purple-500" />
                      Smart Configuration
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Auto-optimizing event values</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">AI is learning from conversion patterns to set optimal event values</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Smart attribution windows</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">Automatically adjusting attribution windows based on user behavior</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Cross-platform syncing</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">Ensuring consistent tracking across Facebook, Google Analytics, and Google Ads</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">Anomaly detection</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">Monitoring for unusual patterns and alerting you to potential issues</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI Insights */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/10 dark:to-purple-950/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-foreground text-sm mb-2">AI Insights</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Detected 23% increase in mobile conversions - auto-enabled mobile-specific tracking</p>
                        <p>• Form abandonment rate is 45% higher on checkout page - added micro-conversion tracking</p>
                        <p>• Users spend 2.3x longer on product pages before converting - optimized attribution window</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Eye className="h-3 w-3" />
                    View AI Report
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Settings className="h-3 w-3" />
                    Configure AI Rules
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Pause className="h-3 w-3" />
                    Pause Learning
                  </Button>
                </div>
              </div>
            )}
            
            {!aiAutoTrackingEnabled && (
              <div className="text-center py-6">
                <div className="space-y-4">
                  <div className="text-muted-foreground text-sm">
                    Enable AI Auto Tracking to automatically detect and track:
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Page Views
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <MousePointer className="h-3 w-3" />
                      Button Clicks
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Target className="h-3 w-3" />
                      Form Submissions
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Play className="h-3 w-3" />
                      Session Events
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <ShoppingCart className="h-3 w-3" />
                      E-commerce Events
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => setAiAutoTrackingEnabled(true)}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Zap className="h-4 w-4" />
                    Enable AI Auto Tracking
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Conversion Events */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Conversion Events</h2>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Custom Event
            </Button>
          </div>

          <div className="grid gap-4">
            {trackingEvents.map((event) => {
              const Icon = event.icon;
              return (
                <Card key={event.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-foreground">{event.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {event.value > 0 ? `Value: $${event.value} • ` : ''}{event.conversions} conversions this month
                        </p>
                        {/* Platform Connection Status */}
                        <div className="flex items-center gap-2 mt-2">
                          {platforms.map((platform) => {
                            const platformData = event.platforms[platform.id];
                            const isConnected = platformData.connected;
                            const isEnabled = platformData.enabled;
                            const PlatformIcon = platform.icon;
                            
                            return (
                              <Badge 
                                key={platform.id}
                                variant={isEnabled && isConnected ? 'default' : 'secondary'}
                                className={`text-xs flex items-center gap-1 ${
                                  isEnabled && isConnected 
                                    ? platform.color 
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}
                              >
                                <PlatformIcon className="h-3 w-3" />
                                {platform.name.split(' ')[0]}
                                {isEnabled && isConnected && <Check className="h-3 w-3" />}
                                {!isConnected && <AlertCircle className="h-3 w-3" />}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant={event.status === 'active' ? 'default' : 'secondary'}
                        className={event.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                      >
                        {event.status === 'active' ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {event.status}
                      </Badge>
                      <Switch
                        checked={event.enabled}
                        onCheckedChange={(checked) => {
                          setTrackingEvents(trackingEvents.map((e) => 
                            e.id === event.id ? { ...e, enabled: checked, status: checked ? 'active' : 'inactive' } : e
                          ));
                        }}
                      />
                    </div>
                  </div>
                  
                  {event.enabled && (
                    <div className="space-y-6 pt-4 border-t border-border">
                      {/* Event Configuration */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-foreground text-sm">Event Value ($)</label>
                          <Input
                            type="number"
                            value={event.value}
                            onChange={(e) => {
                              setTrackingEvents(trackingEvents.map((ev) => 
                                ev.id === event.id ? { ...ev, value: parseFloat(e.target.value) || 0 } : ev
                              ));
                            }}
                            placeholder="0.00"
                            className="bg-input-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-foreground text-sm">Attribution Window</label>
                          <Select defaultValue="30">
                            <SelectTrigger className="bg-input-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 day</SelectItem>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-foreground text-sm">Actions</label>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="gap-2">
                              <Eye className="h-3 w-3" />
                              Test
                            </Button>
                            <Button size="sm" variant="ghost" className="gap-2">
                              <Code className="h-3 w-3" />
                              Code
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Platform Toggles */}
                      <div className="space-y-4">
                        <h4 className="text-foreground text-sm">Connected Platforms</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {platforms.map((platform) => {
                            const platformData = event.platforms[platform.id];
                            const isConnected = platformData.connected;
                            const isEnabled = platformData.enabled;
                            
                            return (
                              <div 
                                key={platform.id} 
                                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                                  isConnected 
                                    ? 'border-border bg-card' 
                                    : 'border-dashed border-muted-foreground/30 bg-muted/20'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    isConnected ? platform.color : 'bg-muted text-muted-foreground'
                                  }`}>
                                    <platform.icon className="h-4 w-4" />
                                  </div>                                  <div>
                                    <p className={`text-sm ${isConnected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {platform.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {isConnected ? 'Connected' : 'Not connected'}
                                      {isConnected && isEnabled && ' • Active'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!isConnected && (
                                    <Button size="sm" variant="outline" className="text-xs h-8 px-3">
                                      Connect
                                    </Button>
                                  )}
                                  {isConnected && (
                                    <Switch
                                      checked={isEnabled}
                                      onCheckedChange={(checked) => toggleEventPlatform(event.id, platform.id, checked)}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Platform Integration */}
        <div className="space-y-6">
          <h2>Platform Integration</h2>
          
          <div className="grid gap-6">
            {/* Facebook/Meta Pixel */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-foreground">Facebook Pixel</h3>
                    <p className="text-muted-foreground text-sm">Track conversions from Facebook & Instagram ads</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-foreground text-sm">Pixel ID</label>
                  <Input 
                    placeholder="123456789012345"
                    defaultValue="987654321098765"
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-foreground text-sm">Access Token</label>
                  <Input 
                    type="password"
                    placeholder="Your access token"
                    defaultValue="•••••••••••••••"
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Eye className="h-3 w-3" />
                  Test Connection
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <Copy className="h-3 w-3" />
                  Copy Pixel Code
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  View in Meta
                </Button>
              </div>
            </Card>

            {/* Google Analytics 4 */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-foreground">Google Analytics 4</h3>
                    <p className="text-muted-foreground text-sm">Track website conversions and user behavior</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-foreground text-sm">Measurement ID</label>
                  <Input 
                    placeholder="G-XXXXXXXXXX"
                    defaultValue="G-ABC123DEF456"
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-foreground text-sm">API Secret</label>
                  <Input 
                    type="password"
                    placeholder="Your API secret"
                    defaultValue="•••••••••••••••"
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Eye className="h-3 w-3" />
                  Test Tracking
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  View in GA4
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <Code className="h-3 w-3" />
                  Setup Guide
                </Button>
              </div>
            </Card>

            {/* Google Ads Conversion */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-foreground">Google Ads Conversion</h3>
                    <p className="text-muted-foreground text-sm">Track conversions from Google Ads campaigns</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Setup Required
                  </Badge>
                  <Switch />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-foreground text-sm">Conversion ID</label>
                  <Input 
                    placeholder="AW-123456789"
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-foreground text-sm">Conversion Label</label>
                  <Input 
                    placeholder="AbCdEfGhIjKlMnOp"
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Code className="h-3 w-3" />
                  Setup Instructions
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Google Ads Help
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Attribution Settings */}
        <div className="space-y-6">
          <h2>Attribution Settings</h2>
          
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-foreground text-sm">Attribution Model</label>
                <Select defaultValue="last-click">
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-click">First Click</SelectItem>
                    <SelectItem value="last-click">Last Click</SelectItem>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="time-decay">Time Decay</SelectItem>
                    <SelectItem value="data-driven">Data Driven</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs">How to credit conversions to campaigns</p>
              </div>

              <div className="space-y-2">
                <label className="text-foreground text-sm">Click Attribution Window</label>
                <Select defaultValue="30">
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs">Days to attribute conversions after click</p>
              </div>

              <div className="space-y-2">
                <label className="text-foreground text-sm">View Attribution Window</label>
                <Select defaultValue="1">
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs">Days to attribute conversions after impression</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tracking Health */}
        <div className="space-y-6">
          <h2>Tracking Health</h2>
          
          <Card className="p-6 bg-muted/30">
            <div className="flex items-center gap-4 mb-4">
              <Check className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-foreground">All Systems Operational</h3>
                <p className="text-muted-foreground text-sm">Last health check: 15 minutes ago</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Facebook Pixel firing correctly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Google Analytics receiving data</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-muted-foreground">Google Ads conversion setup pending</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Purchase events tracking properly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Lead generation events active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Page view tracking functional</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-6">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Run Full Health Check
              </Button>
              <Button variant="ghost" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Detailed Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}