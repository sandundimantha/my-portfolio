'use client';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { personalInfo, socialLinks, navLinks } from '@/data/portfolio-data';

export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 40, paddingTop: 60 }}>
      <div className="section-container">
        <div className="glass-card-static" style={{ padding: '36px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-3">{personalInfo.name}</h3>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{personalInfo.title}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>{personalInfo.subtitle}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-base tracking-wider" style={{ color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-sm flex items-center gap-1.5 hover:text-white transition-colors"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                    whileHover={{ x: 3 }}
                  >
                    <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>●</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4 text-base tracking-wider" style={{ color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, y: -2, background: 'rgba(59, 130, 246, 0.15)', borderColor: 'var(--primary)', boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '1rem',
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    <link.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border-color)', margin: '32px 0 24px' }} />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.9 }}>
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
