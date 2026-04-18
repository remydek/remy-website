'use client';

import { useEffect, useState } from 'react';
import CardSwap, { Card } from './CardSwap';

const projects = [
  {
    name: 'Augmento',
    url: 'https://augmento.com',
    thumb: '/augmento.jpg',
    tagline: 'Immersive 3D/AR experiences',
  },
  {
    name: 'LFGO.ai',
    url: 'https://lfgo.ai',
    thumb: '/projects/lfgo.jpg',
    tagline: 'AI-powered platform',
  },
  {
    name: 'Nomadtracker',
    url: 'https://nomdatracker.io',
    thumb: '/nomadtracker-og.jpg',
    tagline: 'Tracking & analytics',
  },
  {
    name: 'Beaco',
    url: 'https://beaco.app',
    thumb: '/projects/beaco.jpg',
    tagline: 'Smart beacon platform',
  },
];

export default function ProjectCards() {
  const [animate, setAnimate] = useState(false);
  const [vw, setVw] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    const timeout = setTimeout(() => setAnimate(true), 800);
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(timeout);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    const project = projects[idx];
    if (project) window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  // Fluid card dimensions: linearly scale between tablet and large desktop
  // Mobile (<768px) is hidden via .project-stack CSS class.
  const w = vw ?? 1440;
  const cardWidth = Math.round(Math.max(440, Math.min(702, w * 0.46)));
  const cardHeight = Math.round(cardWidth * 0.667);
  const cardDistance = Math.round(cardWidth * 0.118);
  const verticalDistance = Math.round(cardWidth * 0.137);
  // Container needs to be larger than cards because CardSwap offsets them via translate
  const containerWidth = Math.round(cardWidth + cardDistance * 3 + 40);
  const containerHeight = Math.round(cardHeight + verticalDistance * 3 + 80);

  return (
    <div
      className="project-stack absolute z-[6] pointer-events-none"
      style={{
        right: 0,
        bottom: 0,
        width: containerWidth,
        height: containerHeight,
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="pointer-events-auto">
        <CardSwap
          width={cardWidth}
          height={cardHeight}
          cardDistance={cardDistance}
          verticalDistance={verticalDistance}
          delay={5000}
          pauseOnHover={true}
          skewAmount={4}
          easing="linear"
          onCardClick={handleCardClick}
        >
          {projects.map((project) => (
            <Card
              key={project.name}
              customClass="cursor-none"
              style={{ cursor: 'none' }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#0a0a0a',
                }}
              >
                <img
                  src={project.thumb}
                  alt={project.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9,
                  }}
                />
              </div>

              {/* Top bar — small meta */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(12px, 1.5vw, 18px) clamp(16px, 2vw, 24px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.65rem, 1vw, 0.86rem)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'rgba(97, 220, 163, 0.9)',
                    boxShadow: '0 0 8px rgba(97, 220, 163, 0.5)',
                  }} />
                  Live
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              {/* Bottom gradient + label */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(18px, 2vw, 26px) clamp(20px, 2.5vw, 32px)',
                }}
              >
                <p style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.35rem, 2.4vw, 1.95rem)',
                  color: 'rgba(255,255,255,0.96)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}>
                  {project.name}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(0.78rem, 1.2vw, 1rem)',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.04em',
                  marginTop: 8,
                }}>
                  {project.tagline}
                </p>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
