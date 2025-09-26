import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  Workflow,
  Target,
  Plug
} from 'lucide-react';
import type { MenuItem, ViewType } from '../types/app';

export const APP_VIEWS = {
  CHAT: 'chat' as const,
  INTEGRATIONS: 'integrations' as const,
  WORKFLOW: 'workflow' as const,
  DASHBOARD: 'dashboard' as const,
  ANALYTICS: 'analytics' as const,
  TRACKING: 'tracking' as const,
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chat',
    label: 'New Campaign Chat',
    icon: MessageSquare,
    type: 'action'
  },
  {
    id: 'integrations',
    label: 'Connect & Integrate',
    icon: Plug,
    type: 'page'
  },
  {
    id: 'workflow',
    label: 'Workflow Builder',
    icon: Workflow,
    type: 'page'
  },
  {
    id: 'dashboard',
    label: 'Campaign Dashboard',
    icon: LayoutDashboard,
    type: 'page'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    type: 'page'
  },
  {
    id: 'tracking',
    label: 'Tracking',
    icon: Target,
    type: 'page'
  }
];

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;

export const SIDEBAR = {
  COLLAPSED_WIDTH: 16,
  EXPANDED_WIDTH: 80,
  MOBILE_WIDTH: 80,
} as const;

export const STORAGE_KEYS = {
  USER_AUTH: 'userAuth',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
} as const;