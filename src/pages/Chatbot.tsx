import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import chatbotAvatar from "@/assets/chatbot-avatar.png";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm your AI Tutor. I'm here to help you understand any topic better. Feel free to ask me anything!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestionChips = [
    "Explain simply",
    "Show me an example",
    "Why is this important?",
    "How does it work?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question! Let me explain that to you. ",
        "I'd be happy to help you understand this topic better. ",
        "That's an interesting question! Here's what I can tell you: ",
        "Let me break this down for you in a simple way. "
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse + "The concept you're asking about involves understanding the fundamental principles and applying them in practical scenarios. Would you like me to provide a specific example?",
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img src={chatbotAvatar} alt="AI Tutor" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="text-xl font-bold">AI Tutor</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-fade-in ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <img
                    src={chatbotAvatar}
                    alt="AI"
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[70%] rounded-3xl p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card shadow-card"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                    U
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <img
                  src={chatbotAvatar}
                  alt="AI"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="bg-card shadow-card rounded-3xl p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestionChips.map((chip, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestion(chip)}
                className="rounded-full whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 mr-2" />
                {chip}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a doubt or question..."
              className="flex-1 h-12 rounded-2xl"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
