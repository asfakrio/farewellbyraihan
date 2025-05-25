
'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import ConfettiAnimation from '@/components/ConfettiAnimation';
import MusicPlayer from '@/components/MusicPlayer'; // Assuming you create this component
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const FarewellContent: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Friend';

  const raihanMessage = [
    "As our college journey comes to an end, I just want to say thank you for being a part of this beautiful chapter of my life. We've shared countless memories, laughter, struggles, and moments that I’ll cherish forever.",
    "Now, as we step into a new phase of life, I sincerely wish you all the happiness, success, and peace you deserve. May your dreams turn into reality, and may life treat you with kindness wherever you go.",
    "Never forget how far you’ve come, and never stop believing in yourself. No matter where life takes us, you’ll always be a friend I’m proud to have.",
    "Good luck for everything that’s coming your way. Stay happy, stay true, and always keep that smile alive! 🎓✨"
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const subGreetingRef = useRef<HTMLHeadingElement>(null);
  const messageParagraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    // Page container fade in
    gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.5 });

    if (greetingRef.current) {
      const nameSpan = greetingRef.current.querySelector('.user-name');
      tl.fromTo(greetingRef.current, 
        { opacity: 0, y: -50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.7)' }
      );
      if (nameSpan) {
        gsap.fromTo(nameSpan, 
          { scale: 1, color: '#F4D03F' }, // Using HEX for primary color
          // Removed textShadow from the animation to prevent potential parsing errors
          { scale: 1.1, color: '#E07A5F', duration: 1.5, yoyo: true, repeat: -1, ease: 'power1.inOut' } // Using HEX for accent color
        );
      }
    }

    if (subGreetingRef.current) {
      tl.fromTo(subGreetingRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
        "-=0.6" 
      );
    }

    messageParagraphRefs.current.forEach((pRef) => {
      if (pRef) {
        tl.fromTo(pRef, 
          { opacity: 0, x: -50 }, 
          { opacity: 1, x: 0, duration: 0.7 }, 
          `-=0.4` 
        );
      }
    });
  }, [name]);

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-background">
      <ConfettiAnimation isActive={true} />
      
      <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-sm shadow-2xl rounded-xl z-10 overflow-y-auto max-h-[90vh]">
        <CardHeader className="text-center pt-8">
          <h1 ref={greetingRef} className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary mb-3">
            Hey <span className="user-name text-glow-primary">{name}</span>,
          </h1>
          <h2 ref={subGreetingRef} className="font-sans text-2xl sm:text-3xl font-semibold text-accent mb-6">
            Thank you for the amazing memories! <span className="inline-block group"><span className="group-hover:animate-ping inline-block">💖</span></span>
          </h2>
        </CardHeader>
        <CardContent className="text-left sm:text-lg text-foreground/90 space-y-5 px-6 pb-8">
          {raihanMessage.map((paragraph, index) => (
            <p 
              key={index} 
              ref={el => messageParagraphRefs.current[index] = el}
              className="leading-relaxed opacity-0" // Initial state for GSAP
            >
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
      
      {/* 
        IMPORTANT: You need to add a royalty-free audio file named 'background-music.mp3' 
        into the `public/audio/` directory for the music to play.
      */}
      <MusicPlayer src="/audio/background-music.mp3" />
    </div>
  );
};


// Wrap content in Suspense for useSearchParams hook
export default function FarewellPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <FarewellContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <p className="text-2xl font-heading text-primary animate-pulse">Loading your special message...</p>
    </div>
  );
}
