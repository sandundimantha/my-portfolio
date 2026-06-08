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
        zIndex: 99999,
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
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '6px 12px', 
          borderRadius: '30px', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }} 
        className="hidden md:flex"
      >
        {navLinks.map((link) => (
          <motion.button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === link.href ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: activeSection === link.href ? 600 : 500,
              fontFamily: 'inherit',
              padding: '6px 14px',
              borderRadius: '20px',
              position: 'relative',
              transition: 'color 0.3s ease',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
            {activeSection === link.href && (
              <motion.div
                layoutId="activeNav"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: '20px',
                  zIndex: 1,
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
                }}
              />
            )}
          </motion.button>
        ))}
        <div style={{ width: '1px', height: '18px', background: 'rgba(255, 255, 255, 0.1)', margin: '0 8px' }} />
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

      {/* Mobile Menu & Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(2, 6, 23, 0.7)',
                backdropFilter: 'blur(12px)',
                zIndex: 99998,
              }}
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: 320,
                background: 'rgba(10, 16, 36, 0.45)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 99999,
              }}
            >
              {/* Drawer Header with Close Icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>SD</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '1.4rem',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: activeSection === link.href ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeSection === link.href ? 'var(--primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      textAlign: 'left',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      borderLeft: activeSection === link.href ? '4px solid var(--primary)' : '4px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.href && (
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        boxShadow: '0 0 10px var(--primary)',
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
