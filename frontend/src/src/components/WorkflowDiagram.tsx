import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Play, Pause, Settings, Plus } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition';
  status: 'active' | 'inactive' | 'completed';
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'trigger-1',
    name: 'User Visits Landing Page',
    type: 'trigger',
    status: 'active',
    description: 'When someone visits our campaign landing page'
  },
  {
    id: 'condition-1',
    name: 'Check User Location',
    type: 'condition',
    status: 'active',
    description: 'If user is in target geographic area'
  },
  {
    id: 'action-1',
    name: 'Show Targeted Ad',
    type: 'action',
    status: 'active',
    description: 'Display location-specific advertisement'
  },
  {
    id: 'action-2',
    name: 'Track Engagement',
    type: 'action',
    status: 'active',
    description: 'Record user interaction data'
  },
  {
    id: 'condition-2',
    name: 'Check Conversion',
    type: 'condition',
    status: 'completed',
    description: 'If user completes desired action'
  },
  {
    id: 'action-3',
    name: 'Send to CRM',
    type: 'action',
    status: 'completed',
    description: 'Add lead information to CRM system'
  }
];

const getStepColor = (type: string) => {
  switch (type) {
    case 'trigger':
      return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'condition':
      return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'action':
      return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    default:
      return 'bg-muted border-border';
  }
};

const getStepIcon = (type: string) => {
  switch (type) {
    case 'trigger':
      return '⚡';
    case 'condition':
      return '❓';
    case 'action':
      return '🎯';
    default:
      return '📋';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>;
    case 'completed':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Completed</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function WorkflowDiagram() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-foreground">Campaign Workflow</h2>
          <p className="text-muted-foreground">Visual representation of your campaign automation flow</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Pause className="h-4 w-4 mr-2" />
            Pause Workflow
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
      </div>

      {/* Workflow Diagram */}
      <Card className="p-8 bg-gradient-to-br from-background to-muted/20">
        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className={`p-6 rounded-lg border-2 ${getStepColor(step.type)} transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getStepIcon(step.type)}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.name}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                        </Badge>
                        {getStatusBadge(step.status)}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Arrow to next step */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full border-2 border-primary/20">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Executions</p>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-xs text-green-600">+18% this month</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Play className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-3xl font-bold">94.2%</p>
              <p className="text-xs text-blue-600">+2.1% improvement</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
              <p className="text-3xl font-bold">2.3s</p>
              <p className="text-xs text-purple-600">0.5s faster</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <ArrowRight className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Workflow Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">Workflow executed successfully</p>
              <p className="text-xs text-muted-foreground">User completed conversion action</p>
            </div>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">New lead added to CRM</p>
              <p className="text-xs text-muted-foreground">Contact information synced</p>
            </div>
            <p className="text-xs text-muted-foreground">5 minutes ago</p>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">Condition check: Location verified</p>
              <p className="text-xs text-muted-foreground">User in target area: New York</p>
            </div>
            <p className="text-xs text-muted-foreground">8 minutes ago</p>
          </div>
        </div>
      </Card>
    </div>
  );
}