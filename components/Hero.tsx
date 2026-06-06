'use client';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaEnvelope } from 'react-icons/fa';
import { personalInfo, floatingBadges } from '@/data/portfolio-data';
import TypeWriter from './TypeWriter';
import SectionWrapper from './SectionWrapper';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [resumeError, setResumeError] = useState(false);

  const handleResumeDownload = () => {
    const resumePath = '/resume/Sandun_Dimantha_Resume_Updated.pdf';
    fetch(resumePath, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          const a = document.createElement('a');
          a.href = resumePath;
          a.download = 'Sandun_Dimantha_Resume.pdf';
          a.click();
        } else {
          setResumeError(true);
          setTimeout(() => setResumeError(false), 3000);
        }
      })
      .catch(() => {
        setResumeError(true);
        setTimeout(() => setResumeError(false), 3000);
      });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ paddingTop: 70 }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute" style={{
          top: '10%', left: '10%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
        <div className="absolute" style={{
          bottom: '10%', right: '10%', width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <SectionWrapper>
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: 'var(--text-secondary)' }}
                className="text-lg mb-2 font-medium"
              >
                Hi, I&apos;m
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-4"
              >
                <span className="gradient-text">{personalInfo.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: 'var(--text-secondary)' }}
                className="text-xl mb-2"
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
                className="text-base mb-6"
              >
                {personalInfo.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-semibold mb-8"
                style={{ minHeight: 40 }}
              >
                <TypeWriter texts={personalInfo.typingTexts} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <button onClick={handleResumeDownload} className="btn-primary">
                  <FaDownload /> Download Resume
                </button>
                <a href="#featured-projects" className="btn-outline">
                  <FaEye /> View Projects
                </a>
                <a href="#contact" className="btn-outline">
                  <FaEnvelope /> Contact Me
                </a>
              </motion.div>

              {resumeError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="toast toast-info"
                  style={{ position: 'relative', bottom: 'auto', right: 'auto', marginTop: 16 }}
                >
                  📄 Resume coming soon!
                </motion.div>
              )}
            </div>
          </SectionWrapper>

          {/* Profile Image + Floating Badges */}
          <SectionWrapper delay={0.3}>
            <div className="relative flex justify-center">
              <motion.div
                className="float-animation running-light-card"
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Sandun Dimantha"
                  width={280}
                  height={280}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  priority
                />
              </motion.div>

              {/* Floating Badges */}
              {floatingBadges.map((badge, index) => {
                const positions: Record<string, string>[] = [
                  { top: '-10%', left: '5%' },
                  { top: '5%', right: '-5%' },
                  { top: '40%', right: '-15%' },
                  { bottom: '5%', right: '0%' },
                  { bottom: '-5%', left: '10%' },
                  { top: '35%', left: '-15%' },
                  { top: '-18%', right: '35%' },
                  { bottom: '-18%', right: '35%' },
                ];
                return (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="glass-card-static float-delayed hidden md:flex"
                    style={{
                      position: 'absolute',
                      ...positions[index],
                      padding: '8px 14px',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      animationDelay: `${index * 0.5}s`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <badge.icon style={{ color: badge.color }} />
                    {badge.name}
                  </motion.div>
                );
              })}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
