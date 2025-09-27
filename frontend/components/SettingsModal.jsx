import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Settings, Bell, Smile, Plug, Calendar, Shield, Database, User, Play, Target, Plus, Eye, Code, Check, AlertCircle, DollarSign, ShoppingCart, UserPlus, MousePointer, Copy, ExternalLink } from 'lucide-react';
const settingsMenuItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'personalization', label: 'Personalization', icon: Smile },
    { id: 'connectors', label: 'Connectors', icon: Plug },
    { id: 'tracking', label: 'Tracking', icon: Target },
    { id: 'schedules', label: 'Schedules', icon: Calendar },
    { id: 'data-controls', label: 'Data controls', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'account', label: 'Account', icon: User }
];
export function SettingsModal({ open, onOpenChange, theme, onThemeChange }) {
    const [activeSection, setActiveSection] = useState('general');
    const [showAdditionalModels, setShowAdditionalModels] = useState(true);
    const [trackingEvents, setTrackingEvents] = useState([
        { id: 'purchase', name: 'Purchase', icon: DollarSign, enabled: true, value: 50, status: 'active' },
        { id: 'lead', name: 'Lead Generation', icon: UserPlus, enabled: true, value: 25, status: 'active' },
        { id: 'add-to-cart', name: 'Add to Cart', icon: ShoppingCart, enabled: false, value: 0, status: 'inactive' },
        { id: 'page-view', name: 'Page View', icon: Eye, enabled: true, value: 0, status: 'active' },
        { id: 'click', name: 'Link Click', icon: MousePointer, enabled: false, value: 0, status: 'inactive' },
    ]);
    const [newEventName, setNewEventName] = useState('');
    const renderGeneralSettings = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">General</h2>
        <Separator className="bg-border"/>
      </div>

      {/* Theme */}
      <div className="flex items-center justify-between py-2">
        <label className="text-foreground text-sm">Theme</label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-32 bg-input-background border-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Accent color */}
      <div className="flex items-center justify-between py-2">
        <label className="text-foreground text-sm">Accent color</label>
        <Select defaultValue="default">
          <SelectTrigger className="w-32 bg-input-background border-input">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Language */}
      <div className="flex items-center justify-between py-2">
        <label className="text-foreground text-sm">Language</label>
        <Select defaultValue="auto-detect">
          <SelectTrigger className="w-40 bg-input-background border-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto-detect">Auto-detect</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Spoken language */}
      <div className="space-y-3 py-2">
        <div className="flex items-center justify-between">
          <label className="text-foreground text-sm">Spoken language</label>
          <Select defaultValue="auto-detect">
            <SelectTrigger className="w-40 bg-input-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto-detect">Auto-detect</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.
        </p>
      </div>

      {/* Voice */}
      <div className="flex items-center justify-between py-2">
        <label className="text-foreground text-sm">Voice</label>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
            <Play className="h-3 w-3 mr-1"/>
            Play
          </Button>
          <Select defaultValue="juniper">
            <SelectTrigger className="w-32 bg-input-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="juniper">Juniper</SelectItem>
              <SelectItem value="nova">Nova</SelectItem>
              <SelectItem value="ember">Ember</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Show additional models */}
      <div className="flex items-center justify-between py-2">
        <label className="text-foreground text-sm">Show additional models</label>
        <Switch checked={showAdditionalModels} onCheckedChange={setShowAdditionalModels}/>
      </div>
    </div>);
    const renderNotifications = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Notifications</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Notification settings will be configured here.</p>
      </div>
    </div>);
    const renderPersonalization = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Personalization</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Personalization options will be available here.</p>
      </div>
    </div>);
    const renderConnectors = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Connectors</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Manage your platform connectors and integrations.</p>
      </div>
    </div>);
    const renderSchedules = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Schedules</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Configure automated campaign schedules.</p>
      </div>
    </div>);
    const renderDataControls = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Data controls</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Manage your data privacy and control settings.</p>
      </div>
    </div>);
    const renderSecurity = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Security</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Configure security settings and authentication options.</p>
      </div>
    </div>);
    const renderAccount = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Account</h2>
        <Separator className="bg-border"/>
      </div>
      <div className="text-muted-foreground">
        <p>Manage your account settings and subscription details.</p>
      </div>
    </div>);
    const renderTracking = () => (<div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground">Tracking</h2>
        <p className="text-muted-foreground text-sm">Configure conversion tracking for your campaigns</p>
        <Separator className="bg-border"/>
      </div>

      {/* Conversion Events */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground">Conversion Events</h3>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4"/>
            Add Custom Event
          </Button>
        </div>

        <div className="grid gap-4">
          {trackingEvents.map((event) => {
            const Icon = event.icon;
            return (<Card key={event.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-4 w-4 text-muted-foreground"/>
                    </div>
                    <div>
                      <p className="text-foreground text-sm">{event.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {event.value > 0 ? `Value: $${event.value}` : 'No value assigned'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={event.status === 'active' ? 'default' : 'secondary'} className={event.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}>
                      {event.status === 'active' ? (<Check className="h-3 w-3 mr-1"/>) : (<AlertCircle className="h-3 w-3 mr-1"/>)}
                      {event.status}
                    </Badge>
                    <Switch checked={event.enabled} onCheckedChange={(checked) => {
                    setTrackingEvents(trackingEvents.map((e) => e.id === event.id ? { ...e, enabled: checked, status: checked ? 'active' : 'inactive' } : e));
                }}/>
                  </div>
                </div>
              </Card>);
        })}
        </div>
      </div>

      {/* Platform Integration */}
      <div className="space-y-6">
        <h3 className="text-foreground">Platform Integration</h3>
        
        <div className="grid gap-4">
          {/* Facebook Pixel */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Code className="h-4 w-4 text-blue-600 dark:text-blue-400"/>
                </div>
                <div>
                  <p className="text-foreground text-sm">Facebook Pixel</p>
                  <p className="text-muted-foreground text-xs">Track conversions from Facebook & Instagram ads</p>
                </div>
              </div>
              <Switch defaultChecked/>
            </div>
            <div className="space-y-3">
              <Input placeholder="Enter Pixel ID (e.g., 123456789012345)" className="bg-input-background"/>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Eye className="h-3 w-3"/>
                  Test Pixel
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <Copy className="h-3 w-3"/>
                  Copy Code
                </Button>
              </div>
            </div>
          </Card>

          {/* Google Analytics */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Code className="h-4 w-4 text-orange-600 dark:text-orange-400"/>
                </div>
                <div>
                  <p className="text-foreground text-sm">Google Analytics 4</p>
                  <p className="text-muted-foreground text-xs">Track website conversions and user behavior</p>
                </div>
              </div>
              <Switch defaultChecked/>
            </div>
            <div className="space-y-3">
              <Input placeholder="Enter Measurement ID (e.g., G-XXXXXXXXXX)" className="bg-input-background"/>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Eye className="h-3 w-3"/>
                  Test Tracking
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <ExternalLink className="h-3 w-3"/>
                  View in GA4
                </Button>
              </div>
            </div>
          </Card>

          {/* Google Ads */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-600 dark:text-green-400"/>
                </div>
                <div>
                  <p className="text-foreground text-sm">Google Ads Conversion</p>
                  <p className="text-muted-foreground text-xs">Track conversions from Google Ads campaigns</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="space-y-3">
              <Input placeholder="Enter Conversion ID (e.g., AW-123456789)" className="bg-input-background"/>
              <Input placeholder="Enter Conversion Label" className="bg-input-background"/>
            </div>
          </Card>

          {/* Custom Tracking */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Code className="h-4 w-4 text-purple-600 dark:text-purple-400"/>
                </div>
                <div>
                  <p className="text-foreground text-sm">Custom Tracking Script</p>
                  <p className="text-muted-foreground text-xs">Add your own tracking code</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <code className="text-xs text-muted-foreground">
                  {'<!-- Your custom tracking code will be inserted here -->'}
                </code>
              </div>
              <Button size="sm" variant="ghost" className="gap-2">
                <Code className="h-3 w-3"/>
                Edit Script
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Attribution Settings */}
      <div className="space-y-6">
        <h3 className="text-foreground">Attribution Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-foreground text-sm">Attribution Model</label>
              <p className="text-muted-foreground text-xs">How to credit conversions to campaigns</p>
            </div>
            <Select defaultValue="last-click">
              <SelectTrigger className="w-40 bg-input-background border-input">
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
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-foreground text-sm">Conversion Window</label>
              <p className="text-muted-foreground text-xs">Days to attribute conversions after click</p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32 bg-input-background border-input">
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

          <div className="flex items-center justify-between">
            <div>
              <label className="text-foreground text-sm">View-through Window</label>
              <p className="text-muted-foreground text-xs">Days to attribute conversions after impression</p>
            </div>
            <Select defaultValue="1">
              <SelectTrigger className="w-32 bg-input-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tracking Validation */}
      <div className="space-y-4">
        <h3 className="text-foreground">Tracking Validation</h3>
        
        <Card className="p-4 bg-muted/30">
          <div className="flex items-center gap-3 mb-3">
            <Check className="h-5 w-5 text-green-500"/>
            <div>
              <p className="text-foreground text-sm">Tracking Health Check</p>
              <p className="text-muted-foreground text-xs">Last validated 2 hours ago</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3 text-green-500"/>
              <span>Facebook Pixel firing correctly</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3 text-green-500"/>
              <span>Google Analytics connected</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3 w-3 text-yellow-500"/>
              <span>Google Ads conversion setup pending</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="mt-3 gap-2">
            <Eye className="h-3 w-3"/>
            Run Health Check
          </Button>
        </Card>
      </div>
    </div>);
    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return renderGeneralSettings();
            case 'notifications':
                return renderNotifications();
            case 'personalization':
                return renderPersonalization();
            case 'connectors':
                return renderConnectors();
            case 'tracking':
                return renderTracking();
            case 'schedules':
                return renderSchedules();
            case 'data-controls':
                return renderDataControls();
            case 'security':
                return renderSecurity();
            case 'account':
                return renderAccount();
            default:
                return renderGeneralSettings();
        }
    };
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-background border-none">
        <DialogTitle className="sr-only">
          Settings
        </DialogTitle>
        <DialogDescription className="sr-only">
          Configure your application preferences and account settings
        </DialogDescription>
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
            {/* Header with title only */}
            <div className="p-6">
              <h1 className="text-sidebar-foreground">Settings</h1>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-3 pb-6">
              <div className="space-y-1">
                {settingsMenuItems.map((item) => {
            const Icon = item.icon;
            return (<Button key={item.id} variant="ghost" className={`w-full justify-start gap-3 h-10 text-left px-3 rounded-lg transition-colors ${activeSection === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`} onClick={() => setActiveSection(item.id)}>
                      <Icon className="h-4 w-4"/>
                      <span className="text-sm">{item.label}</span>
                    </Button>);
        })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-background">
            <div className="max-w-2xl mx-auto py-8 px-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);
}
