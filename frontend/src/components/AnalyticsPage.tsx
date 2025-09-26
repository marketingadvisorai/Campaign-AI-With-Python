import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Target, 
  MousePointer, 
  Users, 
  DollarSign,
  Calendar,
  Send,
  Sparkles,
  Eye,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  Bot,
  Plus,
  FileText,
  Upload,
  Link,
  CheckCircle,
  AlertTriangle,
  Activity,
  PieChart,
  LineChart,
  Globe,
  Facebook,
  Settings,
  ExternalLink,
  File,
  FileSpreadsheet,
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  MoreVertical,
  BookOpen,
  ArrowUp
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AnalyticsMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$124,580',
    change: '+15.2%',
    changeType: 'positive',
    icon: <DollarSign className="h-5 w-5" />,
    color: 'text-chart-1'
  },
  {
    title: 'Impressions',
    value: '2.4M',
    change: '+8.1%',
    changeType: 'positive',
    icon: <Eye className="h-5 w-5" />,
    color: 'text-chart-2'
  },
  {
    title: 'Click-Through Rate',
    value: '3.2%',
    change: '+0.4%',
    changeType: 'positive',
    icon: <MousePointer className="h-5 w-5" />,
    color: 'text-chart-3'
  },
  {
    title: 'Conversion Rate',
    value: '12.8%',
    change: '-2.1%',
    changeType: 'negative',
    icon: <Target className="h-5 w-5" />,
    color: 'text-chart-4'
  },
  {
    title: 'Cost Per Click',
    value: '$0.89',
    change: '-5.3%',
    changeType: 'positive',
    icon: <TrendingDown className="h-5 w-5" />,
    color: 'text-chart-5'
  },
  {
    title: 'Active Users',
    value: '15.6K',
    change: '+12.7%',
    changeType: 'positive',
    icon: <Users className="h-5 w-5" />,
    color: 'text-chart-1'
  }
];

const sampleQueries = [
  "Show me conversion rates for the past 30 days",
  "What's the ROI breakdown by campaign platform?",
  "Compare click-through rates between Google Ads and Facebook",
  "Which campaigns have the highest cost per acquisition?",
  "Show me revenue trends for the last quarter",
  "What are the top performing keywords this month?"
];

interface ReportingConnection {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  dataPoints: number;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
  status: 'processing' | 'completed' | 'error';
}

const reportingConnections: ReportingConnection[] = [
  {
    id: 'google-data-studio',
    name: 'Google Data Studio',
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'connected',
    lastSync: '2 minutes ago',
    dataPoints: 1247
  },
  {
    id: 'facebook-reporting',
    name: 'Facebook Reporting API',
    icon: <Facebook className="h-5 w-5" />,
    status: 'connected',
    lastSync: '5 minutes ago',
    dataPoints: 892
  },
  {
    id: 'google-analytics-reporting',
    name: 'Google Analytics Reporting',
    icon: <Globe className="h-5 w-5" />,
    status: 'disconnected',
    lastSync: 'Never',
    dataPoints: 0
  }
];

