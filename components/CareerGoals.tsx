'use client';
import { motion } from 'framer-motion';
import { careerGoals } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

export default function CareerGoals() {
  return (
    <section id="career-goals" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">My Career Goals</h2>
            <p className="section-subtitle mx-auto">Where I&apos;m headed in my career journey</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerGoals.map((goal, i) => (
            <SectionWrapper key={goal.title} delay={0.1 * i}>
              <motion.div
                className="glass-card p-6 text-center h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="mx-auto mb-4 flex items-center justify-center"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--primary)',
                    fontSize: '1.5rem',
                  }}
                >
                  <goal.icon />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {goal.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {goal.description}
                </p>
              </motion.div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
