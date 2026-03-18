'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import Noise from '@/components/Noise';
import CurvedLoop from '@/components/CurvedLoop';
import ContactModal from '@/components/ContactModal';

const CursorModel = dynamic(() => import('@/components/CursorModel'), { ssr: false });

export default function Home() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const curvedRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const els = [nameRef, taglineRef, dividerRef, subRef, buttonsRef, bottomRef, curvedRef];
    els.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0, y: 30 });
    });
    if (dividerRef.current) gsap.set(dividerRef.current, { opacity: 0, width: 0, y: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(dividerRef.current, { opacity: 1, width: 48, duration: 0.6 }, '-=0.4')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(curvedRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.5');

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px';
        cursorDotRef.current.style.top = e.clientY + 'px';
      }
    };

    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
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

      {/* Main Content - padded */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-center" style={{ padding: '6vh 8vw' }}>
        <h1
          ref={nameRef}
          className="font-[Rubik] font-bold text-white leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
        >
          REMY<br />DE KLEIN
        </h1>

        <p
          ref={taglineRef}
          className="font-[Inter] font-light tracking-[0.12em] uppercase"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)', marginTop: '1.5rem', color: 'rgba(255,255,255,0.55)' }}
        >
          Founder / Builder / Creative Director
        </p>

        <div
          ref={dividerRef}
          className="bg-white/25"
          style={{ height: '1px', marginTop: '2rem' }}
        />

        <p
          ref={subRef}
          className="font-[Inter] font-normal"
          style={{ fontSize: 'clamp(0.8rem, 1.1vw, 1rem)', marginTop: '1.5rem', lineHeight: 1.8, maxWidth: '400px', color: 'rgba(255,255,255,0.45)' }}
        >
          Building immersive experiences for the world&apos;s most ambitious brands. Co-Founder of Augmento.
        </p>
      </div>

      {/* Glass Buttons — top-right, horizontal row, inside border */}
      <div
        ref={buttonsRef}
        className="absolute z-[3] flex flex-row items-center"
        style={{ right: 'calc(4% + 2rem)', top: 'calc(4% + 1.5rem)', gap: '1rem' }}
      >
        {[
          { href: 'https://augmento.com', icon: 'hgi-globe-02', label: 'Augmento.com', hoverColor: '#6849FC' },
          { href: 'https://linkedin.com/in/remydeklein', icon: 'hgi-linkedin-02', label: 'LinkedIn', hoverColor: '#0A66C2' },
          { href: '#', icon: 'hgi-mail-02', label: "Let's talk", arrow: true, hoverColor: '#ffffff', isModal: true },
        ].map((btn) =>
          btn.isModal ? (
            <button
              key={btn.label}
              onClick={() => setModalOpen(true)}
              className="glass-btn"
              style={{ '--hover-color': btn.hoverColor } as React.CSSProperties}
            >
              <i className={`hgi hgi-bulk-rounded ${btn.icon}`} style={{ fontSize: '1.1rem' }} />
              {btn.label}
              <svg style={{ width: 16, height: 16, marginLeft: 4 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          ) : (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={{ '--hover-color': btn.hoverColor } as React.CSSProperties}
            >
              <i className={`hgi hgi-bulk-rounded ${btn.icon}`} style={{ fontSize: '1.1rem' }} />
              {btn.label}
            </a>
          )
        )}
      </div>

      {/* Curved Loop Text - seamless edge to edge, no padding */}
      <div ref={curvedRef} className="absolute bottom-[80px] left-0 right-0 z-[3]">
        <CurvedLoop
          marqueeText="FOUNDER ✦ BUILDER ✦ CLOSER ✦ AUGMENTO ✦ DUBAI ✦ IMMERSIVE ✦ EXPERIENCES ✦"
          speed={1.5}
          curveAmount={200}
          direction="left"
          interactive
          className="text-white/10"
        />
      </div>

      {/* Bottom Bar - inside border */}
      <div
        ref={bottomRef}
        className="absolute z-[4] flex justify-end items-center"
        style={{ bottom: 'calc(4% + 1.5rem)', right: 'calc(4% + 2rem)' }}
      >
        <div className="font-[Inter] font-light text-[0.75rem] text-white/30 tracking-[0.15em] uppercase flex items-center gap-2">
          <span className="w-[5px] h-[5px] rounded-full bg-green-400" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
          Dubai, UAE
        </div>
      </div>

      {/* 3D Cursor Model — hidden when modal open */}
      {!modalOpen && <CursorModel />}

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
      />

      {/* Custom Cursor Dot — always visible */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 0 6px rgba(255,255,255,0.4)',
          left: '-100px',
          top: '-100px',
        }}
      />

      {/* Animated Gradient Border */}
      <div
        className="fixed z-[50] pointer-events-none animated-border"
        style={{ inset: '4%' }}
      />

      {/* Contact Modal */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
