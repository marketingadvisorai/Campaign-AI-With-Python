import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Eye, Edit, Share, Download, Play } from 'lucide-react';

interface CampaignPreviewProps {
  campaign?: any;
}

export function CampaignPreview({ campaign }: CampaignPreviewProps) {
  if (!campaign) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Eye className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">No Campaign Selected</h3>
            <p className="text-sm text-muted-foreground">
              Create a campaign in the chat to see a preview here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background border-l border-border">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{campaign.name}</h2>
            <p className="text-sm text-muted-foreground">Campaign Preview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Launch
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Ready to Launch
          </Badge>
          <span className="text-sm text-muted-foreground">
            Budget: {campaign.budget}
          </span>
          <span className="text-sm text-muted-foreground">
            Duration: {campaign.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Campaign Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Campaign Overview</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Objectives</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.objectives?.map((objective: string, index: number) => (
                  <Badge key={index} variant="outline">{objective}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.platforms?.map((platform: string, index: number) => (
                  <Badge key={index} variant="secondary">{platform}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Google Ads Preview */}
        {campaign.googleAds && (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Google Ads</h3>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg bg-white dark:bg-muted/20">
                <div className="text-sm text-green-600 mb-1">Ad • example.com</div>
                <div className="text-lg text-blue-600 mb-1">
                  {campaign.googleAds.adCopy.headline1} | {campaign.googleAds.adCopy.headline2}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {campaign.googleAds.adCopy.description}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Campaign Type:</span>
                  <div className="font-medium">{campaign.googleAds.campaignType}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <div className="font-medium">{campaign.googleAds.budget}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Target CPC:</span>
                  <div className="font-medium">{campaign.googleAds.targetCPC}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Keywords:</span>
                  <div className="font-medium">{campaign.googleAds.keywords?.length || 0} keywords</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Facebook Ads Preview */}
        {campaign.facebookAds && (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Facebook Ads</h3>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg bg-white dark:bg-muted/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    B
                  </div>
                  <div>
                    <div className="font-medium text-sm">Your Business</div>
                    <div className="text-xs text-muted-foreground">Sponsored</div>
                  </div>
                </div>
                
                <div className="text-sm mb-2">
                  {campaign.facebookAds.adCreative.primaryText}
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border">
                  <div className="font-medium text-sm mb-1">
                    {campaign.facebookAds.adCreative.headline}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {campaign.facebookAds.adCreative.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">example.com</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Campaign Type:</span>
                  <div className="font-medium">{campaign.facebookAds.campaignType}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <div className="font-medium">{campaign.facebookAds.budget}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Target CPM:</span>
                  <div className="font-medium">{campaign.facebookAds.targetCPM}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Audiences:</span>
                  <div className="font-medium">{campaign.facebookAds.audiences?.length || 0} audiences</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Performance Predictions */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Performance Predictions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.4K</div>
              <div className="text-sm text-muted-foreground">Est. Impressions</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">180</div>
              <div className="text-sm text-muted-foreground">Est. Clicks</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3.2%</div>
              <div className="text-sm text-muted-foreground">Est. CTR</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Est. Conversions</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex-shrink-0 p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last updated: 2 minutes ago
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              Launch Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}