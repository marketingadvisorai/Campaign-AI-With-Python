import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { UserAccountPopover } from './UserAccountPopover';
import { RecentCampaigns } from './RecentCampaigns';
import { SidebarHeader } from './SidebarHeader';
import { MenuItems } from './MenuItems';
import { Settings, User } from 'lucide-react';
import type { ViewType } from '../types/app';

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  userEmail: string;
  onLogoutClick: () => void;
  onSettingsClick: () => void;
}

export function DesktopSidebar({
  collapsed,
  onToggleCollapse,
  activeView,
  onViewChange,
  userEmail,
  onLogoutClick,
  onSettingsClick,
}: DesktopSidebarProps) {
  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}>
      {/* Header */}
      <SidebarHeader collapsed={collapsed} onToggleCollapse={onToggleCollapse} />

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <MenuItems
          collapsed={collapsed}
          activeView={activeView}
          onViewChange={onViewChange}
        />

        {!collapsed && (
          <>
            <Separator className="my-6" />
            <RecentCampaigns />
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start gap-3'} h-10 text-left`}
            onClick={onSettingsClick}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Settings</span>}
          </Button>
          
          {!collapsed ? (
            <UserAccountPopover
              userEmail={userEmail}
              onLogoutClick={onLogoutClick}
              onSettingsClick={onSettingsClick}
            />
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-center px-0 h-10"
              title="Account"
            >
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}