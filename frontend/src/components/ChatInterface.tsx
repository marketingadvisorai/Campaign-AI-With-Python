import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  Send, 
  Sparkles,
  Plus,
  Camera,
  Image,
  MessageCircle,
  Calendar,
  Mic,
  ChevronDown,
  ChevronUp,
  Home,
  Stethoscope,
  Eye,
  Building,
  Thermometer,
  Car,
  Utensils,
  Briefcase,
  HeartHandshake,
  GraduationCap,
  Dumbbell,
  Scissors,
  ShoppingBag,
  Wrench,
  Palette,
  Shield,
  Truck,
  Laptop,
  Trees,
  Workflow,
  Link,
  Mail,
  Youtube,
  Facebook,
  Instagram,
  Search,
  FileSpreadsheet,
  ImageIcon,
  Bot,
  FileText,
  Users,
  BarChart2,
  Paperclip,
  Factory,
  ArrowUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  campaignData?: any;
}

interface ChatInterfaceProps {
  onCampaignGenerated: (campaign: any) => void;
  onShowOnboarding?: () => void;
  isAuthenticated?: boolean;
  onRequireAuth?: () => void;
}

const mockCampaignResponse = {
  id: 'camp-001',
  name: 'Coffee Shop Multi-Platform Campaign',
  platforms: ['Google Ads', 'Facebook Ads'],
  budget: '$2,500/month',
  duration: '30 days',
  objectives: ['Drive foot traffic', 'Increase brand awareness', 'Boost online orders'],
  googleAds: {
    campaignType: 'Search + Display',
    keywords: ['coffee near me', 'artisan coffee', 'coffee shop downtown', 'fresh roasted coffee'],
    adCopy: {
      headline1: 'Fresh Artisan Coffee Daily',
      headline2: 'Visit Our Downtown Location',
      description: 'Premium coffee beans roasted daily. Experience the perfect cup. Visit us today!'
    },
    budget: '$1,500/month',
    targetCPC: '$0.85'
  },
  facebookAds: {
    campaignType: 'Awareness + Conversion',
    audiences: ['Coffee enthusiasts', 'Local area 3mi radius', 'Website visitors (remarketing)'],
    adCreative: {
      primaryText: 'Start your morning right with our freshly roasted artisan coffee.',
      headline: 'Premium Coffee Experience',
      description: 'Locally roasted, globally inspired. Visit us today!'
    },
    budget: '$1,000/month',
    targetCPM: '$12.50'
  }
};

const businessNiches = [
  { id: 'roofing', name: 'Roofing', icon: Home, prompt: 'Create a lead generation campaign for a roofing company' },
  { id: 'dental', name: 'Dental', icon: Stethoscope, prompt: 'Create a patient acquisition campaign for a dental practice' },
  { id: 'eyecare', name: 'Eye Care', icon: Eye, prompt: 'Create a campaign for an optometry clinic' },
  { id: 'realestate', name: 'Real Estate', icon: Building, prompt: 'Create a property listing campaign for a real estate agent' },
  { id: 'hvac', name: 'HVAC', icon: Thermometer, prompt: 'Create a seasonal campaign for an HVAC company' },
  { id: 'automotive', name: 'Automotive', icon: Car, prompt: 'Create a service promotion campaign for an auto repair shop' },
  { id: 'restaurant', name: 'Restaurant', icon: Utensils, prompt: 'Create a local dining campaign for a restaurant' },
  { id: 'legal', name: 'Legal', icon: Briefcase, prompt: 'Create a lead generation campaign for a law firm' },
  { id: 'healthcare', name: 'Healthcare', icon: HeartHandshake, prompt: 'Create a patient engagement campaign for a medical practice' },
  { id: 'education', name: 'Education', icon: GraduationCap, prompt: 'Create a student enrollment campaign for an educational institution' },
  { id: 'fitness', name: 'Fitness', icon: Dumbbell, prompt: 'Create a membership drive campaign for a gym' },
  { id: 'beauty', name: 'Beauty', icon: Scissors, prompt: 'Create a client acquisition campaign for a beauty salon' },
  { id: 'retail', name: 'Retail', icon: ShoppingBag, prompt: 'Create a seasonal sales campaign for a retail store' },
  { id: 'plumbing', name: 'Plumbing', icon: Wrench, prompt: 'Create an emergency services campaign for a plumbing company' },
  { id: 'creative', name: 'Creative', icon: Palette, prompt: 'Create a portfolio showcase campaign for a creative agency' },
  { id: 'insurance', name: 'Insurance', icon: Shield, prompt: 'Create a policy awareness campaign for an insurance agency' },
  { id: 'logistics', name: 'Logistics', icon: Truck, prompt: 'Create a B2B services campaign for a logistics company' },
  { id: 'technology', name: 'Technology', icon: Laptop, prompt: 'Create a product launch campaign for a tech company' },
  { id: 'landscaping', name: 'Landscaping', icon: Trees, prompt: 'Create a seasonal services campaign for a landscaping business' }
];

