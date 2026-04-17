'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Noise from '@/components/Noise';
import CurvedLoop from '@/components/CurvedLoop';
import LetterGlitch from '@/components/LetterGlitch';
import ContactModal from '@/components/ContactModal';
import ProjectCards from '@/components/ProjectCards';

const CursorModel = dynamic(() => import('@/components/CursorModel'), { ssr: false });

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/remy-bg-optimized.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-[center_15%] brightness-[0.85]"
        style={{ animation: 'photoIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', transform: 'scale(1.08)' }}
      />

      {/* LetterGlitch overlay — subtle texture only */}
      <div className="absolute inset-0 z-[0]" style={{ mixBlendMode: 'overlay', opacity: 0.22 }}>
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={80}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(100deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 25%, rgba(5,5,5,0.15) 55%, transparent 75%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 25%, transparent 50%)',
        }}
      />

      {/* Noise Overlay */}
      <Noise
        patternSize={500}
        patternScaleX={4.7}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={25}
      />

      {/* Main Content — left hero column */}
      <div
        className="absolute inset-y-0 left-0 z-[7] flex flex-col justify-center pointer-events-none"
        style={{
          padding: 'clamp(2rem, 6vh, 4rem) clamp(2rem, 5vw, 4.5rem)',
          width: 'min(54vw, 640px)',
          gap: 0,
        }}
      >
        {/* Claude Code Expert Badge */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              color: '#E08B3B',
              padding: '0.45rem 0.95rem 0.45rem 0.65rem',
              borderRadius: 999,
              border: '1px solid rgba(224, 139, 59, 0.28)',
              background: 'linear-gradient(135deg, rgba(224, 139, 59, 0.12) 0%, rgba(224, 139, 59, 0.04) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 0 24px rgba(224, 139, 59, 0.1), 0 0 0 1px rgba(224, 139, 59, 0.08) inset',
            }}
          >
            <img src="/claude-color.svg" alt="" width={16} height={16} />
            Claude Code Expert
          </span>
        </div>

        <h1
          className="font-[Rubik] text-white"
          style={{
            fontSize: 'clamp(3.25rem, 6.5vw, 5.5rem)',
            lineHeight: 0.94,
            letterSpacing: '-0.04em',
            fontWeight: 700,
            fontVariationSettings: '"wdth" 92, "opsz" 96',
            marginBottom: '1.5rem',
          }}
        >
          REMY<br />DE KLEIN
        </h1>

        <p
          className="font-[Inter]"
          style={{
            fontSize: '0.78rem',
            fontWeight: 400,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'oklch(85% 0.015 55 / 0.75)',
            marginBottom: '2rem',
          }}
        >
          Founder · Builder · Creative Director
        </p>

        <div
          style={{
            height: '1px',
            width: 56,
            background: 'oklch(78% 0.015 55 / 0.35)',
            marginBottom: '1.5rem',
          }}
        />

        <p
          className="font-[Inter]"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.6,
            maxWidth: '42ch',
            color: 'oklch(90% 0.012 60 / 0.78)',
            fontWeight: 400,
            marginBottom: '2.5rem',
          }}
        >
          Building immersive experiences for the world&apos;s most ambitious brands.
          Co-Founder of Augmento.
        </p>

        {/* Buttons */}
        <div
          className="pointer-events-auto"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
        >
          <a
            href="https://linkedin.com/in/remydeklein"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            <i className="hgi hgi-bulk-rounded hgi-linkedin-02" style={{ fontSize: '1.05rem' }} />
            LinkedIn
          </a>
          <button
            onClick={() => setModalOpen(true)}
            className="glass-btn glass-btn-primary"
          >
            <i className="hgi hgi-bulk-rounded hgi-mail-02" style={{ fontSize: '1.05rem' }} />
            Let&apos;s talk
            <svg style={{ width: 15, height: 15, marginLeft: 2 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* My Creations - right side */}
      <ProjectCards />

      {/* Curved Loop Text — subtle ribbon anchoring the bottom */}
      <div className="absolute bottom-[-8px] left-0 right-0 z-[2] pointer-events-none">
        <CurvedLoop
          marqueeText="FOUNDER ✦ BUILDER ✦ CREATIVE ✦ AUGMENTO ✦ DUBAI ✦ IMMERSIVE 3D/AR EXPERIENCES ✦"
          speed={0.5}
          curveAmount={60}
          direction="left"
          fontSize="1.25rem"
          className="text-white/[0.1]"
        />
      </div>

      {/* Bottom Bar - padded */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[4] flex justify-end items-center"
        style={{ padding: '2rem 8vw' }}
      >
        <div className="font-[Inter] font-light text-[0.75rem] text-white/30 tracking-[0.15em] uppercase flex items-center gap-2">
          <span className="w-[5px] h-[5px] rounded-full bg-green-400" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
          Dubai, UAE
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* 3D Cursor Model */}
      <CursorModel />

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
      />
    </div>
  );
}
