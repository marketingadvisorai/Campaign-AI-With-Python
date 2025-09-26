import { useState } from 'react';

export function useSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleSidebar,
    closeMobileMenu,
  };
}