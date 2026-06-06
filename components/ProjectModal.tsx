'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaBullseye, FaLightbulb, FaTools, FaBolt } from 'react-icons/fa';
import { Project } from '@/data/portfolio-data';
import Image from 'next/image';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative w-full" style={{ height: 250, overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 60%, var(--bg-secondary))' }} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 glass-card-static flex items-center justify-center"
                style={{ width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: 'white', border: 'none' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{project.longDescription}</p>

              {/* Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-card-static p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FaBullseye style={{ color: '#EF4444' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Problem</h4>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{project.problem}</p>
                </div>
                <div className="glass-card-static p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FaLightbulb style={{ color: '#F59E0B' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Solution</h4>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{project.solution}</p>
                </div>
                <div className="glass-card-static p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FaTools style={{ color: '#3B82F6' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tech Stack</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="glass-card-static p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FaBolt style={{ color: '#8B5CF6' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Challenges</h4>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{project.challenges}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
