'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { projects, projectTags, Project } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';
import ProjectModal from './ProjectModal';
import Image from 'next/image';
import { useState } from 'react';

export default function AllProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = projects.filter(p => {
    const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <section id="all-projects" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="section-title gradient-text">All Projects</h2>
            <p className="section-subtitle mx-auto">Browse my complete project portfolio</p>
          </div>
        </SectionWrapper>

        {/* Search + Filter */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '16px', marginBottom: '32px' }}>
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-card-static"
                style={{
                  padding: '10px 16px 10px 36px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {projectTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: '1px solid',
                    borderColor: activeTag === tag ? 'var(--primary)' : 'var(--border-color)',
                    background: activeTag === tag ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeTag === tag ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.05 * i }}
            >
              <motion.div
                className="glass-card overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative w-full" style={{ height: 160 }}>
                  <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, rgba(2,6,23,0.8))' }} />
                </div>
                <div className="flex-1 flex flex-col" style={{ padding: '20px' }}>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                  <p className="text-sm mb-3 flex-1" style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-secondary)' }}>
                        <FaGithub />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--primary)' }}>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--text-secondary)' }}>No projects found matching your search.</p>
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
