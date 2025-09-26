import React from 'react';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Separator } from '../components/ui/separator';
import { MobileSidebarContent } from './MobileSidebarContent';
import { Menu, Settings, Sparkles } from 'lucide-react';
import type { ViewType } from '../types/app';

interface MobileHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  userEmail: string;
  onLogoutClick: () => void;
}

export function MobileHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  setSettingsOpen,
  activeView,
  onViewChange,
  userEmail,
  onLogoutClick,
}: MobileHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-sidebar">
              <MobileSidebarContent
                activeView={activeView}
                onViewChange={onViewChange}
                userEmail={userEmail}
                onLogoutClick={onLogoutClick}
                onSettingsClick={() => {
                  setSettingsOpen(true);
                  setMobileMenuOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg truncate">Campaign AI Studio</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}