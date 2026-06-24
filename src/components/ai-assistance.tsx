import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

const suggestions = [
  'Suggest a premium gift for a birthday',
  'How does personalization work?',
  'What are your delivery timelines?',
  'Can you help with corporate gifting?',
];

function getReply(input: string) {
  const text = input.toLowerCase();

  if (text.includes('birthday') || text.includes('gift')) {
    return 'Absolutely. For birthdays, our most-loved picks are personalized keepsake boxes, framed photo gifts, and luxury couple sets. I can recommend a style based on your budget and recipient.';
  }

  if (text.includes('personal') || text.includes('custom')) {
    return 'Yes — we support custom names, photos, Spotify messages, and premium packaging. You can share your preference during checkout or through WhatsApp support.';
  }

  if (text.includes('delivery') || text.includes('ship')) {
    return 'We offer fast dispatch with premium packaging. Most orders are prepared quickly, and our team can confirm the expected timeline for your location.';
  }

  if (text.includes('corporate')) {
    return 'We create polished corporate gifting options for clients, teams, and milestone celebrations. We can help you choose a premium set in bulk.';
  }

  return 'I can help with gift ideas, personalization options, delivery, and corporate orders. Tell me what you need and I will guide you.';
}

export function AIAssistance() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hi! I am Giftify Assistant. I can help you find the right gift, explain personalization, or guide you on delivery.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: getReply(trimmed) },
    ]);
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#4A2346] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(74,35,70,0.28)] transition hover:-translate-y-0.5 hover:bg-[#352038] sm:bottom-6 sm:right-6"
      >
        <MessageCircle className="h-4 w-4" />
        Ask Giftify AI
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/45 p-3 sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-[#4A2346] to-[#6d3b5d] px-4 py-4 text-white dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white/15 p-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Giftify Assistant</p>
                    <p className="text-xs text-white/80">Instant help for gifting queries</p>
                  </div>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'assistant' ? 'bg-[#F5E3E8] text-slate-800 dark:bg-slate-800 dark:text-slate-100' : 'bg-[#4A2346] text-white'}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setInput(suggestion);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-[#4A2346] hover:text-[#4A2346] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <Sparkles className="h-4 w-4 text-[#4A2346]" />
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about gifts, delivery, or personalization"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                  <button type="submit" className="rounded-full bg-[#4A2346] p-2 text-white transition hover:bg-[#352038]">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
