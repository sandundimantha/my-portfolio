'use client';
import { motion } from 'framer-motion';
import { techStack } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

export default function TechStack() {
  return (
    <section id="tech-stack" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="section-title gradient-text">Technologies I Work With</h2>
            <p className="section-subtitle mx-auto">My go-to tools and technologies for building modern applications</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {techStack.map((tech, i) => (
            <SectionWrapper key={tech.name} delay={0.05 * i}>
              <motion.div
                className="glass-card flex flex-col items-center gap-3 cursor-pointer"
                style={{ padding: '24px' }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 0 30px ${tech.color}33`,
                }}
              >
                <motion.div
                  style={{ fontSize: '2.5rem', color: tech.color }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <tech.icon />
                </motion.div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {tech.name}
                </span>
              </motion.div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
