'use client';

import { useEffect, useState, useCallback } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Message from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:remy@augmento.com?subject=${subject}&body=${body}`, '_self');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2200);
  }, [formData, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setVisible(true);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Separate effect: when visible becomes true, trigger animate on next tick
  useEffect(() => {
    if (visible && isOpen) {
      const timeout = setTimeout(() => setAnimate(true), 20);
      return () => clearTimeout(timeout);
    }
  }, [visible, isOpen]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const isUp = (field: string) => focused === field || formData[field as keyof typeof formData].length > 0;

  if (!visible) return null;

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2, 2, 2, 0.72)',
        backdropFilter: 'blur(14px) saturate(0.7)',
        WebkitBackdropFilter: 'blur(14px) saturate(0.7)',
        cursor: 'auto',
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          margin: '0 24px',
          padding: '44px 40px 36px',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'linear-gradient(165deg, rgba(30,30,30,0.92) 0%, rgba(20,20,20,0.95) 50%, rgba(12,12,12,0.97) 100%)',
          backdropFilter: 'blur(48px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(48px) saturate(1.3)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 32px 80px rgba(0,0,0,0.55), 0 8px 32px rgba(0,0,0,0.3)',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.35)',
            cursor: 'auto',
            opacity: animate ? 1 : 0,
            transform: animate ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'opacity 0.4s ease 0.2s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, border-color 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Header */}
        <h2
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 6,
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.45s ease 0.15s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
          }}
        >
          Let&apos;s talk
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.03em',
            lineHeight: 1.6,
            marginBottom: 6,
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease 0.22s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.22s',
          }}
        >
          Have a project in mind? Tell me about it.
        </p>

        {/* Accent line */}
        <div
          style={{
            width: 36,
            height: 1,
            background: 'rgba(255,255,255,0.18)',
            marginBottom: 30,
            transformOrigin: 'left center',
            transform: animate ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.28s',
          }}
        />

        {sent ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </div>
            <p style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
              Opening mail client...
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
              I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {(['name', 'email', 'message'] as const).map((field, i) => (
                <div
                  key={field}
                  style={{
                    position: 'relative',
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.4s ease ${0.32 + i * 0.07}s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.32 + i * 0.07}s`,
                  }}
                >
                  <label
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: isUp(field) ? -10 : 10,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: isUp(field) ? '0.62rem' : '0.8rem',
                      color: isUp(field) ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      pointerEvents: 'none',
                      transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {field === 'name' ? 'Your name' : field === 'email' ? 'Email address' : 'Your message'}
                  </label>

                  {field === 'message' ? (
                    <textarea
                      value={formData[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      rows={3}
                      required
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        borderBottom: `1px solid ${focused === field ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
                        outline: 'none',
                        color: 'rgba(255,255,255,0.85)',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.88rem',
                        padding: '10px 0 8px',
                        resize: 'none',
                        letterSpacing: '0.015em',
                        lineHeight: 1.65,
                        transition: 'border-color 0.3s ease',
                        cursor: 'auto',
                      }}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      required
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        borderBottom: `1px solid ${focused === field ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
                        outline: 'none',
                        color: 'rgba(255,255,255,0.85)',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.88rem',
                        padding: '10px 0 8px',
                        letterSpacing: '0.015em',
                        transition: 'border-color 0.3s ease',
                        cursor: 'auto',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="glass-btn"
              style={{
                marginTop: 32,
                width: '100%',
                justifyContent: 'center',
                padding: '0.95rem 2rem',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.55s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.55s, background 0.35s ease, border-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease',
              }}
            >
              Send message
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
