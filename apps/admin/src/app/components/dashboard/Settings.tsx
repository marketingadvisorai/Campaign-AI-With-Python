"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Database,
  Bell,
  Palette,
  Globe,
  Key,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

export function Settings() {
  const [showApiKeys, setShowApiKeys] = useState({});
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'Campaign AI',
    defaultTimeZone: 'UTC',
    defaultCurrency: 'USD',
    autoOptimization: true,
    smartBidding: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 24,
    ipWhitelist: '',
    requirePasswordChange: false,
    
    // Notification Settings
    emailAlerts: true,
    slackNotifications: false,
    webhookUrl: '',
    dailyReports: true,
    weeklyReports: true,
    
    // Data Settings
    dataRetention: 365,
    autoBackup: true,
    exportFormat: 'csv',
    anonymizeData: false,
    
    // API Keys (masked for display)
    apiKeys: {
      openai: '••••••••••••••••••••••••••••••••sk-abc123',
      anthropic: '••••••••••••••••••••••••••••••••ant-123',
      google: '••••••••••••••••••••••••••••••••AIza123'
    }
  });

  const toggleApiKeyVisibility = (provider) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400">Configure system preferences and security options</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-gray-700">
            <SettingsIcon className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-700">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-gray-700">
            <Database className="mr-2 h-4 w-4" />
            Data & Privacy
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-gray-700">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Configuration</CardTitle>
              <CardDescription className="text-gray-400">
                Basic platform settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Platform Name</Label>
                  <Input
                    value={settings.platformName}
                    onChange={(e) => updateSetting('platformName', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Default Time Zone</Label>
                  <select 
                    value={settings.defaultTimeZone}
                    onChange={(e) => updateSetting('defaultTimeZone', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="CET">Central European Time</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Default Currency</Label>
                  <select 
                    value={settings.defaultCurrency}
                    onChange={(e) => updateSetting('defaultCurrency', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI Optimization Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure automatic optimization behaviors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Auto Optimization</Label>
                  <p className="text-sm text-gray-400">Automatically apply AI recommendations</p>
                </div>
                <Switch
                  checked={settings.autoOptimization}
                  onCheckedChange={(checked) => updateSetting('autoOptimization', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Smart Bidding</Label>
                  <p className="text-sm text-gray-400">Enable intelligent bid adjustments</p>
                </div>
                <Switch
                  checked={settings.smartBidding}
                  onCheckedChange={(checked) => updateSetting('smartBidding', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Authentication & Access</CardTitle>
              <CardDescription className="text-gray-400">
                Security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-400">Require 2FA for all users</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Require Password Change</Label>
                  <p className="text-sm text-gray-400">Force password updates every 90 days</p>
                </div>
                <Switch
                  checked={settings.requirePasswordChange}
                  onCheckedChange={(checked) => updateSetting('requirePasswordChange', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Session Timeout (hours)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">IP Allowlist</CardTitle>
              <CardDescription className="text-gray-400">
                Restrict access to specific IP addresses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Allowed IP Addresses</Label>
                <Textarea
                  placeholder="Enter IP addresses or ranges, one per line..."
                  value={settings.ipWhitelist}
                  onChange={(e) => updateSetting('ipWhitelist', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                />
                <p className="text-xs text-gray-400">
                  Example: 192.168.1.0/24 or 203.0.113.42
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Alert Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Email Alerts</Label>
                  <p className="text-sm text-gray-400">Receive alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked) => updateSetting('emailAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Slack Notifications</Label>
                  <p className="text-sm text-gray-400">Send alerts to Slack</p>
                </div>
                <Switch
                  checked={settings.slackNotifications}
                  onCheckedChange={(checked) => updateSetting('slackNotifications', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-300">Webhook URL</Label>
                <Input
                  placeholder="https://hooks.slack.com/services/..."
                  value={settings.webhookUrl}
                  onChange={(e) => updateSetting('webhookUrl', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Report Schedule</CardTitle>
              <CardDescription className="text-gray-400">
                Automated report delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Daily Reports</Label>
                  <p className="text-sm text-gray-400">Daily performance summaries</p>
                </div>
                <Switch
                  checked={settings.dailyReports}
                  onCheckedChange={(checked) => updateSetting('dailyReports', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Weekly Reports</Label>
                  <p className="text-sm text-gray-400">Weekly optimization reports</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Retention</CardTitle>
              <CardDescription className="text-gray-400">
                Configure how long data is stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Retention Period (days)</Label>
                  <select 
                    value={settings.dataRetention}
                    onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value={90}>90 days</option>
                    <option value={180}>180 days</option>
                    <option value={365}>1 year</option>
                    <option value={730}>2 years</option>
                    <option value={-1}>Indefinite</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Export Format</Label>
                  <select 
                    value={settings.exportFormat}
                    onChange={(e) => updateSetting('exportFormat', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="xlsx">Excel</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Auto Backup</Label>
                  <p className="text-sm text-gray-400">Automatically backup data weekly</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Anonymize Data</Label>
                  <p className="text-sm text-gray-400">Remove personally identifiable information</p>
                </div>
                <Switch
                  checked={settings.anonymizeData}
                  onCheckedChange={(checked) => updateSetting('anonymizeData', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Export & Import</CardTitle>
              <CardDescription className="text-gray-400">
                Backup and restore your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Configuration</CardTitle>
              <CardDescription className="text-gray-400">
                Manage external service API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.apiKeys).map(([provider, key]) => (
                <div key={provider} className="space-y-2">
                  <Label className="text-gray-300 capitalize">{provider} API Key</Label>
                  <div className="relative">
                    <Input
                      type={showApiKeys[provider] ? 'text' : 'password'}
                      value={key}
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      readOnly
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-0"
                      onClick={() => toggleApiKeyVisibility(provider)}
                    >
                      {showApiKeys[provider] ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      Update Key
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      Test Connection
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Feature Flags</CardTitle>
              <CardDescription className="text-gray-400">
                Enable or disable experimental features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Beta AI Models</Label>
                  <p className="text-sm text-gray-400">Access to experimental AI capabilities</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Advanced Analytics</Label>
                  <p className="text-sm text-gray-400">Enhanced reporting and insights</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Cross-Platform Sync</Label>
                  <p className="text-sm text-gray-400">Real-time data synchronization</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}