import React, { useState } from 'react';
import { 
  X,
  CheckCircle,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOnboardingComplete: () => void;
  mode?: 'first-login' | 'channel-connection';
}

export function OnboardingModal({ 
  open, 
  onOpenChange, 
  onOnboardingComplete,
  mode = 'first-login' 
}: OnboardingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise' | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: 'USD / month',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 5 active campaigns',
        'Basic AI optimization and insights', 
        '2 platform integrations (Google Ads, Facebook)',
        'Standard analytics and reporting',
        'Email support and tutorials',
        'Campaign templates and presets'
      ],
      popular: false,
      buttonText: 'Choose Starter'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$99',
      period: 'USD / month',
      description: 'Supercharge your marketing with advanced AI and unlimited access',
      features: [
        'Unlimited campaigns and projects',
        'Advanced AI optimization with machine learning',
        'All platform integrations (Google, Facebook, Instagram, LinkedIn, Twitter)',
        'Advanced analytics with custom dashboards',
        'Priority support with dedicated account manager',
        'Custom AI model training and fine-tuning',
        'Business-grade security and compliance',
        'Voice notes and meeting transcription',
        'AI content generation and copywriting'
      ],
      popular: true,
      buttonText: 'Choose Professional'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: 'USD / month',
      description: 'Complete solution for large organizations with custom needs',
      features: [
        'Everything in Professional plus enterprise features',
        'White-label solution with custom branding',
        'Dedicated account manager and onboarding',
        'Custom integrations and API access',
        'SLA guarantee with 99.9% uptime',
        'On-premise deployment options',
        'Advanced developer tools and webhooks',
        'Unlimited asset storage and CDN',
        'Custom contracts and billing terms'
      ],
      popular: false,
      buttonText: 'Choose Enterprise'
    }
  ];

  const handleSkip = () => {
    if (mode === 'first-login') {
      onOnboardingComplete();
    }
    onOpenChange(false);
  };

  const handleGetStarted = () => {
    if (selectedPlan || mode === 'channel-connection') {
      onOnboardingComplete();
      onOpenChange(false);
    }
  };

  const isFirstLogin = mode === 'first-login';
  const isChannelConnection = mode === 'channel-connection';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-background border-0 overflow-hidden">
        <div className="relative w-full h-full overflow-y-auto">
          
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="fixed top-6 right-6 z-50 p-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-12">
            
            {/* Header */}
            <div className="text-center mb-12 max-w-3xl">
              <h1 className="text-foreground text-4xl md:text-5xl mb-6 font-medium">
                {isFirstLogin ? 'Welcome to Campaign AI Studio' : 'Upgrade your plan'}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {isFirstLogin 
                  ? 'Choose the perfect plan to unlock the full potential of AI-powered marketing campaigns'
                  : 'A paid subscription is required to connect advertising platforms and access advanced features'
                }
              </p>
            </div>

            {/* Plan requirement notice for channel connection */}
            {isChannelConnection && (
              <div className="w-full max-w-5xl mb-12">
                <Card className="p-6 bg-muted/30 border-border">
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-foreground text-lg mb-2 font-medium">Subscription Required</h4>
                      <p className="text-muted-foreground">
                        To connect advertising platforms and access campaign management features, you'll need an active subscription. 
                        Choose a plan below to get started with Campaign AI Studio.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Plans grid */}
            <div className="w-full max-w-7xl mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`relative p-8 cursor-pointer transition-all duration-300 border-2 min-h-[600px] flex flex-col ${
                      selectedPlan === plan.id 
                        ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]' 
                        : plan.popular 
                          ? 'border-primary/20 shadow-lg' 
                          : 'border-border hover:border-muted-foreground/30 hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedPlan(plan.id as typeof selectedPlan)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-full font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          RECOMMENDED
                        </Badge>
                      </div>
                    )}
                    
                    {/* Plan header */}
                    <div className="text-center mb-8">
                      <h3 className="text-foreground text-2xl mb-4 font-medium">{plan.name}</h3>
                      <div className="mb-6">
                        <span className="text-foreground text-5xl font-medium">{plan.price}</span>
                        <span className="text-muted-foreground text-lg ml-2">{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground text-base leading-relaxed">{plan.description}</p>
                    </div>
                    
                    {/* Plan button */}
                    <div className="mb-8">
                      <Button 
                        className={`w-full h-14 text-base rounded-xl font-medium ${
                          selectedPlan === plan.id 
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                            : plan.popular
                              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground border border-border'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan.id as typeof selectedPlan);
                        }}
                      >
                        {selectedPlan === plan.id ? 'Selected' : plan.buttonText}
                      </Button>
                    </div>

                    {/* Features list */}
                    <div className="space-y-4 flex-1">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm leading-6">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {selectedPlan === plan.id && (
                      <div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none" />
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isFirstLogin && (
                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="h-12 px-8 bg-transparent border-border text-muted-foreground hover:bg-muted hover:text-foreground text-base font-medium"
                >
                  Skip for now
                </Button>
              )}
              <Button 
                onClick={handleGetStarted}
                disabled={!selectedPlan && !isChannelConnection}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
              >
                {isFirstLogin ? 'Get Started' : 'Continue with Plan'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Footer note */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                {isFirstLogin 
                  ? "You can always upgrade later. No setup fees or long-term commitments."
                  : "30-day money-back guarantee. Cancel anytime."
                }
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}