export function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState<AnalyticsMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filteredMetrics, setFilteredMetrics] = useState(mockMetrics);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AnalyticsMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: AnalyticsMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateMockResponse(inputValue),
        timestamp: new Date(),
        data: generateMockData(inputValue)
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('conversion') || lowerQuery.includes('cvr')) {
      return "I've analyzed your conversion rates across all campaigns. Your overall conversion rate is 12.8%, which is performing well compared to industry benchmarks. Google Ads campaigns are showing a 14.2% conversion rate, while Facebook Ads are at 11.4%. I recommend optimizing your Facebook ad creative to improve performance.";
    }
    
    if (lowerQuery.includes('roi') || lowerQuery.includes('return')) {
      return "Here's your ROI breakdown by platform: Google Ads is delivering a 3.8x ROI, Facebook Ads shows 3.2x ROI, and your overall portfolio ROI is 3.5x. Your coffee shop campaign is the top performer with 4.2x ROI, driven by strong local targeting.";
    }
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('sales')) {
      return "Revenue analysis shows strong growth trends. Total revenue this month is $124,580, up 15.2% from last month. Your peak revenue days are Thursdays and Fridays, with mobile traffic driving 68% of conversions.";
    }
    
    if (lowerQuery.includes('keywords') || lowerQuery.includes('top performing')) {
      return "Top performing keywords this month: 'coffee near me' ($2,340 revenue), 'artisan coffee' ($1,890 revenue), 'fresh roasted beans' ($1,560 revenue). These keywords have an average CPC of $0.72 and 16.2% conversion rate.";
    }

    return `I've analyzed the data for "${query}". Based on current performance metrics, I can see trends showing positive growth in key areas. The data indicates strong performance across your campaigns with opportunities for optimization in targeting and creative elements.`;
  };

  const generateMockData = (query: string) => {
    return {
      chartData: [
        { name: 'Week 1', value: 2400 },
        { name: 'Week 2', value: 2800 },
        { name: 'Week 3', value: 3200 },
        { name: 'Week 4', value: 3600 }
      ],
      insights: [
        'Performance trending upward',
        'Best converting time: 2-4 PM',
        'Mobile traffic: 68% of conversions'
      ]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const useSampleQuery = (query: string) => {
    setInputValue(query);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type.includes('csv') ? 'CSV' : file.type.includes('excel') ? 'Excel' : 'Document',
        uploadedAt: new Date(),
        status: 'processing'
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);

      // Simulate processing
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'completed' } : f)
        );
      }, 3000);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const connectChannel = (channelType: string) => {
    console.log(`Connecting ${channelType}...`);
    // Mock connection logic
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            <div>
              <h1 className="text-xl sm:text-2xl">Analytics & Reporting</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Campaign insights, reporting, and AI-powered analytics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-full sm:max-w-md">
            <TabsTrigger value="dashboard" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Campaign Dashboard</span>
              <span className="xs:hidden">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="reporting" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Advanced Reporting</span>
              <span className="xs:hidden">Reporting</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* Campaign Dashboard Tab */}
          <TabsContent value="dashboard" className="m-0 h-full">
            <div className="h-full flex flex-col lg:flex-row overflow-hidden">
              {/* Metrics Overview */}
              <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Key Metrics</h3>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                  {filteredMetrics.map((metric, index) => (
                    <Card key={index} className="p-3 sm:p-4 hover:shadow-sm transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 sm:p-2 rounded-lg bg-muted ${metric.color}`}>
                          {metric.icon}
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${
                          metric.changeType === 'positive' ? 'text-green-600' : 
                          metric.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                        }`}>
                          {metric.changeType === 'positive' ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : metric.changeType === 'negative' ? (
                            <ArrowDownRight className="h-3 w-3" />
                          ) : null}
                          {metric.change}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{metric.title}</p>
                        <p className="text-lg sm:text-xl">{metric.value}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Main Dashboard Area */}
              <div className="flex-1 flex flex-col">
                {messages.length === 0 ? (
                  /* Welcome Screen */
                  <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 sm:px-6">
                    <div className="text-center space-y-6 mb-8">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl">Campaign Analytics AI</h2>
                          <p className="text-muted-foreground text-sm sm:text-base">Ask me about any metric or performance data</p>
                        </div>
                      </div>

                      <div className="max-w-2xl mx-auto">
                        <p className="text-sm sm:text-base text-center">Search and analyze your campaign performance data using natural language. Ask about conversions, ROI, trends, comparisons, and get instant insights.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Messages */
                  <ScrollArea className="flex-1 p-4 sm:p-6">
                    <div className="space-y-6 max-w-4xl mx-auto">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {message.type === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          
                          <div className={`max-w-[85%] sm:max-w-[70%] ${message.type === 'user' ? 'bg-muted rounded-2xl px-3 sm:px-4 py-2 sm:py-3' : ''}`}>
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                            
                            {message.data && (
                              <div className="mt-4 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border">
                                <h4 className="mb-3 flex items-center gap-2 text-sm sm:text-base">
                                  <Zap className="h-4 w-4" />
                                  Key Insights
                                </h4>
                                <ul className="space-y-1 text-xs sm:text-sm">
                                  {message.data.insights.map((insight: string, index: number) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-chart-1 flex-shrink-0" />
                                      <span>{insight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="text-xs text-muted-foreground mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>

                          {message.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              <span className="text-xs sm:text-sm">You</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex gap-4 justify-start">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                            <span className="text-sm text-muted-foreground">Analyzing data...</span>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                )}

                {/* Search Input */}
                <div className="p-4 sm:p-6 border-t border-border">
                  <div className="max-w-4xl mx-auto">
                    {/* Clean Search Bar */}
                    <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3">
                      {/* Left Icons */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 rounded-md p-0 hover:bg-muted/50"
                      >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </Button>

                      {/* Input Field */}
                      <div className="flex-1">
                        <Textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about any metric..."
                          className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
                          disabled={isTyping}
                        />
                      </div>

                      {/* Send Button */}
                      <Button 
                        onClick={handleSearch} 
                        disabled={!inputValue.trim() || isTyping}
                        size="sm"
                        className="h-8 w-8 rounded-lg p-0 bg-primary hover:bg-primary/90"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-center mt-2">
                      <span className="text-xs text-muted-foreground">Press Enter to search, Shift+Enter for new line</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Reporting Tab */}
          <TabsContent value="reporting" className="m-0 h-full">
            <div className="h-full flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                  {/* Connected Data Sources */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl mb-2">Connected Data Sources</h3>
                        <p className="text-muted-foreground text-sm">Manage your reporting API connections and data sources</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            <Plus className="h-4 w-4" />
                            Connect Channel
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                          <DropdownMenuItem onClick={() => connectChannel('google-ads-reports')}>
                            <Search className="h-4 w-4 mr-3" />
                            <div>
                              <p className="text-sm">Google Ads Reporting</p>
                              <p className="text-xs text-muted-foreground">Campaign performance data</p>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => connectChannel('instagram-insights')}>
                            <Activity className="h-4 w-4 mr-3" />
                            <div>
                              <p className="text-sm">Instagram Insights</p>
                              <p className="text-xs text-muted-foreground">Social media analytics</p>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => connectChannel('google-analytics-reporting')}>
                            <Globe className="h-4 w-4 mr-3" />
                            <div>
                              <p className="text-sm">Google Analytics 4</p>
                              <p className="text-xs text-muted-foreground">Website traffic data</p>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => connectChannel('custom-api')}>
                            <Link className="h-4 w-4 mr-3" />
                            <div>
                              <p className="text-sm">Custom API</p>
                              <p className="text-xs text-muted-foreground">Connect your own data source</p>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {reportingConnections.map((connection) => (
                        <Card key={connection.id} className="p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                connection.status === 'connected' ? 'bg-green-100 dark:bg-green-900' : 
                                connection.status === 'error' ? 'bg-red-100 dark:bg-red-900' : 
                                'bg-gray-100 dark:bg-gray-800'
                              }`}>
                                {connection.icon}
                              </div>
                              <div>
                                <p className="text-sm">{connection.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {connection.dataPoints.toLocaleString()} data points
                                </p>
                              </div>
                            </div>
                            <Badge variant={
                              connection.status === 'connected' ? 'default' :
                              connection.status === 'error' ? 'destructive' : 'secondary'
                            } className={
                              connection.status === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
                            }>
                              {connection.status === 'connected' ? 'Connected' :
                               connection.status === 'error' ? 'Error' : 'Disconnected'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Last sync: {connection.lastSync}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>

                  {/* File Upload Section */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl mb-2">Upload Reports & Data</h3>
                        <p className="text-muted-foreground text-sm">Upload CSV files, spreadsheets, or reports for AI analysis</p>
                      </div>
                      <Button 
                        onClick={() => fileInputRef.current?.click()} 
                        variant="outline"
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Files
                      </Button>
                    </div>

                    {/* Drag & Drop Zone */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                          : 'border-border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/50'
                      }`}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <h4 className="text-lg mb-2">Drop files here or click to upload</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Support for CSV, Excel, and PDF reports up to 10MB
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="text-xs">CSV</Badge>
                        <Badge variant="outline" className="text-xs">Excel</Badge>
                        <Badge variant="outline" className="text-xs">PDF Reports</Badge>
                        <Badge variant="outline" className="text-xs">Google Sheets</Badge>
                      </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm mb-4">Uploaded Files ({uploadedFiles.length})</h4>
                        <div className="space-y-3">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <div className="p-2 bg-background rounded-md">
                                {file.type === 'CSV' ? (
                                  <FileSpreadsheet className="h-4 w-4 text-green-600" />
                                ) : file.type === 'Excel' ? (
                                  <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <File className="h-4 w-4 text-gray-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.size} • {file.uploadedAt.toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={file.status === 'completed' ? 'default' : file.status === 'error' ? 'destructive' : 'secondary'}
                                  className={file.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                                >
                                  {file.status === 'completed' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : file.status === 'processing' ? (
                                    <Clock className="h-3 w-3 mr-1" />
                                  ) : (
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                  )}
                                  {file.status === 'completed' ? 'Processed' : 
                                   file.status === 'processing' ? 'Processing' : 'Error'}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => removeFile(file.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* AI Prompt Section */}
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl">AI Analysis & Insights</h3>
                        <p className="text-muted-foreground text-sm">Ask questions about your data and get AI-powered insights</p>
                      </div>
                    </div>

                    {/* Clean Search Bar */}
                    <div className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3">
                      {/* Left Icons */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 rounded-md p-0 hover:bg-muted/50"
                      >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </Button>

                      {/* Input Field */}
                      <div className="flex-1">
                        <Textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Analyze my uploaded data..."
                          className="min-h-[50px] max-h-[200px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
                          disabled={isTyping}
                        />
                      </div>

                      {/* Send Button */}
                      <Button 
                        onClick={handleSearch} 
                        disabled={!inputValue.trim() || isTyping}
                        size="sm"
                        className="h-8 w-8 rounded-lg p-0 bg-primary hover:bg-primary/90"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => useSampleQuery("Analyze trends in my uploaded CSV data")}
                      >
                        Analyze Uploaded Data
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => useSampleQuery("Compare Facebook vs Google performance")}
                      >
                        Platform Comparison
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => useSampleQuery("What are my best performing campaigns?")}
                      >
                        Top Performers
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* AI Response Area */}
              {messages.length > 0 && (
                <div className="border-t border-border bg-muted/20">
                  <ScrollArea className="h-96 p-4 sm:p-6">
                    <div className="space-y-6 max-w-4xl mx-auto">
                      {messages.slice(-3).map((message) => (
                        <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {message.type === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          
                          <div className={`max-w-[85%] sm:max-w-[70%] ${message.type === 'user' ? 'bg-background rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm' : ''}`}>
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                            
                            {message.data && (
                              <div className="mt-4 p-3 sm:p-4 rounded-lg bg-background border border-border shadow-sm">
                                <h4 className="mb-3 flex items-center gap-2 text-sm sm:text-base">
                                  <Zap className="h-4 w-4 text-purple-600" />
                                  AI Insights
                                </h4>
                                <ul className="space-y-2 text-xs sm:text-sm">
                                  {message.data.insights.map((insight: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2" />
                                      <span>{insight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="text-xs text-muted-foreground mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>

                          {message.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0">
                              <span className="text-xs sm:text-sm">You</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex gap-4 justify-start">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                            <span className="text-sm text-muted-foreground">Analyzing reports...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}