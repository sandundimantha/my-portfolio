'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import SocialSidebar from '@/components/SocialSidebar';
import BackToTop from '@/components/BackToTop';
import CommandPalette from '@/components/CommandPalette';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CareerGoals from '@/components/CareerGoals';
import TechStack from '@/components/TechStack';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import FeaturedProjects from '@/components/FeaturedProjects';
import Certificates from '@/components/Certificates';
import AchievementBadges from '@/components/AchievementBadges';
import GitHub from '@/components/GitHub';
import Education from '@/components/Education';
import AllProjects from '@/components/AllProjects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CommandPalette />

      {loaded && (
        <>
          <Navbar />
          <SocialSidebar />
          <BackToTop />

          <main>
            <Hero />
            <About />
            <CareerGoals />
            <TechStack />
            <Skills />
            <Experience />
            <FeaturedProjects />
            <Certificates />
            <AchievementBadges />
            <GitHub />
            <Education />
            <AllProjects />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
