import React from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Target, TrendingUp, BarChart3, Sparkles } from 'lucide-react';

const DASHBOARD_STATS = [
  {
    icon: Target,
    label: 'Active Campaigns',
    value: '12',
    change: '+3 this week',
    color: 'text-chart-1',
  },
  {
    icon: TrendingUp,
    label: 'Total Impressions',
    value: '2.4M',
    change: '+18% this month',
    color: 'text-chart-2',
  },
  {
    icon: BarChart3,
    label: 'Avg. CTR',
    value: '3.2%',
    change: '+0.4% vs last month',
    color: 'text-chart-3',
  },
  {
    icon: Sparkles,
    label: 'AI Optimizations',
    value: '47',
    change: 'Applied this week',
    color: 'text-chart-4',
  },
];

const RECENT_ACTIVITY = [
  {
    name: 'Coffee Shop Multi-Platform Campaign',
    time: '2 hours ago',
    status: 'Active' as const,
  },
  {
    name: 'Law Firm Lead Generation',
    time: 'yesterday',
    status: 'Draft' as const,
  },
  {
    name: 'E-commerce Holiday Campaign',
    time: '3 days ago',
    status: 'Active' as const,
  },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2>Campaign Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor all your campaigns and their performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <div className="text-2xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="mb-4">Recent Campaign Activity</h3>
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm">{activity.name}</p>
                <p className="text-xs text-muted-foreground">Created {activity.time}</p>
              </div>
              <Badge 
                variant={activity.status === 'Active' ? 'default' : 'secondary'}
                className={activity.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : undefined
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}