'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { personalInfo } from '@/data/portfolio-data';
import SectionWrapper from './SectionWrapper';
import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

const languageColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Java: '#ED8B00',
  Kotlin: '#7F52FF',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  PHP: '#777BB4',
  'C#': '#239120',
  Shell: '#89E051',
};

function SkeletonCard() {
  return (
    <div className="glass-card-static flex flex-col justify-between" style={{ padding: '26px', height: 220 }}>
      <div>
        <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 12, width: '90%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 12, width: '80%' }} />
      </div>
      <div className="flex gap-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="skeleton" style={{ height: 14, width: 60 }} />
        <div className="skeleton" style={{ height: 14, width: 40 }} />
      </div>
    </div>
  );
}

export default function GitHub() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<GitHubRepo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repoLanguages, setRepoLanguages] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const username = personalInfo.githubUsername;
        // Fetch User profile stats
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('API error');
        const userData = await userRes.json();
        setUser(userData);

        // Fetch all repositories to sort/filter pinned-like repos real-time
        let allRepos: GitHubRepo[] = [];
        let page = 1;
        let fetchMore = true;

        while (fetchMore && page <= 3) { // fetch up to 90 repos to stay safe with rate limits
          const reposRes = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&page=${page}`
          );
          if (!reposRes.ok) break;
          const pageData = await reposRes.json();
          if (pageData.length === 0) {
            fetchMore = false;
          } else {
            allRepos = [...allRepos, ...pageData];
            page++;
          }
        }

        // Try to fetch pinned repositories using a popular open source github-pinned-API endpoint
        let pins: GitHubRepo[] = [];
        try {
          const pinRes = await fetch(`https://github-pinned-limits.vercel.app/api/pinned?username=${username}`);
          if (pinRes.ok) {
            const pinData = await pinRes.json();
            if (Array.isArray(pinData) && pinData.length > 0) {
              pins = pinData.map((p: any) => ({
                name: p.repo,
                description: p.description,
                html_url: p.link,
                stargazers_count: parseInt(p.stars) || 0,
                forks_count: parseInt(p.forks) || 0,
                language: p.language,
                fork: false,
              }));
            }
          }
        } catch (e) {
          console.warn("Failed fetching official pins, falling back to star-based pinning", e);
        }

        // Fallback or override: Match against actual user pinned repos by name
        // We ensure that your actual pinned repo names match correctly
        const pinnedRepoNames = [
          'my-portfolio',
          'test-3d-portfolio',
          'IT23827080-ITPM-Assignment-01',
          'it3030-paf-2026-smart-campus-group54',
          'it3030-paf-2026-smart-campus-IT23827080',
          'it3030-paf-2026-smart-campus-group55'
        ];

        // Predefined beautiful descriptions for your repositories to avoid fetching raw README lines
        const repoDescriptions: Record<string, string> = {
          'my-portfolio': 'A modern, interactive Full Stack Developer portfolio built using Next.js 15, Framer Motion, and Tailwind CSS.',
          'test-3d-portfolio': 'An experimental developer portfolio project utilizing 3D assets and responsive styling options.',
          'IT23827080-ITPM-Assignment-01': 'Automated Transliteration Accuracy Testing for a Singlish-to-Sinhala Chat Translator using Playwright.',
          'it3030-paf-2026-smart-campus-group54': 'A Smart Campus facility booking management platform built as a PAF group assignment.',
          'it3030-paf-2026-smart-campus-it23827080': 'Facility operations hub designed with Spring Boot REST API backend and React frontend.',
          'it3030-paf-2026-smart-campus-group55': 'Smart Campus Operations Hub for room bookings, maintenance ticket creation, and notifications.',
        };

        // Find repositories that match these names exactly from all public repos
        const matchedPins = allRepos.filter(r => 
          pinnedRepoNames.some(name => r.name.toLowerCase() === name.toLowerCase())
        );

        if (matchedPins.length > 0) {
          // Sort them according to the preference order defined above and map custom clean descriptions
          pins = matchedPins.sort((a, b) => {
            const indexA = pinnedRepoNames.findIndex(name => a.name.toLowerCase() === name.toLowerCase());
            const indexB = pinnedRepoNames.findIndex(name => b.name.toLowerCase() === name.toLowerCase());
            return indexA - indexB;
          }).map(r => ({
            ...r,
            description: repoDescriptions[r.name.toLowerCase()] || r.description || 'No description provided.'
          }));
        } else if (pins.length === 0) {
          pins = [...allRepos]
            .filter(r => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
            .map(r => ({
              ...r,
              description: repoDescriptions[r.name.toLowerCase()] || r.description || 'No description provided.'
            }));
        }

        setPinnedRepos(pins);
        // Save full repo lists and map custom descriptions
        setRepos(allRepos.filter(r => !r.fork).map(r => ({
          ...r,
          description: repoDescriptions[r.name.toLowerCase()] || r.description || 'No description provided.'
        })));

        // Fetch languages for all displayed pins to show breakdown inside each box
        const langDataMap: Record<string, Record<string, number>> = {};
        const defaultPinnedLangs: Record<string, Record<string, number>> = {
          'my-portfolio': { TypeScript: 76, JavaScript: 20, CSS: 4 },
          'test-3d-portfolio': { JavaScript: 88, CSS: 9, HTML: 3 },
          'it23827080-itpm-assignment-01': { Python: 100 },
          'it3030-paf-2026-smart-campus-group54': { Java: 60, JavaScript: 35, HTML: 5 },
          'it3030-paf-2026-smart-campus-it23827080': { Java: 65, TypeScript: 30, HTML: 5 },
          'it3030-paf-2026-smart-campus-group55': { Java: 58, TypeScript: 32, HTML: 10 }
        };

        // Initialize with default fallback values
        Object.keys(defaultPinnedLangs).forEach(key => {
          langDataMap[key] = defaultPinnedLangs[key];
        });

        // Try to fetch dynamically for pins
        for (const repo of pins) {
          try {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
            if (res.ok) {
              const data = await res.json();
              const total = Object.values(data).reduce((a: any, b: any) => a + b, 0) as number;
              if (total > 0) {
                const pctMap: Record<string, number> = {};
                Object.entries(data).forEach(([lang, val]) => {
                  pctMap[lang] = Math.round(((val as number) / total) * 100);
                });
                langDataMap[repo.name.toLowerCase()] = pctMap;
              }
            }
          } catch (e) {
            console.warn(`Could not fetch languages for ${repo.name}`, e);
          }
        }
        setRepoLanguages(langDataMap);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate languages from all repos
  const languageCounts: Record<string, number> = {};
  repos.forEach(r => {
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  });
  const totalLangs = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  const displayedRepos = showAll ? repos : pinnedRepos;

  return (
    <section id="github" className="section">
      <div className="section-container">
        <SectionWrapper>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="section-title gradient-text">Top Repositories</h2>
            <p className="section-subtitle mx-auto">My open-source contributions and real-time repositories</p>
          </div>
        </SectionWrapper>

        {error ? (
          <SectionWrapper>
            <div className="glass-card-static p-8 text-center">
              <FaGithub style={{ fontSize: '3rem', color: 'var(--text-secondary)', marginBottom: 16, margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Unable to load GitHub data. Visit my profile directly:</p>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>
                <FaGithub /> View GitHub Profile
              </a>
            </div>
          </SectionWrapper>
        ) : (
          <>
            {/* Stats Row */}
            <SectionWrapper delay={0.1}>
              <div className="grid grid-cols-3" style={{ marginBottom: '40px', gap: '16px' }}>
                {loading ? (
                  <>  
                    <div className="glass-card-static text-center" style={{ padding: '20px' }}><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                    <div className="glass-card-static text-center" style={{ padding: '20px' }}><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                    <div className="glass-card-static text-center" style={{ padding: '20px' }}><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                  </>
                ) : user && (
                  <>
                    <motion.div className="glass-card text-center" whileHover={{ scale: 1.03 }} style={{ padding: '20px' }}>
                      <p className="text-3xl font-bold gradient-text">{user.public_repos}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Repositories</p>
                    </motion.div>
                    <motion.div className="glass-card text-center" whileHover={{ scale: 1.03 }} style={{ padding: '20px' }}>
                      <p className="text-3xl font-bold gradient-text">{user.followers}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Followers</p>
                    </motion.div>
                    <motion.div className="glass-card text-center" whileHover={{ scale: 1.03 }} style={{ padding: '20px' }}>
                      <p className="text-3xl font-bold gradient-text">{user.following}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Following</p>
                    </motion.div>
                  </>
                )}
              </div>
            </SectionWrapper>

            {/* Contribution Calendar */}
            <SectionWrapper delay={0.2}>
              <div className="glass-card-static overflow-x-auto" style={{ padding: '24px', marginBottom: '40px' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Contribution Graph</h3>
                {mounted ? (
                  <GitHubCalendar
                    username={personalInfo.githubUsername}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={13}
                  />
                ) : (
                  <div className="skeleton" style={{ height: 120, width: '100%' }} />
                )}
              </div>
            </SectionWrapper>

            {/* Language Breakdown */}
            {totalLangs > 0 && (
              <SectionWrapper delay={0.25}>
                <div className="glass-card-static" style={{ padding: '32px', marginBottom: '40px' }}>
                  <h3 className="font-semibold text-lg mb-6 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                    Languages Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px 32px' }}>
                    {Object.entries(languageCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([lang, count]) => {
                        const percentage = ((count / totalLangs) * 100).toFixed(0);
                        const color = languageColors[lang] || '#6B7280';
                        return (
                          <div key={lang} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm font-medium">
                              <span className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block' }} />
                                {lang}
                              </span>
                              <span style={{ color: 'var(--text-secondary)' }}>{percentage}%</span>
                            </div>
                            <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* Top Repos */}
            <SectionWrapper delay={0.3}>
              <h3 className="font-semibold text-lg mb-6 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                {showAll ? 'All Repositories' : 'Pinned Repositories'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  displayedRepos.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="running-light-card flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * (i % 6) }}
                      style={{ textDecoration: 'none', minHeight: 220, padding: '26px' }}
                    >
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-base tracking-wide" style={{ color: 'var(--text-primary)', lineBreak: 'anywhere' }}>
                          <FaCodeBranch style={{ color: 'var(--primary)', fontSize: '0.9rem', flexShrink: 0 }} />
                          {repo.name}
                        </h4>
                        {(() => {
                          const langs = repoLanguages[repo.name.toLowerCase()] || (repo.language ? { [repo.language]: 100 } : null);
                          if (!langs) return null;
                          const entries = Object.entries(langs).sort((a, b) => b[1] - a[1]);
                          return (
                            <div className="mt-4 flex flex-col gap-3">
                              {entries.map(([lang, pct]) => {
                                const color = languageColors[lang] || '#6B7280';
                                return (
                                  <div key={lang} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
                                        {lang}
                                      </span>
                                      <span style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>{pct}%</span>
                                    </div>
                                    <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-1 overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{ width: `${pct}%`, background: color }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex items-center gap-4 text-xs mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1"><FaStar /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><FaCodeBranch /> {repo.forks_count}</span>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>
            </SectionWrapper>

            {/* Toggle Show All option */}
            {!loading && repos.length > 0 && (
              <SectionWrapper delay={0.35}>
                <div className="text-center" style={{ marginTop: '32px' }}>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="btn-outline"
                    style={{ gap: 8 }}
                  >
                    {showAll ? (
                      <>
                        Show Pinned Repositories <FaChevronUp />
                      </>
                    ) : (
                      <>
                        See All Repositories ({repos.length}) <FaChevronDown />
                      </>
                    )}
                  </button>
                </div>
              </SectionWrapper>
            )}

            {/* Profile Link */}
            <SectionWrapper delay={0.4}>
              <div className="text-center" style={{ marginTop: '24px' }}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FaGithub /> View Full GitHub Profile
                </a>
              </div>
            </SectionWrapper>
          </>
        )}
      </div>
    </section>
  );
}

