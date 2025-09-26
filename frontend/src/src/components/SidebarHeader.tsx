import React from 'react';
import { Button } from './ui/button';
import { Sparkles, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className={`${collapsed ? 'p-2' : 'p-4'} border-b border-sidebar-border`}>
      {collapsed ? (
        /* Collapsed Header - Vertical Stack */
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-md p-0 hover:bg-sidebar-accent"
            onClick={onToggleCollapse}
          >
            <PanelLeftOpen className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        /* Expanded Header - Horizontal Layout */
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sidebar-foreground text-lg truncate">Campaign AI Studio</h1>
              <p className="text-sidebar-foreground/60 text-sm truncate">AI-Powered Marketing Platform</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-md p-0 hover:bg-sidebar-accent flex-shrink-0"
            onClick={onToggleCollapse}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}