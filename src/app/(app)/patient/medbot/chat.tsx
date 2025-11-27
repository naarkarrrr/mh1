'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { medBotAssistant } from '@/ai/flows/medbot-assistant';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User as UserIcon, CornerDownLeft, Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const ehrDataExample = `
- Condition: Hypertension, diagnosed 2022.
- Medication: Lisinopril 10mg, daily.
- Allergies: Penicillin.
- Last Visit: 2023-10-01, routine check-up, BP stable.
`;

export function Chat() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm your MedBot Assistant. You can ask me questions about your health conditions, medications, or schedule appointments. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const response = await medBotAssistant({ query: input, ehrData: ehrDataExample });
      if (response && response.response) {
        const botMessage: Message = { role: 'bot', text: response.response };
        setMessages((prev) => [...prev, botMessage]);
      } else {
         toast({
          variant: "destructive",
          title: "Error",
          description: "Could not get a response from MedBot. Please try again.",
        });
        setMessages((prev) => prev.slice(0, -1)); // remove user message if bot fails
      }
    });
  };

  const QuickActionButton = ({ text, icon: Icon }: { text: string; icon: React.ElementType }) => (
    <Button variant="outline" size="sm" className="h-auto" onClick={() => setInput(text)}>
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );

  return (
    <Card className="h-full w-full max-w-4xl mx-auto flex flex-col shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot />
          MedBot Assistant
        </CardTitle>
        <CardDescription>Your personal AI health companion.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}
              >
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg px-4 py-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.text}
                </div>
                 {message.role === 'user' && user && (
                   <Avatar className="h-8 w-8 border">
                      <AvatarImage src={user.avatar}/>
                     <AvatarFallback><UserIcon size={18}/></AvatarFallback>
                   </Avatar>
                 )}
              </div>
            ))}
            {isPending && (
               <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center gap-2">
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-0"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-auto">
            <div className="flex gap-2 mb-2 flex-wrap">
                <QuickActionButton text="What are the side effects of Lisinopril?" icon={Pill} />
                <QuickActionButton text="Schedule a follow-up with Dr. Reed" icon={Calendar} />
            </div>
            <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="pr-24"
              disabled={isPending}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button type="submit" size="sm" disabled={isPending || !input.trim()}>
                Send
                <Send className="ml-2 h-4 w-4" />
                </Button>
                <span className="hidden md:flex items-center text-muted-foreground text-xs ml-2 p-1 border rounded-md">
                    <CornerDownLeft size={12}/>
                </span>
            </div>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}
