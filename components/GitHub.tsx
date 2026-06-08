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
    <div className="glass-card-static p-6 h-[200px] flex flex-col justify-between">
      <div>
        <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 14, width: '100%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: '60%' }} />
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

        // Find repositories that match these names exactly from all public repos
        const matchedPins = allRepos.filter(r => 
          pinnedRepoNames.some(name => r.name.toLowerCase() === name.toLowerCase())
        );

        if (matchedPins.length > 0) {
          // Sort them according to the preference order defined above
          pins = matchedPins.sort((a, b) => {
            const indexA = pinnedRepoNames.findIndex(name => a.name.toLowerCase() === name.toLowerCase());
            const indexB = pinnedRepoNames.findIndex(name => b.name.toLowerCase() === name.toLowerCase());
            return indexA - indexB;
          });
        } else if (pins.length === 0) {
          pins = [...allRepos]
            .filter(r => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
        }

        setPinnedRepos(pins);
        // Save full repo lists (excluding forks, sorted by updated time)
        setRepos(allRepos.filter(r => !r.fork));
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
          <div className="text-center mb-16">
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
              <div className="grid grid-cols-3 gap-4 mb-10">
                {loading ? (
                  <>  
                    <div className="glass-card-static p-5 text-center"><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                    <div className="glass-card-static p-5 text-center"><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                    <div className="glass-card-static p-5 text-center"><div className="skeleton mx-auto" style={{ height: 32, width: 60, marginBottom: 8 }} /><div className="skeleton mx-auto" style={{ height: 14, width: 80 }} /></div>
                  </>
                ) : user && (
                  <>
                    <motion.div className="glass-card p-5 text-center" whileHover={{ scale: 1.03 }}>
                      <p className="text-3xl font-bold gradient-text">{user.public_repos}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Repositories</p>
                    </motion.div>
                    <motion.div className="glass-card p-5 text-center" whileHover={{ scale: 1.03 }}>
                      <p className="text-3xl font-bold gradient-text">{user.followers}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Followers</p>
                    </motion.div>
                    <motion.div className="glass-card p-5 text-center" whileHover={{ scale: 1.03 }}>
                      <p className="text-3xl font-bold gradient-text">{user.following}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Following</p>
                    </motion.div>
                  </>
                )}
              </div>
            </SectionWrapper>

            {/* Contribution Calendar */}
            <SectionWrapper delay={0.2}>
              <div className="glass-card-static p-6 mb-10 overflow-x-auto">
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
                <div className="glass-card-static p-6 mb-10">
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Most Used Languages</h3>
                  <div className="flex rounded-full overflow-hidden h-3 mb-4">
                    {Object.entries(languageCounts).map(([lang, count]) => (
                      <div
                        key={lang}
                        style={{
                          width: `${(count / totalLangs) * 100}%`,
                          background: languageColors[lang] || '#6B7280',
                          minWidth: 4,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(languageCounts).map(([lang, count]) => (
                      <div key={lang} className="flex items-center gap-2 text-sm">
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: languageColors[lang] || '#6B7280' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{lang}</span>
                        <span style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>{((count / totalLangs) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* Top Repos */}
            <SectionWrapper delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  displayedRepos.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="running-light-card p-6 flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * (i % 6) }}
                      style={{ textDecoration: 'none', minHeight: 200 }}
                    >
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-base tracking-wide" style={{ color: 'var(--text-primary)', lineBreak: 'anywhere' }}>
                          <FaCodeBranch style={{ color: 'var(--primary)', fontSize: '0.9rem', flexShrink: 0 }} />
                          {repo.name}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', opacity: 0.9 }}>
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs mt-auto pt-2 border-t border-[rgba(255,255,255,0.05)]" style={{ color: 'var(--text-secondary)' }}>
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: languageColors[repo.language] || '#6B7280', display: 'inline-block' }} />
                            {repo.language}
                          </span>
                        )}
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
                <div className="text-center mt-8">
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
              <div className="text-center mt-6">
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

