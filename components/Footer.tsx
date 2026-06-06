'use client';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { personalInfo, socialLinks, navLinks } from '@/data/portfolio-data';

export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 40, paddingTop: 60 }}>
      <div className="section-container">
        <div className="glass-card-static p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-2">{personalInfo.name}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{personalInfo.title}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{personalInfo.subtitle}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:underline"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.2, color: '#3B82F6' }}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '1.2rem',
                    }}
                  >
                    <link.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border-color)', margin: '24px 0' }} />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              Built with <SiNextdotjs style={{ color: 'var(--text-primary)' }} /> & <FaHeart style={{ color: '#EF4444' }} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
