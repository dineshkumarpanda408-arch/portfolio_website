import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

interface AIAssistantChatProps {
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Greetings! I'm Echo-3D, Dinesh's AI assistant. Ask me anything about Dinesh's projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    soundFx.playClick();
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');

    // Generate intelligent AI response based on portfolioConfig
    setTimeout(() => {
      let reply = "Dinesh is a highly skilled AI Developer & Full Stack Engineer with expertise in PyTorch, React, Node.js, and Three.js!";
      const lower = query.toLowerCase();

      const matchedFaq = portfolioConfig.aiAssistant.faq.find(f => 
        lower.includes(f.question.toLowerCase().slice(0, 10))
      );

      if (matchedFaq) {
        reply = matchedFaq.answer;
      } else if (lower.includes('project') || lower.includes('work')) {
        reply = `Dinesh has built several impressive projects including ${portfolioConfig.projects.map(p => p.title).slice(0, 3).join(', ')}.`;
      } else if (lower.includes('skill') || lower.includes('python') || lower.includes('react')) {
        reply = "Dinesh's top technical skills include Python (95%), React (94%), Machine Learning (92%), Java, Node.js, MySQL, and Tailwind CSS.";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        reply = `You can email Dinesh at ${portfolioConfig.contact.email} or connect on LinkedIn at ${portfolioConfig.contact.socials.linkedin}`;
      }

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
      soundFx.playHover();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[520px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                Echo-3D Companion
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </h3>
              <p className="text-[11px] text-cyan-300">Recruiter AI Knowledge Assistant</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                    : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Quick Chips */}
        <div className="py-2 border-t border-white/10 flex flex-wrap gap-1.5">
          {portfolioConfig.aiAssistant.faq.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.question)}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-[11px] text-cyan-300 truncate max-w-[220px]"
            >
              {item.question}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about Dinesh's experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
