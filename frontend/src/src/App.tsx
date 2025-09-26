import { useState } from 'react';
import { LoginPage } from '../components/LoginPage';
import { ChatInterface } from '../components/ChatInterface';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { IntegrationsPage } from '../components/IntegrationsPage';
import { AnalyticsPage } from '../components/AnalyticsPage';
import { TrackingPage } from '../components/TrackingPage';
import { MainLayout } from './components/MainLayout';
import { DashboardContent } from './components/DashboardContent';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useMobile } from './hooks/useMobile';
import { APP_VIEWS } from './constants/app';
import type { Campaign, ViewType } from './types/app';

export default function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('chat');
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const { isAuthenticated, userEmail, handleLogin, handleLogout } = useAuth();
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();

  const handleCampaignGenerated = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <MainLayout
      activeView={activeView}
      setActiveView={setActiveView}
      userEmail={userEmail}
      onLogout={handleLogout}
      isMobile={isMobile}
      settingsOpen={settingsOpen}
      setSettingsOpen={setSettingsOpen}
      theme={theme}
      onThemeChange={setTheme}
    >
      {activeView === APP_VIEWS.INTEGRATIONS && <IntegrationsPage />}
      {activeView === APP_VIEWS.WORKFLOW && (
        <div className="h-full p-6 overflow-y-auto">
          <WorkflowDiagram />
        </div>
      )}
      {activeView === APP_VIEWS.ANALYTICS && <AnalyticsPage />}
      {activeView === APP_VIEWS.TRACKING && <TrackingPage />}
      {activeView === APP_VIEWS.DASHBOARD && (
        <div className="h-full p-6 overflow-y-auto">
          <DashboardContent />
        </div>
      )}
      {activeView === APP_VIEWS.CHAT && (
        <ChatInterface onCampaignGenerated={handleCampaignGenerated} />
      )}
    </MainLayout>
  );
}