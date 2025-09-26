import React from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  User, 
  Diamond, 
  Smile, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';

interface UserAccountPopoverProps {
  userEmail: string;
  onLogoutClick: () => void;
  onSettingsClick: () => void;
}

export function UserAccountPopover({ 
  userEmail, 
  onLogoutClick, 
  onSettingsClick 
}: UserAccountPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-left"
        >
          <User className="h-4 w-4" />
          <span>Account</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-popover border-border shadow-lg" 
        side="top"
        align="start"
        sideOffset={8}
      >
        <div className="p-1">
          {/* Header */}
          <div className="px-3 py-2 border-b border-border">
            <h3 className="text-foreground text-sm">Campaign AI Studio</h3>
          </div>
          
          <div className="py-1">
            {/* Email */}
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground text-sm">{userEmail}</span>
            </div>
            
            {/* Upgrade plan */}
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
              <Diamond className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground text-sm">Upgrade plan</span>
            </div>
            
            {/* Personalization */}
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
              <Smile className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground text-sm">Personalization</span>
            </div>
            
            {/* Settings */}
            <div 
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors"
              onClick={onSettingsClick}
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground text-sm">Settings</span>
            </div>
            
            <div className="border-t border-border my-1 mx-1"></div>
            
            {/* Help */}
            <div className="flex items-center justify-between px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground text-sm">Help</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </div>
            
            {/* Log out */}
            <div 
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors"
              onClick={onLogoutClick}
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground text-sm">Log out</span>
            </div>
          </div>
          
          {/* User Info Footer */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                AA
              </div>
              <div>
                <div className="text-foreground text-sm">Advisor AI</div>
                <div className="text-muted-foreground text-xs">Plus</div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}