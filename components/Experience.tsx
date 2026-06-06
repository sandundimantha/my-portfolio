'use client';
import { motion } from 'framer-motion';
import { experiences } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Experience</h2>
            <p className="section-subtitle mx-auto">My journey in software development so far</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <SectionWrapper key={exp.type} delay={0.15 * i}>
              <motion.div
                className="glass-card p-6 h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--primary)',
                    fontSize: '1.3rem',
                  }}
                >
                  <exp.icon />
                </div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                  {exp.type}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--primary)' }}>
                  {exp.period}
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span key={h} className="tech-tag">{h}</span>
                  ))}
                </div>
              </motion.div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
