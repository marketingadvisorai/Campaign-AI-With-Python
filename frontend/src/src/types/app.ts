export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'paused';
  createdAt: string;
  platform?: string;
  type?: string;
}

export type ViewType = 'chat' | 'integrations' | 'workflow' | 'dashboard' | 'analytics' | 'tracking';

export type ThemeType = 'light' | 'dark' | 'system';

export interface MenuItem {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
  type: 'action' | 'page';
}

export interface AuthData {
  email: string;
  loginTime: number;
}

export interface UserPreferences {
  theme: ThemeType;
  sidebarCollapsed?: boolean;
}