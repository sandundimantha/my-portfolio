'use client';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/portfolio-data';

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      style={{
        position: 'fixed',
        left: 24,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        zIndex: 50,
      }}
      className="hidden md:flex"
    >
      {socialLinks.map((link, i) => (
        <motion.a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          whileHover={{ scale: 1.2, y: -3, color: '#3B82F6' }}
          style={{
            color: 'var(--text-secondary)',
            transition: 'color 0.3s ease',
            fontSize: '1.2rem',
          }}
        >
          <link.icon />
        </motion.a>
      ))}
      <div
        style={{
          width: 1,
          height: 90,
          background: 'var(--border-color)',
        }}
      />
    </motion.div>
  );
}
