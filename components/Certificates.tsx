'use client';
import { motion } from 'framer-motion';
import { FaCertificate, FaDownload } from 'react-icons/fa';
import { certificates, certificateCategories } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';
import Image from 'next/image';
import { useState } from 'react';

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeCategory);

  return (
    <section id="certificates" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-12">
            <h2 className="section-title gradient-text">Certificates & Achievements</h2>
            <p className="section-subtitle mx-auto">Professional certifications I&apos;ve earned</p>
          </div>
        </SectionWrapper>

        {/* Filter */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {certificateCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border-color)',
                  background: activeCategory === cat ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  color: activeCategory === cat ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionWrapper>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <motion.div
                className="glass-card overflow-hidden h-full flex flex-col"
                whileHover={{ scale: 1.03 }}
              >
                {/* Image or Placeholder */}
                <div className="relative w-full" style={{ height: 140 }}>
                  {cert.image ? (
                    <Image src={cert.image} alt={cert.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'rgba(59, 130, 246, 0.08)' }}
                    >
                      <FaCertificate style={{ fontSize: '3rem', color: 'var(--primary)', opacity: 0.4 }} />
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h4>
                  <p className="text-xs mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {cert.issuer}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="tech-tag" style={{ fontSize: '0.7rem' }}>{cert.category}</span>
                    {cert.file && (
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs"
                        style={{ color: 'var(--primary)' }}
                      >
                        <FaDownload /> View
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
