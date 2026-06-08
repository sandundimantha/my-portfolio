'use client';
import { motion } from 'framer-motion';
import { achievementBadges } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';

export default function AchievementBadges() {
  return (
    <section id="achievements" className="py-12">
      <div className="section-container">
        <SectionWrapper>
          <div className="flex flex-wrap justify-center gap-4">
            {achievementBadges.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px ${badge.color}33`,
                }}
                className="glass-card-static flex items-center gap-3 cursor-default"
                style={{ padding: '12px 20px' }}
              >
                <badge.icon style={{ color: badge.color, fontSize: '1.3rem' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {badge.title}
                </span>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
