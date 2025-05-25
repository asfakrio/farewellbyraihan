'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send } from 'lucide-react';

export default function LandingPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      );
    }
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (cardRef.current) {
      tl.fromTo(cardRef.current, 
        { opacity: 0, y: 50, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3 }
      );
    }
    if (titleRef.current) {
       tl.fromTo(titleRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, 
        "-=0.5"
      );
    }
    if (inputRef.current) {
      tl.fromTo(inputRef.current.parentElement, // Animate the parent div of input for better effect
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.5 }, 
        "-=0.4"
      );
    }
    if (buttonRef.current) {
      tl.fromTo(buttonRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.75)' }, 
        "-=0.3"
      );
    }

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          router.push(`/farewell?name=${encodeURIComponent(name.trim())}`);
        }
      });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center p-4 animated-gradient-background overflow-hidden">
      <Card ref={cardRef} className="w-full max-w-md bg-background/80 backdrop-blur-sm shadow-2xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle ref={titleRef} className="font-heading text-4xl md:text-5xl text-primary mb-2">
            College Farewell 2025 <span className="inline-block animate-bounce">🎓</span>
          </CardTitle>
          <CardDescription className="text-foreground/80 text-lg">
            A little something to remember our journey...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg text-foreground/90">Enter your name:</Label>
              <Input
                id="name"
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your awesome name"
                className="text-base py-6 border-2 focus:border-primary focus:ring-primary"
                required
                aria-label="Your name"
              />
            </div>
            <Button ref={buttonRef} type="submit" className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-5 w-5" />
              Let's Go!
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
