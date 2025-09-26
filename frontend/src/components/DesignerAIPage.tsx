import { 
  Sparkles, 
  ArrowUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Share2,
  Copy,
  Trash2,
  Edit,
  Filter,
  Grid,
  List,
  Plus,
  Upload,
  ExternalLink,
  MoreVertical,
  Heart,
  FolderOpen,
  ChevronDown,
  Palette,
  Maximize,
  Paperclip,
  FileSpreadsheet,
  ImageIcon,
  Monitor,
  Building,
  Utensils,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Search,
  FileImage,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// Design sizes for Designer AI
const DESIGN_SIZES = [
  // Google Ads
  {
    id: 'google-leaderboard',
    name: 'Leaderboard',
    dimensions: '728x90',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-banner',
    name: 'Banner',
    dimensions: '468x60',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-skyscraper',
    name: 'Skyscraper',
    dimensions: '160x600',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-wide-skyscraper',
    name: 'Wide Skyscraper',
    dimensions: '300x600',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-medium-rectangle',
    name: 'Medium Rectangle',
    dimensions: '300x250',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-large-rectangle',
    name: 'Large Rectangle',
    dimensions: '336x280',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-mobile-banner',
    name: 'Mobile Banner',
    dimensions: '320x50',
    platform: 'Google Ads',
    category: 'Mobile Ads'
  },
  {
    id: 'google-large-mobile-banner',
    name: 'Large Mobile Banner',
    dimensions: '320x100',
    platform: 'Google Ads',
    category: 'Mobile Ads'
  },
  {
    id: 'google-square',
    name: 'Square',
    dimensions: '250x250',
    platform: 'Google Ads',
    category: 'Display Ads'
  },
  {
    id: 'google-small-square',
    name: 'Small Square',
    dimensions: '200x200',
    platform: 'Google Ads',
    category: 'Display Ads'
  },

  // Facebook
  {
    id: 'facebook-news-feed',
    name: 'News Feed Link Ad',
    dimensions: '1200x628',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-carousel',
    name: 'Carousel',
    dimensions: '1080x1080',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-single-image',
    name: 'Single Image Ad',
    dimensions: '1200x628',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-video',
    name: 'Video Ad',
    dimensions: '1280x720',
    platform: 'Facebook',
    category: 'Video'
  },
  {
    id: 'facebook-right-column',
    name: 'Right Column',
    dimensions: '254x133',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-instant-article',
    name: 'Instant Article',
    dimensions: '1200x628',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-marketplace',
    name: 'Marketplace',
    dimensions: '1200x630',
    platform: 'Facebook',
    category: 'Social Media'
  },
  {
    id: 'facebook-stories',
    name: 'Stories',
    dimensions: '1080x1920',
    platform: 'Facebook',
    category: 'Stories'
  },

  // Instagram
  {
    id: 'instagram-square',
    name: 'Square Post',
    dimensions: '1080x1080',
    platform: 'Instagram',
    category: 'Social Media'
  },
  {
    id: 'instagram-landscape',
    name: 'Landscape Post',
    dimensions: '1080x566',
    platform: 'Instagram',
    category: 'Social Media'
  },
  {
    id: 'instagram-portrait',
    name: 'Portrait Post',
    dimensions: '1080x1350',
    platform: 'Instagram',
    category: 'Social Media'
  },
  {
    id: 'instagram-stories',
    name: 'Stories',
    dimensions: '1080x1920',
    platform: 'Instagram',
    category: 'Stories'
  },
  {
    id: 'instagram-reels',
    name: 'Reels',
    dimensions: '1080x1920',
    platform: 'Instagram',
    category: 'Video'
  },
  {
    id: 'instagram-carousel',
    name: 'Carousel',
    dimensions: '1080x1080',
    platform: 'Instagram',
    category: 'Social Media'
  },
  {
    id: 'instagram-story-ads',
    name: 'Story Ads',
    dimensions: '1080x1920',
    platform: 'Instagram',
    category: 'Stories'
  },

  // YouTube
  {
    id: 'youtube-display',
    name: 'Display Ad',
    dimensions: '300x250',
    platform: 'YouTube',
    category: 'Display Ads'
  },
  {
    id: 'youtube-overlay',
    name: 'Overlay Ad',
    dimensions: '468x60',
    platform: 'YouTube',
    category: 'Display Ads'
  },
  {
    id: 'youtube-skippable-video',
    name: 'Skippable Video',
    dimensions: '1920x1080',
    platform: 'YouTube',
    category: 'Video'
  },
  {
    id: 'youtube-bumper',
    name: 'Bumper Ad',
    dimensions: '1920x1080',
    platform: 'YouTube',
    category: 'Video'
  },
  {
    id: 'youtube-masthead',
    name: 'Masthead',
    dimensions: '1280x720',
    platform: 'YouTube',
    category: 'Video'
  },
  {
    id: 'youtube-companion-banner',
    name: 'Companion Banner',
    dimensions: '300x250',
    platform: 'YouTube',
    category: 'Display Ads'
  },
  {
    id: 'youtube-thumbnail',
    name: 'Thumbnail',
    dimensions: '1280x720',
    platform: 'YouTube',
    category: 'Video'
  },

  // LinkedIn
  {
    id: 'linkedin-single-image',
    name: 'Single Image Ad',
    dimensions: '1200x627',
    platform: 'LinkedIn',
    category: 'Social Media'
  },
  {
    id: 'linkedin-carousel',
    name: 'Carousel Ad',
    dimensions: '1080x1080',
    platform: 'LinkedIn',
    category: 'Social Media'
  },
  {
    id: 'linkedin-video',
    name: 'Video Ad',
    dimensions: '1280x720',
    platform: 'LinkedIn',
    category: 'Video'
  },
  {
    id: 'linkedin-sponsored-content',
    name: 'Sponsored Content',
    dimensions: '1200x627',
    platform: 'LinkedIn',
    category: 'Social Media'
  },
  {
    id: 'linkedin-message',
    name: 'Message Ad',
    dimensions: '300x250',
    platform: 'LinkedIn',
    category: 'Social Media'
  },
  {
    id: 'linkedin-dynamic',
    name: 'Dynamic Ad',
    dimensions: '1200x627',
    platform: 'LinkedIn',
    category: 'Social Media'
  },
  {
    id: 'linkedin-event',
    name: 'Event Ad',
    dimensions: '1200x627',
    platform: 'LinkedIn',
    category: 'Social Media'
  },

  // Twitter
  {
    id: 'twitter-timeline',
    name: 'Timeline Image',
    dimensions: '1024x512',
    platform: 'Twitter',
    category: 'Social Media'
  },
  {
    id: 'twitter-website-card',
    name: 'Website Card',
    dimensions: '800x418',
    platform: 'Twitter',
    category: 'Social Media'
  },
  {
    id: 'twitter-app-card',
    name: 'App Card',
    dimensions: '800x320',
    platform: 'Twitter',
    category: 'Social Media'
  },
  {
    id: 'twitter-summary-card',
    name: 'Summary Card',
    dimensions: '280x150',
    platform: 'Twitter',
    category: 'Social Media'
  },
  {
    id: 'twitter-video',
    name: 'Video Ad',
    dimensions: '1280x720',
    platform: 'Twitter',
    category: 'Video'
  },
  {
    id: 'twitter-promoted-tweet',
    name: 'Promoted Tweet',
    dimensions: '1024x512',
    platform: 'Twitter',
    category: 'Social Media'
  },

  // Cross-platform common sizes
  {
    id: 'common-instagram-facebook-story',
    name: 'Story (Instagram/Facebook)',
    dimensions: '1080x1920',
    platform: 'Instagram/Facebook',
    category: 'Stories'
  },
  {
    id: 'common-square-post',
    name: 'Square Post (Multi-platform)',
    dimensions: '1080x1080',
    platform: 'Instagram/Facebook/LinkedIn',
    category: 'Social Media'
  }
];

// Platforms for Designer AI
const DESIGN_PLATFORMS = [
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
    id: 'instagram-ads', 
    name: 'Instagram Ads', 
    icon: Instagram, 
    connected: false 
  },
  { 
    id: 'youtube-ads', 
    name: 'YouTube Ads', 
    icon: Youtube, 
    connected: false 
  },
  { 
    id: 'linkedin-ads', 
    name: 'LinkedIn Ads', 
    icon: Linkedin, 
    connected: false 
  },
  { 
    id: 'twitter-ads', 
    name: 'Twitter Ads', 
    icon: Twitter, 
    connected: false 
  }
];

