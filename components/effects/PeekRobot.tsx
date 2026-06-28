"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PeekRobot() {
  const robotRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const robot = robotRef.current;
    const eyes = eyesRef.current;
    if (!robot || !eyes) return;

    // Initial state - hidden off-screen left
    gsap.set(robot, { x: '-100%', rotateY: 90 });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Robot peeks in at 15% scroll
    tl.to(robot, {
      x: '0%',
      rotateY: 0,
      duration: 0.2,
      ease: 'power2.out',
    }, 0.15);

    // Eyes blink animation
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    blinkTl.to(eyes, { scaleY: 0.1, duration: 0.1 })
           .to(eyes, { scaleY: 1, duration: 0.1 });

    // Floating animation
    gsap.to(robot, {
      y: '+=15',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Antenna wiggle
    const antenna = robot.querySelector('.antenna');
    if (antenna) {
      gsap.to(antenna, {
        rotation: 10,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      tl.kill();
      blinkTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={robotRef}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Robot Body */}
        <div className="relative w-24 h-32">
          {/* Head */}
          <div className="absolute top-0 left-2 w-20 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-purple-400/30"
               style={{ transform: 'translateZ(20px)' }}>
            {/* Eyes container */}
            <div ref={eyesRef} className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3">
              {/* Left Eye */}
              <div className="w-4 h-4 rounded-full bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.8)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>
              {/* Right Eye */}
              <div className="w-4 h-4 rounded-full bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.8)] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>
            </div>
            {/* Mouth */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Antenna */}
          <div className="antenna absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full origin-bottom"
               style={{ transform: 'translateZ(25px)' }}>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)]" />
          </div>

          {/* Ears */}
          <div className="absolute top-3 -left-2 w-3 h-8 rounded-full bg-gradient-to-b from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(15px)' }} />
          <div className="absolute top-3 -right-2 w-3 h-8 rounded-full bg-gradient-to-b from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(15px)' }} />

          {/* Neck */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-700 rounded-lg"
               style={{ transform: 'translateZ(18px)' }} />

          {/* Body */}
          <div className="absolute top-[72px] left-1 w-[88px] h-20 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-purple-500/20"
               style={{ transform: 'translateZ(10px)' }}>
            {/* Chest Core */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-300 to-transparent opacity-50" />
            </div>
            {/* Chest Lines */}
            <div className="absolute top-14 left-2 right-2 h-px bg-purple-400/30" />
            <div className="absolute top-16 left-3 right-3 h-px bg-purple-400/20" />
          </div>

          {/* Shoulders */}
          <div className="absolute top-[76px] -left-3 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(12px)' }} />
          <div className="absolute top-[76px] -right-3 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(12px)' }} />

          {/* Arms */}
          <div className="absolute top-[88px] -left-1 w-4 h-14 rounded-full bg-gradient-to-b from-slate-600 to-slate-700"
               style={{ transform: 'translateZ(8px) rotate(10deg)' }} />
          <div className="absolute top-[88px] -right-1 w-4 h-14 rounded-full bg-gradient-to-b from-slate-600 to-slate-700"
               style={{ transform: 'translateZ(8px) rotate(-10deg)' }} />

          {/* Hands */}
          <div className="absolute top-[130px] -left-2 w-6 h-5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(10px)' }} />
          <div className="absolute top-[130px] -right-2 w-6 h-5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600"
               style={{ transform: 'translateZ(10px)' }} />

          {/* Glow effect behind */}
          <div className="absolute inset-0 -z-10 blur-xl bg-purple-600/20 rounded-full scale-150" />
        </div>
      </div>
    </div>
  );
}
