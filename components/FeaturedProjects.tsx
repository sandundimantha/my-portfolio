'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { projects, Project } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';
import ProjectModal from './ProjectModal';
import Image from 'next/image';
import { useState } from 'react';

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.filter(p => p.featured);

  return (
    <section id="featured-projects" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Featured Projects</h2>
            <p className="section-subtitle mx-auto">Handpicked projects showcasing my best work</p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((project, i) => (
            <SectionWrapper key={project.id} delay={0.15 * i}>
              <motion.div
                className="glass-card overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative w-full" style={{ height: 200 }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, rgba(2,6,23,0.8))' }} />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-sm"
                          style={{ color: 'var(--primary)' }}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--primary)' }}>
                      View Details <FaArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </SectionWrapper>
          ))}
        </div>

        <SectionWrapper delay={0.5}>
          <div className="text-center mt-12">
            <a href="#all-projects" className="btn-outline">
              View All Projects <FaArrowRight />
            </a>
          </div>
        </SectionWrapper>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
