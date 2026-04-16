'use client';

import { useEffect, useState } from 'react';

const projects = [
  {
    name: 'Augmento',
    url: 'https://augmento.com',
    thumb: '/projects/augmento.jpg',
    tagline: 'Immersive 3D/AR experiences',
    hero: true,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    name: 'LFGO.ai',
    url: 'https://lfgo.ai',
    thumb: '/projects/lfgo.jpg',
    tagline: 'AI-powered platform',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2332 100%)',
  },
  {
    name: 'Uncover',
    url: 'https://uncover.cards',
    thumb: '/projects/uncover.jpg',
    tagline: 'Digital card experiences',
    gradient: 'linear-gradient(135deg, #1a1520 0%, #2d1b3d 50%, #1a1520 100%)',
  },
  {
    name: 'NoChaos',
    url: 'https://nochaos.app',
    thumb: '/projects/nochaos.jpg',
    tagline: 'Workflow management',
    gradient: 'linear-gradient(135deg, #0f1923 0%, #152238 50%, #0f1923 100%)',
  },
  {
    name: 'Nomda',
    url: 'https://nomdatracker.io',
    thumb: '/projects/nomda.jpg',
    tagline: 'Tracking & analytics',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
  },
  {
    name: 'Beaco',
    url: 'https://beaco.app',
    thumb: '/projects/beaco.jpg',
    tagline: 'Smart beacon platform',
    gradient: 'linear-gradient(135deg, #0f1a15 0%, #1a2f25 50%, #0f1a15 100%)',
  },
];

export default function ProjectCards() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  const heroProject = projects[0];
  const smallProjects = projects.slice(1);

  return (
    <div
      className="absolute z-[3] hidden lg:flex flex-col"
      style={{
        right: '4vw',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(280px, 22vw, 340px)',
        gap: 10,
      }}
    >
      {/* Section label */}
      <p
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: 4,
          paddingLeft: 2,
        }}
      >
        My Creations
      </p>

      {/* Augmento - Hero card */}
      <a
        href={heroProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card"
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          textDecoration: 'none',
          cursor: 'none',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: heroProject.gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={heroProject.thumb}
            alt={heroProject.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85,
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        {/* Bottom gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 65%)',
          }}
        />
        {/* Label */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              {heroProject.name}
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.04em',
              marginTop: 3,
            }}>
              {heroProject.tagline}
            </p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </a>

      {/* Smaller cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {smallProjects.map((project, i) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{
              position: 'relative',
              display: 'block',
              aspectRatio: '4 / 3',
              borderRadius: 11,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
              cursor: 'none',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.45s ease ${0.2 + i * 0.07}s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.07}s, border-color 0.35s ease, box-shadow 0.35s ease`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: project.gradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <img
                src={project.thumb}
                alt={project.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.8,
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            {/* Bottom gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 50%, transparent 70%)',
              }}
            />
            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.88)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}>
                  {project.name}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.52rem',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.03em',
                  marginTop: 2,
                }}>
                  {project.tagline}
                </p>
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
