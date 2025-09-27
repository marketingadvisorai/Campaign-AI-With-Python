import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Plug, MessageSquare, Eye, Play, BarChart3, RefreshCw, CheckCircle, Clock, Sparkles } from 'lucide-react';
const workflowSteps = [
    {
        id: 1,
        title: 'Connect Platforms',
        description: 'Link your Google Ads, Facebook Ads, Analytics, and other marketing platforms',
        icon: Plug,
        status: 'completed',
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
        id: 2,
        title: 'Enter Campaign Prompt',
        description: 'Describe your campaign goals using natural language prompts',
        icon: MessageSquare,
        status: 'completed',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
        id: 3,
        title: 'AI Generates Campaign',
        description: 'AI creates comprehensive campaign strategy with targeting, ad copy, and budget allocation',
        icon: Sparkles,
        status: 'active',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
        id: 4,
        title: 'Review & Refine',
        description: 'Preview campaign details and refine with additional prompts',
        icon: Eye,
        status: 'pending',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
    {
        id: 5,
        title: 'Publish Campaigns',
        description: 'Deploy campaigns directly to connected advertising platforms',
        icon: Play,
        status: 'pending',
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50 dark:bg-indigo-950'
    },
    {
        id: 6,
        title: 'Monitor Performance',
        description: 'Track campaign metrics and performance data in real-time',
        icon: BarChart3,
        status: 'pending',
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50 dark:bg-cyan-950'
    },
    {
        id: 7,
        title: 'AI Optimization',
        description: 'Continuous optimization based on performance data and user prompts',
        icon: RefreshCw,
        status: 'pending',
        color: 'text-pink-500',
        bgColor: 'bg-pink-50 dark:bg-pink-950'
    }
];
export function WorkflowDiagram({ className }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'active':
                return <Clock className="h-4 w-4 text-blue-500"/>;
            default:
                return <div className="h-4 w-4 rounded-full bg-muted border-2 border-muted-foreground/20"/>;
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
            case 'active':
                return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };
    return (<div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <h2>Campaign Creation Workflow</h2>
        <p className="text-muted-foreground">
          From prompt to performance - see how AI powers your entire campaign lifecycle
        </p>
      </div>

      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="space-y-4">
              {workflowSteps.slice(0, 2).map((step, index) => (<div key={step.id}>
                  <Card className={`p-4 h-full ${step.bgColor} border-l-4 ${step.status === 'active' ? 'border-l-blue-500' : step.status === 'completed' ? 'border-l-green-500' : 'border-l-muted'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                          <step.icon className={`h-5 w-5 ${step.color}`}/>
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>
                  </Card>
                  {index === 0 && (<div className="flex justify-center mt-4">
                      <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                    </div>)}
                </div>))}
            </div>

            {/* Row 2 */}
            <div className="space-y-4">
              {workflowSteps.slice(2, 4).map((step, index) => (<div key={step.id}>
                  <Card className={`p-4 h-full ${step.bgColor} border-l-4 ${step.status === 'active' ? 'border-l-blue-500' : step.status === 'completed' ? 'border-l-green-500' : 'border-l-muted'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                          <step.icon className={`h-5 w-5 ${step.color}`}/>
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>
                  </Card>
                  {index === 0 && (<div className="flex justify-center mt-4">
                      <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                    </div>)}
                </div>))}
            </div>

            {/* Row 3 */}
            <div className="space-y-4">
              {workflowSteps.slice(4, 6).map((step, index) => (<div key={step.id}>
                  <Card className={`p-4 h-full ${step.bgColor} border-l-4 ${step.status === 'active' ? 'border-l-blue-500' : step.status === 'completed' ? 'border-l-green-500' : 'border-l-muted'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                          <step.icon className={`h-5 w-5 ${step.color}`}/>
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>
                  </Card>
                  {index === 0 && (<div className="flex justify-center mt-4">
                      <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                    </div>)}
                </div>))}
            </div>

            {/* Row 4 */}
            <div>
              {(() => {
            const step = workflowSteps[6];
            const StepIcon = step.icon;
            return (<Card className={`p-4 h-full ${step.bgColor} border-l-4 ${step.status === 'active' ? 'border-l-blue-500' : step.status === 'completed' ? 'border-l-green-500' : 'border-l-muted'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                          <StepIcon className={`h-5 w-5 ${step.color}`}/>
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>
                  </Card>);
        })()}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {workflowSteps.map((step, index) => (<div key={step.id}>
              <Card className={`p-4 ${step.bgColor} border-l-4 ${step.status === 'active' ? 'border-l-blue-500' : step.status === 'completed' ? 'border-l-green-500' : 'border-l-muted'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`h-5 w-5 ${step.color}`}/>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">{step.title}</h3>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    {getStatusBadge(step.status)}
                  </div>
                </div>
              </Card>
              {index < workflowSteps.length - 1 && (<div className="flex justify-center py-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90"/>
                </div>)}
            </div>))}
        </div>
      </div>

      <Card className="p-4 bg-muted/20">
        <div className="text-center space-y-2">
          <h3 className="text-sm">Continuous Optimization Loop</h3>
          <p className="text-xs text-muted-foreground">
            The AI continuously monitors performance and suggests optimizations, creating a feedback loop that improves campaign results over time.
          </p>
          <div className="flex justify-center mt-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4"/>
              View Optimization History
            </Button>
          </div>
        </div>
      </Card>
    </div>);
}
