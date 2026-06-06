'use client';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { contactInfo } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';
import { useState, FormEvent, useRef } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // EmailJS integration - replace with your own keys
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        'service_vdj41hj', // Replace with EmailJS Service ID
        'template_p7s0kzj', // Replace with EmailJS Template ID
        formRef.current!,
        'v5f8d6C1h0Ml6lf6b' // Replace with EmailJS Public Key
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      // Fallback to mailto
      const mailtoUrl = `mailto:sandundimantha2002@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.open(mailtoUrl);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: 12,
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Get In Touch</h2>
            <p className="section-subtitle mx-auto">Feel free to reach out for collaborations or opportunities</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <SectionWrapper delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card p-5 flex items-start gap-4"
                  style={{ textDecoration: 'none' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'var(--primary)',
                    }}
                  >
                    <info.icon />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{info.label}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>

          {/* Contact Form */}
          <SectionWrapper delay={0.2}>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card-static p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject"
                  style={inputStyle}
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  style={{ ...inputStyle, resize: 'vertical' as const }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? '✅ Message Sent!' : <><FaPaperPlane /> Send Message</>}
              </button>
              {status === 'error' && (
                <p className="text-sm text-center mt-3" style={{ color: '#EF4444' }}>Failed to send. Please try again.</p>
              )}
            </form>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