// Mock data for creative library
const LIBRARY_STATS = [
  {
    icon: FileImage,
    label: 'Total Assets',
    value: '247',
    change: '+18',
    changeType: 'positive'
  },
  {
    icon: Sparkles,
    label: 'AI Generated',
    value: '89%',
    change: '+12%',
    changeType: 'positive'
  },
  {
    icon: TrendingUp,
    label: 'Top Performing',
    value: '34',
    change: '+8',
    changeType: 'positive'
  },
  {
    icon: Download,
    label: 'Downloads',
    value: '1.2K',
    change: '+24%',
    changeType: 'positive'
  }
];

const LIBRARY_ASSETS = [
  {
    id: 1,
    name: 'Coffee Shop Hero Banner',
    type: 'banner',
    aiGenerated: true,
    status: 'active',
    favorite: true,
    dimensions: '1080x1080',
    platform: 'Instagram',
    createdAt: '2023-10-01',
    downloads: 500,
    performance: {
      ctr: '1.2%',
      impressions: '10,000',
      engagement: '50'
    },
    tags: ['coffee', 'shop', 'hero', 'banner']
  },
  {
    id: 2,
    name: 'Landscape Coffee Shop',
    type: 'video',
    aiGenerated: false,
    status: 'paused',
    favorite: false,
    dimensions: '1920x1080',
    platform: 'YouTube',
    createdAt: '2023-09-15',
    downloads: 300,
    performance: {
      ctr: '0.8%',
      impressions: '8,000',
      engagement: '40'
    },
    tags: ['coffee', 'shop', 'landscape', 'video']
  },
  {
    id: 3,
    name: 'Story Coffee Shop',
    type: 'story',
    aiGenerated: true,
    status: 'active',
    favorite: true,
    dimensions: '1080x1920',
    platform: 'Instagram/Facebook',
    createdAt: '2023-10-05',
    downloads: 200,
    performance: {
      ctr: '1.5%',
      impressions: '15,000',
      engagement: '75'
    },
    tags: ['coffee', 'shop', 'story', 'banner']
  },
  {
    id: 4,
    name: 'Square Coffee Shop',
    type: 'banner',
    aiGenerated: false,
    status: 'active',
    favorite: false,
    dimensions: '600x600',
    platform: 'Instagram',
    createdAt: '2023-09-20',
    downloads: 100,
    performance: {
      ctr: '0.9%',
      impressions: '9,000',
      engagement: '45'
    },
    tags: ['coffee', 'shop', 'square', 'banner']
  }
];

