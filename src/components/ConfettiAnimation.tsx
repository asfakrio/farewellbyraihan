'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ConfettiAnimationProps {
  isActive?: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.kill();
        animationInstanceRef.current = null;
        // Clear any existing confetti elements
        if(containerRef.current) containerRef.current.innerHTML = '';
      }
      return;
    }

    const container = containerRef.current;
    const numConfetti = 150;
    const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFC300', '#FF5733', '#C70039'];

    // Ensure this runs only once if isActive is true from the start
    // or if it becomes true later.
    if(animationInstanceRef.current) return;

    animationInstanceRef.current = gsap.timeline();

    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = '0.7';
      confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`; // Mix circles and squares
      container.appendChild(confetti);

      const startX = Math.random() * container.offsetWidth;
      const startY = -20 - Math.random() * 50; // Start above the screen
      const endY = container.offsetHeight + 20; // Fall below the screen
      const duration = Math.random() * 3 + 3; // 3-6 seconds
      const rotation = Math.random() * 720 - 360;
      const sway = Math.random() * 100 - 50; // Horizontal sway

      gsap.set(confetti, { x: startX, y: startY });

      animationInstanceRef.current.to(
        confetti,
        {
          y: endY,
          x: `+=${sway}`,
          rotation: rotation,
          opacity: 0,
          duration: duration,
          ease: 'power1.inOut', // Smoother fall
          delay: Math.random() * 2, // Staggered start
          onComplete: () => {
            confetti.remove();
          },
        },
        0 // Start all confetti animations at the beginning of the timeline for a burst effect
      );
    }
    
    // Auto-cleanup timeline to prevent memory leaks if component unmounts
    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.kill();
        animationInstanceRef.current = null;
      }
      // Clear any existing confetti elements when component unmounts
      if(containerRef.current) containerRef.current.innerHTML = '';
    };

  }, [isActive]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-50" />;
};

export default ConfettiAnimation;