const channels = [
  { 
    id: 'google-ads', 
    name: 'Google Ads', 
    icon: Search, 
    connected: false 
  },
  { 
    id: 'facebook-ads', 
    name: 'Facebook Ads', 
    icon: Facebook, 
    connected: false 
  },
  { 
    id: 'youtube-ads', 
    name: 'YouTube Ads', 
    icon: Youtube, 
    connected: false 
  },
  { 
    id: 'facebook-reels', 
    name: 'Facebook Reels', 
    icon: Facebook, 
    connected: false 
  },
  { 
    id: 'instagram-reels', 
    name: 'Instagram Reels', 
    icon: Instagram, 
    connected: false 
  },
  { 
    id: 'gmail', 
    name: 'Gmail', 
    icon: Mail, 
    connected: true 
  }
];

export function ChatInterface({ onCampaignGenerated, onShowOnboarding, isAuthenticated, onRequireAuth }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Check authentication before sending
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth();
      return;
    }

    const userMessage: Message = {
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
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Great! I'll create a comprehensive campaign strategy for "${inputValue}". Let me analyze your requirements and generate a detailed campaign plan with targeting, ad copy, budget allocation, and creative recommendations.`,
        timestamp: new Date(),
        campaignData: mockCampaignResponse
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      onCampaignGenerated(mockCampaignResponse);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check authentication when user starts typing
    if (!isAuthenticated && e.target.value.length > 0 && inputValue.length === 0 && onRequireAuth) {
      onRequireAuth();
      return;
    }
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    // Check authentication when user focuses on input
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth();
      return;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }; 

  const handleNicheSelect = (prompt: string) => {
    setInputValue(prompt);
    // Find the industry name from the business niches
    const selectedNiche = businessNiches.find(niche => niche.prompt === prompt);
    if (selectedNiche) {
      setSelectedIndustry(selectedNiche.name);
    }
  };

  // Handle channel selection with onboarding trigger for unconnected channels
  const handleChannelSelect = (channelName: string) => {
    const channel = channels.find(ch => ch.name === channelName);
    
    if (channel && !channel.connected && onShowOnboarding) {
      // Show onboarding modal for unconnected channels
      onShowOnboarding();
    } else {
      // Allow selection for connected channels
      setSelectedChannel(channelName);
    }
  }; 

  // Get selected industry icon
  const getSelectedIndustryIcon = () => {
    if (!selectedIndustry) return Factory;
    const selectedNiche = businessNiches.find(niche => niche.name === selectedIndustry);
    return selectedNiche ? selectedNiche.icon : Factory;
  };

  // Get selected channel icon
  const getSelectedChannelIcon = () => {
    if (!selectedChannel) return Link;
    const selectedChannelData = channels.find(channel => channel.name === selectedChannel);
    return selectedChannelData ? selectedChannelData.icon : Link;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {messages.length === 0 ? (
        /* Welcome Screen - Mobile ChatGPT Style Layout */
        isMobile ? (
          <div className="h-full flex flex-col">
            {/* Centered Message */}
            <div className="flex-1 flex items-center justify-center px-4">
              <h1 className="text-lg text-center text-foreground">Ready when you are.</h1>
            </div>

            {/* Collapsible Industries Section */}
            <div className="px-4 pb-4">
              <Collapsible open={industriesExpanded} onOpenChange={setIndustriesExpanded}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto text-left bg-muted/30 hover:bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm text-muted-foreground">Select Industry</span>
                    {industriesExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {(industriesExpanded ? businessNiches : businessNiches.slice(0, 6)).map((niche) => {
                      const IconComponent = niche.icon;
                      return (
                        <Button 
                          key={niche.id}
                          variant="ghost" 
                          className="h-16 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg flex flex-col gap-1 border border-border/30 hover:border-border"
                          onClick={() => {
                            handleNicheSelect(niche.prompt);
                            setIndustriesExpanded(false);
                          }}
                        >
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          <span className="text-xs leading-tight text-center">{niche.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Bottom Input Section */}
            <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything"
                  className="w-full h-12 pl-4 pr-12 rounded-full border border-border/50 bg-muted/30 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isTyping}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0"
                    disabled={isTyping}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className={`h-8 w-8 rounded-full p-0 ${inputValue.trim() && !isTyping ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Quick Access Buttons */}
              <div className="flex items-center gap-2 mt-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50"
                    >
                      <Plus className="h-3 w-3 mr-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                    align="start"
                  >
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <Workflow className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Connectors</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Add photos & files</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Add a sheet</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Add banners</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Make banners</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Deep search</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Competitor research</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0 flex-1"
                    >
                      {(() => {
                        const SelectedChannelIcon = getSelectedChannelIcon();
                        return <SelectedChannelIcon className="h-3 w-3 mr-2 flex-shrink-0" />;
                      })()}
                      <span className="truncate">{selectedChannel || 'Channels'}</span>
                      <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-80 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                    align="start"
                  >
                    {channels.map((channel) => {
                      const IconComponent = channel.icon;
                      return (
                        <DropdownMenuItem 
                          key={channel.id}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                          onClick={() => handleChannelSelect(channel.name)}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{channel.name}</span>
                          </div>
                          {channel.connected ? (
                            <span className="text-xs text-green-500 font-medium">Connected</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Connect</span>
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem 
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                      onClick={() => setSelectedChannel(null)}
                    >
                      <Workflow className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Clear selection</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Welcome Screen - Original Layout */
          <div className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-foreground">Hello Md Tariqul Islam Sojol</h1>
                <p className="text-lg sm:text-xl text-muted-foreground">What can I do for you?</p>
              </div>
            </div>
            
            {/* Main Input */}
            <div className="w-full max-w-4xl">
              <div className="relative">
                <div className="relative bg-muted/30 rounded-2xl sm:rounded-3xl border border-border/50 p-4 sm:p-6">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search connected sources"
                    className="border-0 bg-transparent text-lg sm:text-xl h-12 sm:h-16 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-14"
                    disabled={isTyping}
                  />
                  
                  {/* Send Button */}
                  <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
                    <Button
                      size="sm"
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0 ${inputValue.trim() && !isTyping ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                  
                  {/* Connectors and Channels Row */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50"
                        >
                          <Plus className="h-3 w-3 mr-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        className="w-64 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                        align="start"
                      >
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <Workflow className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Connectors</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Add photos & files</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Add a sheet</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Add banners</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <Bot className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Make banners</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Deep search</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Competitor research</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                        >
                          {(() => {
                            const SelectedChannelIcon = getSelectedChannelIcon();
                            return <SelectedChannelIcon className="h-3 w-3 mr-2 flex-shrink-0" />;
                          })()}
                          <span className="truncate">{selectedChannel || 'Channels'}</span>
                          <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        className="w-80 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                        align="start"
                      >
                        {channels.map((channel) => {
                          const IconComponent = channel.icon;
                          return (
                            <DropdownMenuItem 
                              key={channel.id}
                              className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                              onClick={() => handleChannelSelect(channel.name)}
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{channel.name}</span>
                              </div>
                              {channel.connected ? (
                                <span className="text-xs text-green-500 font-medium">Connected</span>
                              ) : (
                                <span className="text-xs text-muted-foreground">Connect</span>
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem 
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                          onClick={() => setSelectedChannel(null)}
                        >
                          <Workflow className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Clear selection</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                        >
                          {(() => {
                            const SelectedIndustryIcon = getSelectedIndustryIcon();
                            return <SelectedIndustryIcon className="h-3 w-3 mr-2 flex-shrink-0" />;
                          })()}
                          <span className="truncate">{selectedIndustry || 'Industry'}</span>
                          <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        className="w-64 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                        align="start"
                      >
                        {businessNiches.map((niche) => {
                          const IconComponent = niche.icon;
                          return (
                            <DropdownMenuItem 
                              key={niche.id}
                              className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                              onClick={() => {
                                setSelectedIndustry(niche.name);
                                setInputValue(niche.prompt);
                              }}
                            >
                              <IconComponent className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{niche.name}</span>
                            </DropdownMenuItem>
                          );
                        })}
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem 
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                          onClick={() => setSelectedIndustry(null)}
                        >
                          <Factory className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Clear selection</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              
              {/* Business Niche Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-4xl mx-auto">
                {businessNiches.slice(0, 12).map((niche) => {
                  const IconComponent = niche.icon;
                  return (
                    <Button 
                      key={niche.id}
                      variant="ghost" 
                      className="h-14 sm:h-16 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl sm:rounded-2xl flex flex-col gap-1 sm:gap-2 border border-border/30 hover:border-border"
                      onClick={() => handleNicheSelect(niche.prompt)}
                    >
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="text-xs leading-tight text-center">{niche.name}</span>
                    </Button>
                  );
                })}
              </div>
              
              {/* Show More Niches */}
              <div className="flex items-center justify-center mt-4">
                <Button 
                  variant="ghost" 
                  className="h-9 sm:h-10 px-4 sm:px-6 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  More Industries
                </Button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* Chat Messages */
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 sm:gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'assistant' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white dark:text-black" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] sm:max-w-[70%] ${message.type === 'user' ? 'bg-muted rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4' : ''}`}>
                    <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium">MT</span>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 sm:gap-4 justify-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white dark:text-black" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input in chat mode */}
          <div className="p-4 sm:p-6 border-t border-border">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-muted/30 rounded-2xl sm:rounded-3xl border border-border/50 p-4 sm:p-6">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search connected sources"
                  className="border-0 bg-transparent text-lg sm:text-xl h-12 sm:h-16 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-14"
                  disabled={isTyping}
                />
                
                {/* Send Button */}
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
                  <Button
                    size="sm"
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0 ${inputValue.trim() && !isTyping ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                
                {/* Connectors and Channels Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50"
                      >
                        <Plus className="h-3 w-3 mr-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-64 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                      align="start"
                    >
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <Workflow className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Connectors</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Add photos & files</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Add a sheet</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Add banners</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Make banners</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Deep search</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Competitor research</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                      >
                        {(() => {
                          const SelectedChannelIcon = getSelectedChannelIcon();
                          return <SelectedChannelIcon className="h-3 w-3 mr-2 flex-shrink-0" />;
                        })()}
                        <span className="truncate">{selectedChannel || 'Channels'}</span>
                        <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-80 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                      align="start"
                    >
                      {channels.map((channel) => {
                        const IconComponent = channel.icon;
                        return (
                          <DropdownMenuItem 
                            key={channel.id}
                            className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                            onClick={() => handleChannelSelect(channel.name)}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{channel.name}</span>
                            </div>
                            {channel.connected ? (
                              <span className="text-xs text-green-500 font-medium">Connected</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Connect</span>
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                        onClick={() => setSelectedChannel(null)}
                      >
                        <Workflow className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Clear selection</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                      >
                        {(() => {
                          const SelectedIndustryIcon = getSelectedIndustryIcon();
                          return <SelectedIndustryIcon className="h-3 w-3 mr-2 flex-shrink-0" />;
                        })()}
                        <span className="truncate">{selectedIndustry || 'Industry'}</span>
                        <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-64 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                      align="start"
                    >
                      {businessNiches.map((niche) => {
                        const IconComponent = niche.icon;
                        return (
                          <DropdownMenuItem 
                            key={niche.id}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                            onClick={() => {
                              setSelectedIndustry(niche.name);
                              setInputValue(niche.prompt);
                            }}
                          >
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{niche.name}</span>
                          </DropdownMenuItem>
                        );
                      })}
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                        onClick={() => setSelectedIndustry(null)}
                      >
                        <Factory className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Clear selection</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}