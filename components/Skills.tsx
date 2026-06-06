'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

function SkillBar({ name, level, icon: Icon, delay }: { name: string; level: number; icon: React.ComponentType; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--primary)', fontSize: '0.9rem' }}><Icon /></span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Skills & Expertise</h2>
            <p className="section-subtitle mx-auto">Technologies and tools I use to bring ideas to life</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <SectionWrapper key={category.title} delay={0.1 * catIndex}>
              <div className="glass-card-static p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'var(--primary)',
                      fontSize: '1.1rem',
                    }}
                  >
                    <category.icon />
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {category.title}
                  </h3>
                </div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    delay={0.1 * skillIndex}
                  />
                ))}
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
