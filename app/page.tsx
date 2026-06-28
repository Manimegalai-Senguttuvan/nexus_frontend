"use client";

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DashboardSection from '@/components/sections/DashboardSection';
import AIChatSection from '@/components/sections/AIChatSection';
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import CursorGlow from '@/components/effects/CursorGlow';
import ParticleNetwork from '@/components/effects/ParticleNetwork';
import ScrollProgress from '@/components/effects/ScrollProgress';
import AnimatedBackground from '@/components/effects/AnimatedBackground';
import FloatingOrbs from '@/components/effects/FloatingOrbs';
import MorphingBackground from '@/components/effects/MorphingBackground';
import PeekRobot from '@/components/effects/PeekRobot';
import ScrollReveal from '@/components/effects/ScrollReveal';

export default function Home() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <main className="relative min-h-screen bg-nexus-dark overflow-hidden">
      {/* Background Effects */}
      <AnimatedBackground />
      <ParticleNetwork />
      <CursorGlow />
      <ScrollProgress />
      <FloatingOrbs />
      <MorphingBackground />

      {/* 3D Robot peeking from left border */}
      <PeekRobot />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-50" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ScrollReveal direction="left">
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <DashboardSection />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <AIChatSection />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <AnalyticsSection />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <PricingSection />
        </ScrollReveal>
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
