import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart3, Search, Filter, Download, TrendingUp, Users, Eye, MousePointer } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-medium text-foreground">Analytics</h1>
              <p className="text-muted-foreground">Track your campaign performance and insights</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search campaigns..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Impressions</p>
                  <p className="text-3xl font-bold">2.4M</p>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Click-through Rate</p>
                  <p className="text-3xl font-bold">3.2%</p>
                  <p className="text-xs text-green-600">+0.4% from last month</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <MousePointer className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                  <p className="text-3xl font-bold">1,247</p>
                  <p className="text-xs text-green-600">+22% from last month</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cost per Click</p>
                  <p className="text-3xl font-bold">$0.85</p>
                  <p className="text-xs text-red-600">-$0.12 from last month</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Campaign Performance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Campaign Performance</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Coffee Shop Multi-Platform Campaign</h4>
                    <p className="text-sm text-muted-foreground">Google Ads • Facebook Ads</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2,450 spent</p>
                  <p className="text-sm text-green-600">ROI: 340%</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Law Firm Lead Generation</h4>
                    <p className="text-sm text-muted-foreground">Google Ads • LinkedIn</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,890 spent</p>
                  <p className="text-sm text-green-600">ROI: 285%</p>
                </div>
                <Badge variant="secondary">Draft</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">E-commerce Holiday Campaign</h4>
                    <p className="text-sm text-muted-foreground">Facebook Ads • Instagram</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$3,200 spent</p>
                  <p className="text-sm text-green-600">ROI: 412%</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
              </div>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">AI-Powered Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Optimization Opportunity</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your Coffee Shop campaign could benefit from targeting "morning coffee" keywords between 7-9 AM for 15% better performance.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Budget Recommendation</h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Consider increasing budget on weekends for the E-commerce campaign - showing 25% higher conversion rates.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Audience Insight</h4>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Your best-performing audience segment is ages 25-34 in urban areas - consider creating lookalike audiences.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}