import React from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';

const RECENT_CAMPAIGNS = [
  'Coffee Shop Multi-Platform...',
  'Law Firm Lead Generation',
  'E-commerce Holiday Sale',
];

export function RecentCampaigns() {
  return (
    <div className="space-y-2">
      <div className="px-3 py-2">
        <p className="text-sidebar-foreground/60 text-sm">Recent Campaigns</p>
      </div>
      {RECENT_CAMPAIGNS.map((campaign, index) => (
        <Button
          key={index}
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="flex-1 truncate">{campaign}</span>
        </Button>
      ))}
    </div>
  );
}