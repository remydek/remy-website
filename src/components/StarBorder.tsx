'use client';

import React from 'react';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...((rest.style as React.CSSProperties) || {}),
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-bottom ${speed} linear infinite alternate`,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-top ${speed} linear infinite alternate`,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(15,15,15,0.9))',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '20px',
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
