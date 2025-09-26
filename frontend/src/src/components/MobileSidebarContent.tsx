import React from 'react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { MenuItems } from './MenuItems';
import { RecentCampaigns } from './RecentCampaigns';
import { Settings, User, Sparkles } from 'lucide-react';
import type { ViewType } from '../types/app';

interface MobileSidebarContentProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  userEmail: string;
  onLogoutClick: () => void;
  onSettingsClick: () => void;
}

export function MobileSidebarContent({
  activeView,
  onViewChange,
  userEmail,
  onLogoutClick,
  onSettingsClick,
}: MobileSidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sidebar-foreground text-lg">Campaign AI Studio</h1>
            <p className="text-sidebar-foreground/60 text-sm">AI-Powered Marketing Platform</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <MenuItems
          collapsed={false}
          activeView={activeView}
          onViewChange={onViewChange}
        />

        <Separator className="my-6" />
        <RecentCampaigns />
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-left"
            onClick={onSettingsClick}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-left"
          >
            <User className="h-4 w-4" />
            <span>Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}