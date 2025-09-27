import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Play, BarChart3, Target, DollarSign, Clock, Search, Facebook, Users, MousePointer, TrendingUp, CheckCircle2, AlertTriangle, Copy } from 'lucide-react';
const performanceData = {
    impressions: 12540,
    clicks: 326,
    ctr: 2.6,
    cpc: 0.89,
    conversions: 23,
    conversionRate: 7.1,
    costPerConversion: 12.61,
    qualityScore: 8.2,
    adSpend: 290.00,
    revenue: 1150.00,
    roas: 3.97
};
export function CampaignPreview({ campaign }) {
    const [activeTab, setActiveTab] = useState('overview');
    if (!campaign) {
        return (<div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground"/>
          </div>
          <h3 className="text-muted-foreground">No Campaign Selected</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Create a campaign using the chat interface to see detailed previews and analytics here.
          </p>
        </div>
      </div>);
    }
    const handlePublish = (platform) => {
        console.log(`Publishing to ${platform}...`);
        // Mock publish logic
    };
    const copyAdCopy = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (<div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground">{campaign.name}</h2>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3"/>
              Draft
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {campaign.platforms.map((platform) => (<Badge key={platform} variant="secondary" className="gap-1">
                {platform === 'Google Ads' && <Search className="h-3 w-3"/>}
                {platform === 'Facebook Ads' && <Facebook className="h-3 w-3"/>}
                {platform}
              </Badge>))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground"/>
              <span className="text-muted-foreground">Budget:</span>
              <span className="text-foreground">{campaign.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground"/>
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground">{campaign.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="google">Google Ads</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="performance">Analytics</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 p-4">
            <TabsContent value="overview" className="space-y-4 mt-0">
              {/* Objectives */}
              <Card className="p-4">
                <h3 className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4"/>
                  Campaign Objectives
                </h3>
                <div className="space-y-2">
                  {campaign.objectives.map((objective, index) => (<div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500"/>
                      <span className="text-sm">{objective}</span>
                    </div>))}
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-chart-1"/>
                    <span className="text-sm">Estimated Reach</span>
                  </div>
                  <div className="text-2xl">15.2K</div>
                  <div className="text-xs text-muted-foreground">people per day</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MousePointer className="h-4 w-4 text-chart-2"/>
                    <span className="text-sm">Projected CTR</span>
                  </div>
                  <div className="text-2xl">2.4%</div>
                  <div className="text-xs text-muted-foreground">click-through rate</div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full gap-2" onClick={() => handlePublish('all')}>
                  <Play className="h-4 w-4"/>
                  Publish All Campaigns
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => handlePublish('Google Ads')}>
                    <Search className="h-4 w-4"/>
                    Publish Google Ads
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => handlePublish('Facebook Ads')}>
                    <Facebook className="h-4 w-4"/>
                    Publish Facebook Ads
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="google" className="space-y-4 mt-0">
              <Card className="p-4">
                <h3 className="mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4"/>
                  Google Ads Campaign
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Campaign Type:</span>
                      <p>{campaign.googleAds.campaignType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p>{campaign.googleAds.budget}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target CPC:</span>
                      <p>{campaign.googleAds.targetCPC}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.googleAds.keywords.map((keyword, index) => (<Badge key={index} variant="outline">{keyword}</Badge>))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3">Ad Copy</h4>
                    <Card className="p-3 bg-muted/50">
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-muted-foreground">Headline 1:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.googleAds.adCopy.headline1}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.googleAds.adCopy.headline1)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Headline 2:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.googleAds.adCopy.headline2}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.googleAds.adCopy.headline2)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Description:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.googleAds.adCopy.description}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.googleAds.adCopy.description)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="facebook" className="space-y-4 mt-0">
              <Card className="p-4">
                <h3 className="mb-3 flex items-center gap-2">
                  <Facebook className="h-4 w-4"/>
                  Facebook Ads Campaign
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Campaign Type:</span>
                      <p>{campaign.facebookAds.campaignType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p>{campaign.facebookAds.budget}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target CPM:</span>
                      <p>{campaign.facebookAds.targetCPM}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-2">Target Audiences</h4>
                    <div className="space-y-2">
                      {campaign.facebookAds.audiences.map((audience, index) => (<div key={index} className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground"/>
                          <span className="text-sm">{audience}</span>
                        </div>))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-3">Ad Creative</h4>
                    <Card className="p-3 bg-muted/50">
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-muted-foreground">Primary Text:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.facebookAds.adCreative.primaryText}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.facebookAds.adCreative.primaryText)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Headline:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.facebookAds.adCreative.headline}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.facebookAds.adCreative.headline)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Description:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{campaign.facebookAds.adCreative.description}</p>
                            <Button size="sm" variant="ghost" onClick={() => copyAdCopy(campaign.facebookAds.adCreative.description)}>
                              <Copy className="h-3 w-3"/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-0">
              <Card className="p-4">
                <h3 className="mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4"/>
                  Performance Analytics
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Impressions</span>
                    <div className="text-xl">{performanceData.impressions.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Clicks</span>
                    <div className="text-xl">{performanceData.clicks}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">CTR</span>
                    <div className="text-xl">{performanceData.ctr}%</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">CPC</span>
                    <div className="text-xl">${performanceData.cpc}</div>
                  </div>
                </div>

                <Separator className="my-4"/>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversions</span>
                    <span className="text-sm">{performanceData.conversions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm">{performanceData.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROAS</span>
                    <span className="text-sm text-green-600">{performanceData.roas}x</span>
                  </div>
                </div>

                <Separator className="my-4"/>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ad Spend</span>
                    <span className="text-sm">${performanceData.adSpend}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Generated</span>
                    <span className="text-sm text-green-600">${performanceData.revenue}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="mb-3">Optimization Suggestions</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-0.5"/>
                    <div>
                      <p className="text-sm">Increase budget for high-performing keywords</p>
                      <p className="text-xs text-muted-foreground">Expected +15% conversions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5"/>
                    <div>
                      <p className="text-sm">Pause underperforming ad groups</p>
                      <p className="text-xs text-muted-foreground">Save ~$85/week in wasted spend</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5"/>
                    <div>
                      <p className="text-sm">Refine audience targeting</p>
                      <p className="text-xs text-muted-foreground">Potential CTR improvement of 0.8%</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>);
}
