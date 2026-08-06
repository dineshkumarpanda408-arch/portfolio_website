import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const ContactFormOverlay: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCrystalPulse();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const copyEmailToClipboard = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(portfolioConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-12 z-30 max-w-md w-full pointer-events-none"
    >
      <div className="glass-panel p-5 md:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#0c101d]/85 pointer-events-auto max-h-[82vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Contact & Connect</h2>
            <p className="text-xs text-sky-300 font-medium">
              Recruitment, Technical Inquiries & Collaborations
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={portfolioConfig.contact.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-sky-400"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioConfig.contact.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-sky-400"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Info Chips */}
        <div className="space-y-2 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{portfolioConfig.contact.email}</span>
            </div>
            <button
              onClick={copyEmailToClipboard}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 ml-2"
              title="Copy Email"
            >
              {copiedEmail ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-1.5 truncate">
              <Phone className="w-3 h-3 text-sky-400 shrink-0" />
              <span className="truncate">{portfolioConfig.contact.phone}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-1.5 truncate">
              <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
              <span className="truncate">{portfolioConfig.contact.location}</span>
            </div>
          </div>
        </div>

        {/* Form or Success State */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-sky-950/60 border border-sky-500/40 text-center"
          >
            <CheckCircle2 className="w-8 h-8 text-sky-400 mx-auto mb-1.5" />
            <h3 className="text-sm font-bold text-white mb-0.5">Message Transmitted</h3>
            <p className="text-xs text-sky-200">
              Thank you! Dinesh will respond to your email promptly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
            />
            <textarea
              required
              rows={2}
              placeholder="Your message details..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400 resize-none"
            />
            <button
              type="submit"
              onClick={() => soundFx.playClick()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Professional Message</span>
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};
