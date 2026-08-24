import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, FileText, CheckCircle2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioConfig } from '../../config/portfolioConfig';
import { soundFx } from '../../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCrystalPulse();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(portfolioConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 md:px-12 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Send className="w-3.5 h-3.5 text-cyan-400" />
          <span>Professional Contact</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Get in Touch
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          I am actively exploring AI Developer, Machine Learning Engineer, and Full Stack Engineering roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#0c101d] space-y-4">
            <h3 className="text-lg font-bold text-white">Direct Communication</h3>
            
            <div className="p-3 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate font-mono">{portfolioConfig.contact.email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 ml-2"
                title="Copy Email"
              >
                {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-mono">{portfolioConfig.contact.phone}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{portfolioConfig.contact.location}</span>
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              <a
                href={portfolioConfig.profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={portfolioConfig.profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={portfolioConfig.profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
                title="Resume PDF"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-[#0c101d]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Message Received</h3>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. Dinesh will respond to your inquiry shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Engineering Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide inquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onClick={() => soundFx.playClick()}
                  className="shimmer-button w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 transform"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