export function DesignerAIPage() {
  const [activeTab, setActiveTab] = useState('designer');
  
  // Library-specific state
  const [libraryView, setLibraryView] = useState('grid');
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Designer AI state
  const [designerInputValue, setDesignerInputValue] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isDesignerTyping, setIsDesignerTyping] = useState(false);

  // Platform ID to name mapping for filtering sizes
  const platformIdToName: { [key: string]: string } = {
    'google-ads': 'Google Ads',
    'facebook-ads': 'Facebook',
    'instagram-ads': 'Instagram',
    'youtube-ads': 'YouTube',
    'linkedin-ads': 'LinkedIn',
    'twitter-ads': 'Twitter'
  };

  // Filter sizes based on selected platforms
  const getFilteredSizes = () => {
    if (selectedPlatforms.length === 0) {
      return DESIGN_SIZES; // Show all sizes if no platforms selected
    }
    
    const selectedPlatformNames = selectedPlatforms.map(id => platformIdToName[id]);
    return DESIGN_SIZES.filter(size => 
      selectedPlatformNames.some(platformName => 
        size.platform.includes(platformName)
      )
    );
  };

  const filteredSizes = getFilteredSizes();

  // Update selected sizes when platform selection changes
  const handlePlatformToggle = (platformId: string) => {
    const newSelectedPlatforms = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    
    setSelectedPlatforms(newSelectedPlatforms);
    
    // Remove sizes that are no longer supported by the selected platforms
    const newFilteredSizes = newSelectedPlatforms.length === 0 
      ? DESIGN_SIZES 
      : DESIGN_SIZES.filter(size => 
          newSelectedPlatforms.some(id => size.platform.includes(platformIdToName[id]))
        );
    
    const newFilteredSizeIds = newFilteredSizes.map(size => size.id);
    setSelectedSizes(selectedSizes.filter(sizeId => newFilteredSizeIds.includes(sizeId)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900';
      case 'learning':
        return 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900';
      case 'paused':
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900';
    }
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl">Designer AI</h2>
                <p className="text-muted-foreground">
                  Create stunning visuals and manage your creative library
                </p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="designer">Designer AI</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>

          {/* Designer AI Tab */}
          <TabsContent value="designer" className="space-y-4">
            <div className="h-full flex flex-col bg-background">
              {/* Main Interface */}
              <div className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
                  <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-foreground">What would you like to create?</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground">Describe your design and I'll generate it for you</p>
                  </div>
                </div>
                
                {/* Main Input */}
                <div className="w-full max-w-4xl">
                  <div className="relative">
                    <div className="relative bg-muted/30 rounded-2xl sm:rounded-3xl border border-border/50 p-4 sm:p-6">
                      <Input
                        value={designerInputValue}
                        onChange={(e) => setDesignerInputValue(e.target.value)}
                        placeholder="Create a modern coffee shop banner with warm colors and steam rising from a cup..."
                        className="border-0 bg-transparent text-lg sm:text-xl h-12 sm:h-16 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-14"
                        disabled={isDesignerTyping}
                      />
                      
                      {/* Send Button */}
                      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
                        <Button
                          size="sm"
                          className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0 ${designerInputValue.trim() && !isDesignerTyping ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-muted/50 hover:bg-muted text-muted-foreground'}`}
                          disabled={!designerInputValue.trim() || isDesignerTyping}
                        >
                          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>
                      
                      {/* Options Row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                        {/* Plus Menu with Photos, Files, and Logo */}
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
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Add photos & files</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                              <Palette className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Add logo</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Add a sheet</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer">
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Add banners</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Platforms Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                            >
                              <Globe className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="truncate">
                                {selectedPlatforms.length === 0 
                                  ? 'Platforms' 
                                  : selectedPlatforms.length === DESIGN_PLATFORMS.length 
                                    ? 'All Platforms' 
                                    : `${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? 's' : ''}`
                                }
                              </span>
                              <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            className="w-80 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                            align="start"
                          >
                            {/* Select All Platforms Option */}
                            <DropdownMenuItem 
                              className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                              onClick={() => {
                                if (selectedPlatforms.length === DESIGN_PLATFORMS.length) {
                                  setSelectedPlatforms([]);
                                  setSelectedSizes([]); // Clear sizes when no platforms selected
                                } else {
                                  setSelectedPlatforms(DESIGN_PLATFORMS.map(platform => platform.id));
                                }
                              }}
                            >
                              <Checkbox 
                                checked={selectedPlatforms.length === DESIGN_PLATFORMS.length}
                                onChange={() => {}}
                                className="pointer-events-none"
                              />
                              <span className="text-sm font-medium">Select All Platforms</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            
                            {DESIGN_PLATFORMS.map((platform) => {
                              const IconComponent = platform.icon;
                              return (
                                <DropdownMenuItem 
                                  key={platform.id}
                                  className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                                  onClick={() => handlePlatformToggle(platform.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <Checkbox 
                                      checked={selectedPlatforms.includes(platform.id)}
                                      onChange={() => {}}
                                      className="pointer-events-none"
                                    />
                                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{platform.name}</span>
                                  </div>
                                  {platform.connected ? (
                                    <span className="text-xs text-green-500 font-medium">Connected</span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">Connect</span>
                                  )}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Sizes Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 rounded-full px-3 text-sm bg-muted/50 hover:bg-muted border border-border/50 min-w-0"
                            >
                              <Maximize className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="truncate">
                                {selectedSizes.length === 0 
                                  ? 'Sizes' 
                                  : selectedSizes.length === DESIGN_SIZES.length 
                                    ? 'All Sizes' 
                                    : `${selectedSizes.length} Size${selectedSizes.length > 1 ? 's' : ''}`
                                }
                              </span>
                              <ChevronDown className="h-3 w-3 ml-2 flex-shrink-0" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            className="w-80 p-1 bg-muted/90 backdrop-blur-sm border border-border/50" 
                            align="start"
                          >
                            {/* Select All Option */}
                            <DropdownMenuItem 
                              className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                              onClick={() => {
                                if (selectedSizes.length === filteredSizes.length) {
                                  setSelectedSizes([]);
                                } else {
                                  setSelectedSizes(filteredSizes.map(size => size.id));
                                }
                              }}
                            >
                              <Checkbox 
                                checked={selectedSizes.length === filteredSizes.length && filteredSizes.length > 0}
                                onChange={() => {}}
                                className="pointer-events-none"
                              />
                              <span className="text-sm font-medium">
                                Select All Sizes{selectedPlatforms.length > 0 ? ' (Filtered)' : ''}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            
                            {/* Individual Size Options */}
                            {filteredSizes.map((size) => (
                              <DropdownMenuItem 
                                key={size.id}
                                className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 cursor-pointer"
                                onClick={() => {
                                  if (selectedSizes.includes(size.id)) {
                                    setSelectedSizes(selectedSizes.filter(id => id !== size.id));
                                  } else {
                                    setSelectedSizes([...selectedSizes, size.id]);
                                  }
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox 
                                    checked={selectedSizes.includes(size.id)}
                                    onChange={() => {}}
                                    className="pointer-events-none"
                                  />
                                  <div>
                                    <div className="text-sm font-medium">{size.name}</div>
                                    <div className="text-xs text-muted-foreground">{size.dimensions}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-muted-foreground">{size.platform}</div>
                                  <div className="text-xs text-muted-foreground">{size.category}</div>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Suggestions */}
                <div className="w-full max-w-4xl mt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg mb-2">Or try these suggestions</h3>
                    <p className="text-sm text-muted-foreground">Click any suggestion to get started</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Coffee Shop Banner",
                        description: "Warm, inviting banner with steam and rustic elements",
                        prompt: "Create a warm, inviting coffee shop banner with steam rising from a cup, rustic wooden background, and 'Fresh Artisan Coffee Daily' text",
                        icon: ImageIcon
                      },
                      {
                        title: "Tech Startup Ad",
                        description: "Modern, clean design with gradient backgrounds",
                        prompt: "Design a modern tech startup advertisement with clean gradients, laptop mockup, and 'Innovation Starts Here' tagline",
                        icon: Monitor
                      },
                      {
                        title: "Fitness Motivation",
                        description: "High-energy design with bold typography",
                        prompt: "Create a high-energy fitness motivation banner with bold typography, diverse people working out, and 'Transform Your Life' message",
                        icon: Heart
                      },
                      {
                        title: "Restaurant Special",
                        description: "Appetizing food imagery with elegant styling",
                        prompt: "Design an elegant restaurant special banner with appetizing food photography, chef elements, and 'Today's Special' text",
                        icon: Utensils
                      },
                      {
                        title: "Real Estate Listing",
                        description: "Professional property showcase design",
                        prompt: "Create a professional real estate listing banner with modern home photography, property details, and 'Schedule Your Tour' call-to-action",
                        icon: Building
                      },
                      {
                        title: "Beauty Salon Promo",
                        description: "Elegant design with soft pastels and beauty elements",
                        prompt: "Design an elegant beauty salon promotion with soft pastels, beauty tools, and 'New Client Special 30% Off' offer",
                        icon: Sparkles
                      }
                    ].map((suggestion, index) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <Card 
                          key={index} 
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border border-border/50"
                          onClick={() => setDesignerInputValue(suggestion.prompt)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{suggestion.title}</h4>
                              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-4">
            {/* Library Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-2">Creative Library</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and organize your AI-generated banners and creatives
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              </div>
            </div>

            {/* Library Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {LIBRARY_STATS.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={stat.label} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-4 w-4 text-chart-1" />
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{stat.value}</div>
                      <div className={`text-sm flex items-center gap-1 ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Filters and Search */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="performance">Best Performance</SelectItem>
                      <SelectItem value="downloads">Most Downloads</SelectItem>
                      <SelectItem value="favorites">Favorites</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center border rounded-md">
                    <Button
                      variant={libraryView === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setLibraryView('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={libraryView === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setLibraryView('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bulk Actions */}
            {selectedAssets.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Selected
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Assets Grid/List */}
            {libraryView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {LIBRARY_ASSETS.map((asset) => (
                  <Card key={asset.id} className="group overflow-hidden">
                    <div className="relative">
                      {/* Thumbnail */}
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + asset.id}?w=400&h=300&fit=crop`}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="secondary" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Preview</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="secondary" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Download</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="secondary" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <Badge className="text-xs bg-black/60 text-white">
                            {asset.type}
                          </Badge>
                          {asset.aiGenerated && (
                            <Badge className="text-xs bg-blue-600 text-white">
                              <Sparkles className="h-2 w-2 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>

                        {/* Status */}
                        <div className="absolute top-2 right-2">
                          <Badge className={getStatusColor(asset.status)}>
                            {asset.status}
                          </Badge>
                        </div>

                        {/* Favorite */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 h-6 w-6 p-0"
                        >
                          <Heart className={`h-3 w-3 ${asset.favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </Button>

                        {/* Selection Checkbox */}
                        <div className="absolute bottom-2 left-2">
                          <Checkbox
                            checked={selectedAssets.includes(asset.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAssets([...selectedAssets, asset.id]);
                              } else {
                                setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                              }
                            }}
                            className="bg-white/90"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium line-clamp-1">{asset.name}</h4>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span>{asset.dimensions}</span>
                            <span>{asset.platform}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                            <span>{asset.downloads} downloads</span>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                          <div className="text-center">
                            <div className="text-green-600">{asset.performance.ctr}</div>
                            <div className="text-muted-foreground">CTR</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600">{asset.performance.impressions}</div>
                            <div className="text-muted-foreground">Views</div>
                          </div>
                          <div className="text-center">
                            <div className="text-purple-600">{asset.performance.engagement}</div>
                            <div className="text-muted-foreground">Engage</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {asset.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {asset.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              +{asset.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-2">
                {LIBRARY_ASSETS.map((asset) => (
                  <Card key={asset.id} className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Selection Checkbox */}
                      <Checkbox
                        checked={selectedAssets.includes(asset.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAssets([...selectedAssets, asset.id]);
                          } else {
                            setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                          }
                        }}
                      />

                      {/* Thumbnail */}
                      <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + asset.id}?w=64&h=48&fit=crop`}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{asset.name}</h4>
                            {asset.favorite && <Heart className="h-3 w-3 fill-red-500 text-red-500" />}
                            {asset.aiGenerated && (
                              <Badge className="text-xs bg-blue-600 text-white">
                                <Sparkles className="h-2 w-2 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {asset.type} • {asset.dimensions}
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="text-muted-foreground">Campaign</div>
                          <div>N/A</div>
                        </div>

                        <div className="text-sm">
                          <div className="text-muted-foreground">Platform</div>
                          <div>{asset.platform}</div>
                        </div>

                        <div className="text-sm">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-green-600">{asset.performance.ctr}</div>
                              <div className="text-xs text-muted-foreground">CTR</div>
                            </div>
                            <div>
                              <div className="text-blue-600">{asset.performance.impressions}</div>
                              <div className="text-xs text-muted-foreground">Views</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-sm">
                          <Badge className={getStatusColor(asset.status)}>
                            {asset.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>More options</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {LIBRARY_ASSETS.length === 0 && (
              <Card className="p-12">
                <div className="text-center">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No assets found</h3>
                  <p className="text-muted-foreground mb-4">
                    Start creating amazing banners and creatives with AI
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Your First Creative
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}