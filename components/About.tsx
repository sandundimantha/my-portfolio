'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { personalInfo } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="gradient-text text-4xl font-bold">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="section-title gradient-text">Who I Am</h2>
            <p className="section-subtitle mx-auto">A passionate developer building the future with code</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SectionWrapper delay={0.1}>
            <div className="glass-card-static" style={{ padding: '32px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                {personalInfo.about}
              </p>
            </div>
          </SectionWrapper>
 
          <SectionWrapper delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-card text-center"
                  style={{ padding: '24px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
