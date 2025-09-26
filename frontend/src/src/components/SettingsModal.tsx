import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { X, Monitor, Sun, Moon } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

export function SettingsModal({ open, onOpenChange, theme, onThemeChange }: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl">Settings</DialogTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Choose how Campaign AI Studio looks to you.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => onThemeChange('light')}
              >
                <Sun className="h-5 w-5" />
                <span className="text-sm">Light</span>
              </Button>
              
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => onThemeChange('dark')}
              >
                <Moon className="h-5 w-5" />
                <span className="text-sm">Dark</span>
              </Button>
              
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => onThemeChange('system')}
              >
                <Monitor className="h-5 w-5" />
                <span className="text-sm">System</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* General Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">General</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your display language
                  </p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save campaigns</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save campaign drafts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about campaign performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Privacy</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow usage data collection for improvement
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable analytics for better insights
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Advanced Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Advanced</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Beta features</Label>
                  <p className="text-sm text-muted-foreground">
                    Get early access to new features
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Show detailed error information
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}