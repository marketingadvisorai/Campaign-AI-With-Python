import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileHeader } from './MobileHeader';
import { SettingsModal } from '../../components/SettingsModal';
import { LogoutModal } from './LogoutModal';
import { useSidebar } from '../hooks/useSidebar';
import { useModal } from '../hooks/useModal';
import type { ViewType, ThemeType } from '../types/app';

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  userEmail: string;
  onLogout: () => void;
  isMobile: boolean;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export function MainLayout({
  children,
  activeView,
  setActiveView,
  userEmail,
  onLogout,
  isMobile,
  settingsOpen,
  setSettingsOpen,
  theme,
  onThemeChange,
}: MainLayoutProps) {
  const sidebar = useSidebar();
  const logoutModal = useModal();

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    if (isMobile) {
      sidebar.closeMobileMenu();
    }
  };

  const handleLogoutConfirm = () => {
    logoutModal.close();
    onLogout();
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader
          mobileMenuOpen={sidebar.mobileMenuOpen}
          setMobileMenuOpen={sidebar.setMobileMenuOpen}
          setSettingsOpen={setSettingsOpen}
          activeView={activeView}
          onViewChange={handleViewChange}
          userEmail={userEmail}
          onLogoutClick={logoutModal.open}
        />
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <DesktopSidebar
          collapsed={sidebar.sidebarCollapsed}
          onToggleCollapse={sidebar.toggleSidebar}
          activeView={activeView}
          onViewChange={handleViewChange}
          userEmail={userEmail}
          onLogoutClick={logoutModal.open}
          onSettingsClick={() => setSettingsOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'pt-16' : ''}`}>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Modals */}
      <SettingsModal 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
        theme={theme}
        onThemeChange={onThemeChange}
      />

      <LogoutModal
        open={logoutModal.isOpen}
        onOpenChange={logoutModal.setIsOpen}
        userEmail={userEmail}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}