"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Plug,
  Workflow,
  LayoutDashboard,
  BarChart3,
  Target,
  Zap,
  Palette,
  Settings,
  User,
  Menu,
  PanelLeftOpen,
  PanelLeftClose,
  Sparkles,
  TrendingUp,
  Diamond,
  Smile,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { LoginPage } from "@/components/LoginPage";
import { SettingsModal } from "@/components/SettingsModal";
import { PricingPage } from "@/components/PricingPage";
import { IntegrationsPage } from "@/components/IntegrationsPage";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { AnalyticsPage } from "@/components/AnalyticsPage";
import { TrackingPage } from "@/components/TrackingPage";
import { AIOptimizationPage } from "@/components/AIOptimizationPage";
import { DesignerAIPage } from "@/components/DesignerAIPage";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export default function HomePage() {
  const [, setSelectedCampaign] = useState<any>(null);
  const [activeView, setActiveView] = useState("chat");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("userAuth");
      const savedOnboarding = localStorage.getItem("hasCompletedOnboarding");

      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUserEmail(authData.email);
        setHasCompletedOnboarding(savedOnboarding === "true");
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = (email: string, website?: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "userAuth",
        JSON.stringify({
          email,
          website: website || "",
          loginTime: Date.now(),
        }),
      );
    }

    setActiveView("chat");

    const savedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    if (savedOnboarding !== "true") {
      setPricingOpen(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setHasCompletedOnboarding(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem("userAuth");
      localStorage.removeItem("hasCompletedOnboarding");
    }
  };

  const handlePricingComplete = () => {
    setHasCompletedOnboarding(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasCompletedOnboarding", "true");
    }
    setPricingOpen(false);
  };

  const handleShowPricing = () => {
    setPricingOpen(true);
  };

  const handleCampaignGenerated = (campaign: any) => {
    setSelectedCampaign(campaign);
  };

  const menuItems = [
    {
      id: "chat",
      label: "New Campaign Chat",
      icon: <MessageSquare className="h-4 w-4" />,
      type: "action",
    },
    {
      id: "integrations",
      label: "Connect & Integrate",
      icon: <Plug className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "workflow",
      label: "Workflow Builder",
      icon: <Workflow className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "dashboard",
      label: "Campaign Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "tracking",
      label: "Tracking",
      icon: <Target className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "ai-optimization",
      label: "AI Optimization",
      icon: <Zap className="h-4 w-4" />,
      type: "page",
    },
    {
      id: "designer-ai",
      label: "Designer AI",
      icon: <Palette className="h-4 w-4" />,
      type: "page",
    },
  ];

  const renderMainContent = () => {
    if (pricingOpen) {
      return <PricingPage onClose={() => setPricingOpen(false)} onPlanSelected={handlePricingComplete} />;
    }

    switch (activeView) {
      case "integrations":
        return <IntegrationsPage onShowOnboarding={handleShowPricing} />;
      case "workflow":
        return (
          <div className="h-full p-6 overflow-y-auto">
            <WorkflowDiagram />
          </div>
        );
      case "analytics":
        return <AnalyticsPage />;
      case "tracking":
        return <TrackingPage />;
      case "ai-optimization":
        return <AIOptimizationPage />;
      case "designer-ai":
        return <DesignerAIPage />;
      case "dashboard":
        return (
          <div className="h-full p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2>Campaign Dashboard</h2>
                <p className="text-muted-foreground">Monitor all your campaigns and their performance metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-chart-1" />
                    <span className="text-sm">Active Campaigns</span>
                  </div>
                  <div className="text-2xl">12</div>
                  <div className="text-xs text-muted-foreground">+3 this week</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-chart-2" />
                    <span className="text-sm">Total Impressions</span>
                  </div>
                  <div className="text-2xl">2.4M</div>
                  <div className="text-xs text-muted-foreground">+18% this month</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-chart-3" />
                    <span className="text-sm">Avg. CTR</span>
                  </div>
                  <div className="text-2xl">3.2%</div>
                  <div className="text-xs text-muted-foreground">+0.4% vs last month</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-chart-4" />
                    <span className="text-sm">AI Optimizations</span>
                  </div>
                  <div className="text-2xl">47</div>
                  <div className="text-xs text-muted-foreground">Applied this week</div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="mb-4">Recent Campaign Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm">Coffee Shop Multi-Platform Campaign</p>
                      <p className="text-xs text-muted-foreground">Created 2 hours ago</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm">Law Firm Lead Generation</p>
                      <p className="text-xs text-muted-foreground">Created yesterday</p>
                    </div>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm">E-commerce Holiday Campaign</p>
                      <p className="text-xs text-muted-foreground">Created 3 days ago</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>AI Optimization</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveView("ai-optimization")}>
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800 dark:text-blue-200">Active Optimizations</span>
                    </div>
                    <div className="text-xl text-blue-900 dark:text-blue-100">3</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Saving $2,847/month</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800 dark:text-green-200">Recommendations</span>
                    </div>
                    <div className="text-xl text-green-900 dark:text-green-100">4</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Ready to apply</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <ChatInterface
            onCampaignGenerated={handleCampaignGenerated}
            onShowOnboarding={handleShowPricing}
            isAuthenticated={isAuthenticated}
            onRequireAuth={() => setActiveView("login")}
          />
        );
    }
  };

  if (!isAuthenticated && activeView === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {isMobile && (
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
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-sidebar-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
                        </div>
                        <div>
                          <h1 className="text-sidebar-foreground text-lg">Campaign AI Studio</h1>
                          <p className="text-sidebar-foreground/60 text-sm">AI-Powered Marketing Platform</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-2">
                        {menuItems.map((item) => (
                          <Button
                            key={item.id}
                            variant={activeView === item.id ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 h-12 text-left"
                            onClick={() => {
                              setActiveView(item.id);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {item.icon}
                            <span className="flex-1">{item.label}</span>
                          </Button>
                        ))}
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-2">
                        <div className="px-3 py-2">
                          <p className="text-sidebar-foreground/60 text-sm">Recent Campaigns</p>
                        </div>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                          <MessageSquare className="h-4 w-4" />
                          <span className="flex-1 truncate">Coffee Shop Multi-Platform...</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                          <MessageSquare className="h-4 w-4" />
                          <span className="flex-1 truncate">Law Firm Lead Generation</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                          <MessageSquare className="h-4 w-4" />
                          <span className="flex-1 truncate">E-commerce Holiday Sale</span>
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border-t border-sidebar-border">
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10 text-left"
                          onClick={() => {
                            setSettingsOpen(true);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left">
                          <User className="h-4 w-4" />
                          <span>Account</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg truncate">Campaign AI Studio</h1>
            </div>
            <Button variant="ghost" size="sm" className="p-2" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className={`${sidebarCollapsed ? "w-16" : "w-80"} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}>
          <div className={`${sidebarCollapsed ? "p-2" : "p-4"} border-b border-sidebar-border`}>
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 rounded-md p-0 hover:bg-sidebar-accent"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <PanelLeftOpen className="h-3 w-3" />
                </Button>
              </div>
            ) : (
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
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-0" : "justify-start gap-3"} h-12 text-left`}
                  onClick={() => setActiveView(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                </Button>
              ))}
            </div>

            {!sidebarCollapsed && (
              <>
                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sidebar-foreground/60 text-sm">Recent Campaigns</p>
                  </div>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                    <MessageSquare className="h-4 w-4" />
                    <span className="flex-1 truncate">Coffee Shop Multi-Platform...</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                    <MessageSquare className="h-4 w-4" />
                    <span className="flex-1 truncate">Law Firm Lead Generation</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left text-sidebar-foreground/80">
                    <MessageSquare className="h-4 w-4" />
                    <span className="flex-1 truncate">E-commerce Holiday Sale</span>
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t border-sidebar-border">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full ${sidebarCollapsed ? "justify-center px-0" : "justify-start gap-3"} h-10 text-left`}
                onClick={() => setSettingsOpen(true)}
                title={sidebarCollapsed ? "Settings" : undefined}
              >
                <Settings className="h-4 w-4" />
                {!sidebarCollapsed && <span>Settings</span>}
              </Button>
              {!sidebarCollapsed && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-left">
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-popover border-border shadow-lg" side="top" align="start" sideOffset={8}>
                    <div className="p-1">
                      <div className="px-3 py-2 border-b border-border">
                        <h3 className="text-foreground text-sm">Campaign AI Studio</h3>
                      </div>

                      <div className="py-1">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground text-sm">{userEmail}</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
                          <Diamond className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground text-sm">Upgrade plan</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
                          <Smile className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground text-sm">Personalization</span>
                        </div>

                        <div
                          className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors"
                          onClick={() => setSettingsOpen(true)}
                        >
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground text-sm">Settings</span>
                        </div>

                        <div className="border-t border-border my-1 mx-1" />

                        <div className="flex items-center justify-between px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground text-sm">Help</span>
                          </div>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        </div>

                        <div
                          className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md mx-1 cursor-pointer transition-colors"
                          onClick={() => setLogoutModalOpen(true)}
                        >
                          <LogOut className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground text-sm">Log out</span>
                        </div>
                      </div>

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
              )}
              {sidebarCollapsed && (
                <Button variant="ghost" className="w-full justify-center px-0 h-10" title="Account">
                  <User className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col ${isMobile ? "pt-16" : ""}`}>
        <div className="flex-1 overflow-hidden">{renderMainContent()}</div>
      </div>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} theme={theme} onThemeChange={setTheme} />

      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <DialogContent className="max-w-md p-0 bg-card border-border shadow-lg rounded-xl">
          <DialogTitle className="sr-only">Log out confirmation</DialogTitle>
          <DialogDescription className="sr-only">
            This dialog asks for confirmation before logging you out of your account.
          </DialogDescription>

          <div className="p-8 text-center">
            <h2 className="text-2xl text-foreground mb-4">Are you sure you want to log out?</h2>
            <p className="text-muted-foreground mb-8">Log out of Campaign AI Studio as {userEmail}?</p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setLogoutModalOpen(false);
                  handleLogout();
                }}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base transition-colors"
              >
                Log out
              </Button>

              <Button
                variant="outline"
                onClick={() => setLogoutModalOpen(false)}
                className="w-full h-12 border-border hover:bg-accent text-foreground rounded-full text-base transition-colors"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
