import React, { useState } from 'react';
import { X, CheckCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
export function PricingPage({ onClose, onPlanSelected }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: '$29',
            period: 'USD / month',
            description: 'Perfect for individuals and small teams getting started',
            buttonText: 'Choose Starter',
            features: [
                'Up to 5 active campaigns',
                'Basic AI optimization and insights',
                '2 platform integrations (Google Ads, Facebook)',
                'Standard analytics and reporting',
                'Email support and tutorials'
            ]
        },
        {
            id: 'professional',
            name: 'Professional',
            price: '$99',
            period: 'USD / month',
            description: 'Supercharge your marketing with advanced AI and unlimited access',
            buttonText: 'Choose Professional',
            isRecommended: true,
            features: [
                'Unlimited campaigns and projects',
                'Advanced AI optimization with machine learning',
                'All platform integrations (Google, Facebook, Instagram, LinkedIn, Twitter)',
                'Advanced analytics with custom dashboards',
                'Priority support with dedicated account manager'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$299',
            period: 'USD / month',
            description: 'Complete solution for large organizations with custom needs',
            buttonText: 'Choose Enterprise',
            features: [
                'Everything in Professional plus enterprise features',
                'White-label solution with custom branding',
                'Dedicated account manager and onboarding',
                'Custom integrations and API access',
                'SLA guarantee with 99.9% uptime'
            ]
        }
    ];
    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
        onPlanSelected?.(planId);
    };
    return (<div className="h-full w-full bg-background overflow-y-auto">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h1 className="text-2xl text-foreground">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-1">
            Select the perfect plan to unlock the full potential of AI-powered marketing campaigns
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
          <X className="h-5 w-5"/>
        </Button>
      </div>

      {/* Pricing cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (<Card key={plan.id} className={`relative p-8 transition-all duration-300 border-2 min-h-[500px] flex flex-col ${selectedPlan === plan.id
                ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]'
                : plan.isRecommended
                    ? 'border-primary/30 shadow-lg'
                    : 'border-border hover:border-muted-foreground/30 hover:shadow-lg'}`}>
              {plan.isRecommended && (<div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-full">
                    <Star className="h-3 w-3 mr-1"/>
                    RECOMMENDED
                  </Badge>
                </div>)}
              
              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-foreground text-2xl mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-foreground text-5xl">{plan.price}</span>
                  <span className="text-muted-foreground text-lg ml-2">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">{plan.description}</p>
              </div>
              
              {/* Plan button */}
              <div className="mb-8">
                <Button className={`w-full h-14 text-base rounded-xl ${selectedPlan === plan.id
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : plan.isRecommended
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground border border-border'}`} onClick={() => handlePlanSelect(plan.id)}>
                  {selectedPlan === plan.id ? 'Selected' : plan.buttonText}
                </Button>
              </div>

              {/* Features list */}
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, index) => (<div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"/>
                    <span className="text-foreground text-sm leading-6">{feature}</span>
                  </div>))}
              </div>
              
              {selectedPlan === plan.id && (<div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none"/>)}
            </Card>))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            30-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>);
}
