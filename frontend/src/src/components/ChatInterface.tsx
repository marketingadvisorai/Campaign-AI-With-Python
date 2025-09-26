import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Sparkles, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  campaignData?: any;
}

interface ChatInterfaceProps {
  onCampaignGenerated: (campaign: any) => void;
}

const mockCampaignResponse = {
  id: 'camp-001',
  name: 'Coffee Shop Multi-Platform Campaign',
  platforms: ['Google Ads', 'Facebook Ads'],
  budget: '$2,500/month',
  duration: '30 days',
  objectives: ['Drive foot traffic', 'Increase brand awareness', 'Boost online orders'],
};

export function ChatInterface({ onCampaignGenerated }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Great! I'll create a comprehensive campaign strategy for "${inputValue}". Let me analyze your requirements and generate a detailed campaign plan with targeting, ad copy, budget allocation, and creative recommendations.`,
        timestamp: new Date(),
        campaignData: mockCampaignResponse
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      onCampaignGenerated(mockCampaignResponse);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {messages.length === 0 ? (
        /* Welcome Screen */
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-foreground">Welcome to Campaign AI Studio</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">What campaign would you like to create today?</p>
            </div>
          </div>
          
          {/* Main Input */}
          <div className="w-full max-w-4xl">
            <div className="relative">
              <div className="relative bg-muted/30 rounded-2xl sm:rounded-3xl border border-border/50 p-4 sm:p-6">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your campaign needs..."
                  className="border-0 bg-transparent text-lg sm:text-xl h-12 sm:h-16 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isTyping}
                />
                
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="rounded-full px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sample Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Button
                variant="outline"
                className="p-4 h-auto text-left justify-start"
                onClick={() => setInputValue("Create a lead generation campaign for a roofing company")}
              >
                <div>
                  <div className="font-medium">Roofing Lead Generation</div>
                  <div className="text-sm text-muted-foreground mt-1">Create a campaign to generate leads for roofing services</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="p-4 h-auto text-left justify-start"
                onClick={() => setInputValue("Create a local dining campaign for a restaurant")}
              >
                <div>
                  <div className="font-medium">Restaurant Promotion</div>
                  <div className="text-sm text-muted-foreground mt-1">Promote a local restaurant to drive foot traffic</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Messages */
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-12' 
                      : 'bg-muted mr-12'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.campaignData && (
                      <div className="mt-4 p-4 bg-background/10 rounded-lg">
                        <h4 className="font-medium mb-2">Campaign Summary:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Name: {message.campaignData.name}</li>
                          <li>• Budget: {message.campaignData.budget}</li>
                          <li>• Duration: {message.campaignData.duration}</li>
                          <li>• Platforms: {message.campaignData.platforms.join(', ')}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-3xl p-4 rounded-2xl bg-muted mr-12">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full h-12 pl-4 pr-12 rounded-full border border-border/50 bg-muted/30 placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isTyping}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}