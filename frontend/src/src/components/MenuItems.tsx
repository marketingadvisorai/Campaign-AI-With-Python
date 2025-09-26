import React from 'react';
import { Button } from './ui/button';
import { MENU_ITEMS } from '../constants/app';
import type { ViewType } from '../types/app';

interface MenuItemsProps {
  collapsed: boolean;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function MenuItems({ collapsed, activeView, onViewChange }: MenuItemsProps) {
  return (
    <div className="space-y-2">
      {MENU_ITEMS.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start gap-3'} h-12 text-left`}
            onClick={() => onViewChange(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <IconComponent className="h-4 w-4" />
            {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
          </Button>
        );
      })}
    </div>
  );
}