'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { commandPaletteItems } from '@/data/portfolio-data';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return commandPaletteItems;
    return commandPaletteItems.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Group by section
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(item => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });
    return groups;
  }, [filtered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      navigate(filtered[activeIndex].href);
    }
  };

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5">
              <FaSearch style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search sections, projects, certificates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ borderBottom: 'none', padding: '16px 0' }}
              />
              <kbd className="text-xs px-2 py-1 rounded" style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                flexShrink: 0,
              }}>ESC</kbd>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', maxHeight: 300, overflowY: 'auto' }}>
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <div className="command-section-label">{section}</div>
                  {items.map((item) => {
                    const currentIndex = flatIndex++;
                    return (
                      <div
                        key={item.label + item.href}
                        className={`command-item ${currentIndex === activeIndex ? 'active' : ''}`}
                        onClick={() => navigate(item.href)}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                      >
                        <FaArrowRight size={10} />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
