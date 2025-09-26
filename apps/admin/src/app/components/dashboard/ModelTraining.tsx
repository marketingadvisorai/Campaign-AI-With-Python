"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { 
  Brain,
  Database,
  Cpu,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  Settings,
  Eye,
  Trash2,
  Copy,
  RefreshCw,
  Rocket,
  FlaskConical,
  GitBranch,
  Activity,
  Layers,
  Globe,
  Building2
} from 'lucide-react';

export function ModelTraining() {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedBaseModel, setSelectedBaseModel] = useState('');
  const [trainingStatus, setTrainingStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('datasets');

  // Mock data for training datasets
  const datasets = [
    {
      id: 'dataset-1',
      name: 'E-commerce Campaign Data',
      description: 'High-performing search ads for retail and e-commerce',
      size: '45.2K',
      records: 45234,
      type: 'Search Ads',
      quality: 92,
      lastUpdated: '2 hours ago',
      status: 'ready'
    },
    {
      id: 'dataset-2',
      name: 'B2B Lead Generation',
      description: 'LinkedIn and Google Ads for B2B software companies',
      size: '28.7K',
      records: 28756,
      type: 'B2B Campaigns',
      quality: 88,
      lastUpdated: '1 day ago',
      status: 'ready'
    },
    {
      id: 'dataset-3',
      name: 'Social Media Campaigns',
      description: 'Facebook and Instagram ads across multiple verticals',
      size: '67.1K',
      records: 67142,
      type: 'Social Media',
      quality: 85,
      lastUpdated: '3 days ago',
      status: 'processing'
    },
    {
      id: 'dataset-4',
      name: 'Local Services Data',
      description: 'Location-based campaigns for service businesses',
      size: '15.3K',
      records: 15378,
      type: 'Local Campaigns',
      quality: 90,
      lastUpdated: '1 week ago',
      status: 'ready'
    }
  ];

  // Mock data for trained models
  const trainedModels = [
    {
      id: 'model-1',
      name: 'E-commerce Optimizer v2.1',
      baseModel: 'GPT-4 Turbo',
      specialty: 'E-commerce Search Ads',
      accuracy: 94.5,
      performance: '+23% CTR improvement',
      status: 'deployed',
      trainingDate: '2024-03-10',
      version: 'v2.1',
      deployedClients: 12
    },
    {
      id: 'model-2',
      name: 'B2B Lead Generator',
      baseModel: 'Claude 3.5 Sonnet',
      specialty: 'B2B Campaign Optimization',
      accuracy: 91.2,
      performance: '+18% conversion rate',
      status: 'testing',
      trainingDate: '2024-03-08',
      version: 'v1.3',
      deployedClients: 5
    },
    {
      id: 'model-3',
      name: 'Social Media Expert',
      baseModel: 'Gemini Pro',
      specialty: 'Social Media Campaigns',
      accuracy: 89.8,
      performance: '+15% engagement',
      status: 'training',
      trainingDate: '2024-03-12',
      version: 'v1.0',
      deployedClients: 0
    }
  ];

  // Mock data for training jobs
  const trainingJobs = [
    {
      id: 'job-1',
      name: 'E-commerce Optimizer v2.2',
      dataset: 'E-commerce Campaign Data',
      baseModel: 'GPT-4 Turbo',
      status: 'running',
      progress: 68,
      timeRemaining: '2h 34m',
      startTime: '2024-03-12 14:30',
      currentEpoch: 17,
      totalEpochs: 25,
      loss: 0.234,
      accuracy: 92.1
    },
    {
      id: 'job-2',
      name: 'Local Services Specialist',
      dataset: 'Local Services Data',
      baseModel: 'Claude 3.5 Sonnet',
      status: 'queued',
      progress: 0,
      timeRemaining: 'Pending',
      startTime: 'Queued',
      currentEpoch: 0,
      totalEpochs: 20,
      loss: null,
      accuracy: null
    }
  ];

  const baseModels = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Latest GPT-4 model with improved reasoning',
      contextLength: '128K tokens',
      trainingCost: '$0.08/1K tokens',
      logo: '🤖'
    },
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      description: 'Advanced reasoning and code generation',
      contextLength: '200K tokens',
      trainingCost: '$0.06/1K tokens',
      logo: '🧠'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Multimodal AI with strong performance',
      contextLength: '32K tokens',
      trainingCost: '$0.05/1K tokens',
      logo: '🔍'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      ready: { className: 'bg-green-600 text-white', text: 'Ready' },
      processing: { className: 'bg-yellow-600 text-white', text: 'Processing' },
      training: { className: 'bg-blue-600 text-white', text: 'Training' },
      deployed: { className: 'bg-green-600 text-white', text: 'Deployed' },
      testing: { className: 'bg-orange-600 text-white', text: 'Testing' },
      running: { className: 'bg-blue-600 text-white', text: 'Running' },
      queued: { className: 'bg-gray-600 text-white', text: 'Queued' },
      completed: { className: 'bg-green-600 text-white', text: 'Completed' },
      failed: { className: 'bg-red-600 text-white', text: 'Failed' }
    };
    
    const config = variants[status] || variants.ready;
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  const getQualityColor = (quality) => {
    if (quality >= 90) return 'text-green-500';
    if (quality >= 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-foreground">AI Model Training</h1>
          <p className="text-muted-foreground mt-1">
            Train and fine-tune LLM models for campaign-specific optimization
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-border text-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Models
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0">
            <Rocket className="mr-2 h-4 w-4" />
            Start Training
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl text-card-foreground">7</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">3 deployed</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Training Jobs</p>
                <p className="text-2xl text-card-foreground">2</p>
                <div className="flex items-center mt-1">
                  <Activity className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">1 running</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Training Data</p>
                <p className="text-2xl text-card-foreground">156.3K</p>
                <div className="flex items-center mt-1">
                  <Database className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">records ready</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Database className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl text-card-foreground">91.8%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">accuracy</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="datasets" className="space-y-6">
        <TabsList className="bg-muted border-border">
          <TabsTrigger value="datasets">Training Datasets</TabsTrigger>
          <TabsTrigger value="models">Trained Models</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="configure">Configure Training</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-6">
          {/* Dataset Upload Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-card-foreground mb-2">Upload Training Dataset</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload campaign performance data to train specialized models for specific verticals
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload CSV/JSON
                    </Button>
                    <Button variant="outline" className="border-border text-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      Data Format Guide
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datasets List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {datasets.map((dataset) => (
              <Card key={dataset.id} className="bg-card border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <Database className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-card-foreground">{dataset.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {dataset.description}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(dataset.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Records</p>
                      <p className="text-lg text-card-foreground">{dataset.records.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="text-lg text-card-foreground">{dataset.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="text-sm text-card-foreground">{dataset.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quality Score</p>
                      <p className={`text-lg ${getQualityColor(dataset.quality)}`}>{dataset.quality}%</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last updated: {dataset.lastUpdated}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-border text-foreground">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="border-border text-foreground">
                          <Download className="mr-1 h-3 w-3" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="space-y-4">
            {trainedModels.map((model) => (
              <Card key={model.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg text-card-foreground">{model.name}</h3>
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {model.version}
                          </Badge>
                          {getStatusBadge(model.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Base Model</p>
                            <p className="text-sm text-card-foreground">{model.baseModel}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Specialty</p>
                            <p className="text-sm text-card-foreground">{model.specialty}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-sm text-green-600 dark:text-green-400">{model.accuracy}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Performance</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{model.performance}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Trained: {model.trainingDate}</span>
                          <span>•</span>
                          <span>Deployed to {model.deployedClients} clients</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Rocket className="mr-1 h-3 w-3" />
                        Deploy
                      </Button>
                      <Button size="sm" variant="outline" className="border-border text-foreground">
                        <FlaskConical className="mr-1 h-3 w-3" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline" className="border-border text-foreground">
                        <Copy className="mr-1 h-3 w-3" />
                        Clone
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="space-y-4">
            {trainingJobs.map((job) => (
              <Card key={job.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-lg ${
                        job.status === 'running' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
                      }`}>
                        <Cpu className={`h-6 w-6 ${
                          job.status === 'running' ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg text-card-foreground">{job.name}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Dataset</p>
                            <p className="text-sm text-card-foreground">{job.dataset}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Base Model</p>
                            <p className="text-sm text-card-foreground">{job.baseModel}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Progress</p>
                            <p className="text-sm text-card-foreground">{job.progress}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Time Remaining</p>
                            <p className="text-sm text-card-foreground">{job.timeRemaining}</p>
                          </div>
                        </div>
                        
                        {job.status === 'running' && (
                          <div className="space-y-2">
                            <Progress value={job.progress} className="h-2" />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Epoch {job.currentEpoch}/{job.totalEpochs}</span>
                              <span>Loss: {job.loss} | Accuracy: {job.accuracy}%</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-3">
                          <span>Started: {job.startTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {job.status === 'running' && (
                        <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                          <Square className="mr-1 h-3 w-3" />
                          Stop
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-border text-foreground">
                        <Eye className="mr-1 h-3 w-3" />
                        Logs
                      </Button>
                      <Button size="sm" variant="outline" className="border-border text-foreground">
                        <BarChart3 className="mr-1 h-3 w-3" />
                        Metrics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configure" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Configuration */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Training Configuration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure parameters for your model training job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Model Name</Label>
                  <Input 
                    placeholder="e.g., E-commerce Optimizer v3.0"
                    className="bg-input border-border text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Base Model</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select base model..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {baseModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center space-x-3">
                            <span>{model.logo}</span>
                            <div>
                              <div className="text-sm">{model.name}</div>
                              <div className="text-xs text-muted-foreground">{model.provider}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Training Dataset</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select dataset..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {datasets.filter(d => d.status === 'ready').map((dataset) => (
                        <SelectItem key={dataset.id} value={dataset.id}>
                          <div>
                            <div className="text-sm">{dataset.name}</div>
                            <div className="text-xs text-muted-foreground">{dataset.records.toLocaleString()} records</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Learning Rate</Label>
                  <div className="px-3">
                    <Slider
                      defaultValue={[0.001]}
                      max={0.01}
                      min={0.0001}
                      step={0.0001}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.0001</span>
                      <span>0.001 (recommended)</span>
                      <span>0.01</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Epochs</Label>
                  <Input 
                    type="number"
                    defaultValue="20"
                    className="bg-input border-border text-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Batch Size</Label>
                  <Select defaultValue="16">
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="16">16 (recommended)</SelectItem>
                      <SelectItem value="32">32</SelectItem>
                      <SelectItem value="64">64</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Specialization */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Campaign Specialization</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure model for specific campaign types and objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Campaign Type</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select campaign type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="search">Search Campaigns</SelectItem>
                      <SelectItem value="display">Display Campaigns</SelectItem>
                      <SelectItem value="social">Social Media Campaigns</SelectItem>
                      <SelectItem value="shopping">Shopping Campaigns</SelectItem>
                      <SelectItem value="video">Video Campaigns</SelectItem>
                      <SelectItem value="local">Local Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Industry Vertical</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select industry..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                      <SelectItem value="b2b">B2B Software & Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                      <SelectItem value="finance">Finance & Insurance</SelectItem>
                      <SelectItem value="education">Education & Training</SelectItem>
                      <SelectItem value="travel">Travel & Hospitality</SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Primary Objective</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select objective..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="conversions">Maximize Conversions</SelectItem>
                      <SelectItem value="ctr">Improve Click-Through Rate</SelectItem>
                      <SelectItem value="roas">Optimize ROAS</SelectItem>
                      <SelectItem value="reach">Increase Reach</SelectItem>
                      <SelectItem value="engagement">Boost Engagement</SelectItem>
                      <SelectItem value="leads">Generate Leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Target Platforms</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="google-ads" />
                      <Label htmlFor="google-ads" className="text-card-foreground">Google Ads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="meta-ads" />
                      <Label htmlFor="meta-ads" className="text-card-foreground">Meta Ads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="linkedin-ads" />
                      <Label htmlFor="linkedin-ads" className="text-card-foreground">LinkedIn Ads</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-card-foreground">Advanced Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-deploy" />
                      <Label htmlFor="auto-deploy" className="text-card-foreground">Auto-deploy after validation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="early-stopping" />
                      <Label htmlFor="early-stopping" className="text-card-foreground">Enable early stopping</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="data-augmentation" />
                      <Label htmlFor="data-augmentation" className="text-card-foreground">Data augmentation</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Summary & Start Button */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-600 rounded-lg">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg text-card-foreground mb-1">Ready to Start Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Estimated training time: 3-4 hours • Estimated cost: $24.50
                    </p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Start Training Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}