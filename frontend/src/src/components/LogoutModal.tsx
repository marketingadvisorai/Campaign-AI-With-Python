import React from 'react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  onConfirm: () => void;
}

export function LogoutModal({ open, onOpenChange, userEmail, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 bg-card border-border shadow-lg rounded-xl">
        {/* Hidden title for screen readers */}
        <DialogTitle className="sr-only">
          Log out confirmation
        </DialogTitle>
        
        {/* Hidden description for screen readers */}
        <DialogDescription className="sr-only">
          This dialog asks for confirmation before logging you out of your account.
        </DialogDescription>
        
        <div className="p-8 text-center">
          {/* Main Question */}
          <h2 className="text-2xl text-foreground mb-4">
            Are you sure you want to log out?
          </h2>
          
          {/* Subtitle with user email */}
          <p className="text-muted-foreground mb-8">
            Log out of Campaign AI Studio as {userEmail}?
          </p>
          
          {/* Buttons */}
          <div className="space-y-3">
            {/* Log out button */}
            <Button
              onClick={onConfirm}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base transition-colors"
            >
              Log out
            </Button>
            
            {/* Cancel button */}
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-12 border-border hover:bg-accent text-foreground rounded-full text-base transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}