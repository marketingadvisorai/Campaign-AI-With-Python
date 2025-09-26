"use client";

import React, { useState } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { TopBar } from './dashboard/TopBar';
import { DashboardHome } from './dashboard/DashboardHome';
import { Workspaces } from './dashboard/Workspaces';
import { Campaigns } from './dashboard/Campaigns';
import { Recommendations } from './dashboard/Recommendations';
import { ModelTraining } from './dashboard/ModelTraining';
import { Users } from './dashboard/Users';
import { Integrations } from './dashboard/Integrations';
import { Billing } from './dashboard/Billing';
import { AuditLog } from './dashboard/AuditLog';
import { Settings } from './dashboard/Settings';

export function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

const renderContent = () => {
  switch (activeTab) {
    case "dashboard":
      return (
        <DashboardHome
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      );
    case "clients":
      return (
        <Workspaces
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      );
    case "campaigns":
      return <Campaigns />;
    case "recommendations":
      return (
        <Recommendations
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      );
    case "model-training":
      return <ModelTraining />;
    case "billing":
      return <Billing />;
    case "integrations":
      return <Integrations />;
    case "audit":
      return <AuditLog />;
    case "settings":
      return <Settings />;
    default:
      return (
        <DashboardHome
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      );
  }
};


  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        selectedClient={selectedClient}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <TopBar 
          user={user} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onClientSelect={setSelectedClient}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}