'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setSent(false);
      // Show normal cursor when modal is open
      document.body.style.cursor = 'auto';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.fromTo(panelRef.current, { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      // Auto-focus email field
      setTimeout(() => emailRef.current?.focus(), 500);
    } else {
      // Restore hidden cursor
      document.body.style.cursor = 'none';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(panelRef.current, { y: 20, opacity: 0, scale: 0.97, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSending(true);
    // Placeholder — will wire up Resend later
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setEmail('');
    setMessage('');
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ opacity: 0, pointerEvents: 'none' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Blurred backdrop with purple-to-black gradient */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(20px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
          background: 'linear-gradient(135deg, rgba(104, 73, 252, 0.15) 0%, rgba(0, 0, 0, 0.80) 50%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[480px] mx-6"
        style={{ opacity: 0 }}
      >
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: '3rem 2.5rem',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6"
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'none', fontSize: '1.25rem', lineHeight: 1 }}
          >
            ✕
          </button>

          <h2
            className="font-[Rubik] font-bold text-white"
            style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}
          >
            Let&apos;s talk
          </h2>
          <p
            className="font-[Inter]"
            style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', lineHeight: 1.6 }}
          >
            Got an idea or a project? Drop a message and I&apos;ll get back to you.
          </p>

          {sent ? (
            <div className="text-center" style={{ padding: '2rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <p className="font-[Inter] text-white" style={{ fontSize: '1rem', fontWeight: 500 }}>
                Message sent!
              </p>
              <p className="font-[Inter]" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  className="font-[Inter]"
                  style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    cursor: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(104, 73, 252, 0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div>
                <label
                  className="font-[Inter]"
                  style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}
                >
                  Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                    cursor: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(104, 73, 252, 0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  marginTop: '0.5rem',
                  padding: '1rem 2rem',
                  borderRadius: 14,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6849FC 0%, #4a2fd4 100%)',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  opacity: sending ? 0.6 : 1,
                  boxShadow: '0 4px 20px rgba(104, 73, 252, 0.3)',
                }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
