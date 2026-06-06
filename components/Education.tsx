'use client';
import { motion } from 'framer-motion';
import { educationTimeline } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Education & Journey</h2>
            <p className="section-subtitle mx-auto">My academic and professional timeline</p>
          </div>
        </SectionWrapper>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="timeline-line" />

          {educationTimeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <SectionWrapper key={i} delay={0.15 * i}>
                <div
                  className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ gap: 24 }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <motion.div
                      className="glass-card p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{item.year}</span>
                      <h3 className="font-bold text-lg mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div
                    className="absolute md:relative flex items-center justify-center"
                    style={{
                      left: 'calc(20px - 16px)',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      zIndex: 2,
                      flexShrink: 0,
                    }}
                  >
                    <item.icon style={{ color: 'white', fontSize: '0.8rem' }} />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </SectionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
