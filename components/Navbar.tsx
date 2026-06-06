'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '@/data/portfolio-data';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(2, 6, 23, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none' }}
        className="gradient-text"
        whileHover={{ scale: 1.05 }}
      >
        SD
      </motion.a>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
        {navLinks.map((link) => (
          <motion.button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === link.href ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'inherit',
              padding: '4px 0',
              position: 'relative',
            }}
            whileHover={{ color: '#3B82F6' }}
          >
            {link.label}
            {activeSection === link.href && (
              <motion.div
                layoutId="activeNav"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--gradient-primary)',
                  borderRadius: 1,
                }}
              />
            )}
          </motion.button>
        ))}
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ThemeToggle />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '1.3rem',
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 70,
              right: 0,
              bottom: 0,
              width: '70%',
              maxWidth: 300,
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-color)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              backdropFilter: 'blur(16px)',
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === link.href ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
