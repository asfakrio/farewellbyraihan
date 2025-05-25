'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  src: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Browsers often require user interaction to play audio.
    // This effect tries to play audio once the component mounts,
    // but it might be blocked initially.
    if (audioRef.current && hasInteracted) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.warn("Audio autoplay was prevented:", error);
        // If autoplay is prevented, user will need to click play.
        setIsPlaying(false); 
      });
    }
  }, [hasInteracted, src]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);


  const togglePlayPause = () => {
    if (!hasInteracted) setHasInteracted(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Effect to handle ended event for looping
  useEffect(() => {
    const audioElement = audioRef.current;
    const handleAudioEnded = () => {
      if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.error("Error re-playing audio:", e));
        setIsPlaying(true);
      }
    };

    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);


  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 p-2 bg-background/70 backdrop-blur-sm rounded-lg shadow-md">
      <audio ref={audioRef} src={src} preload="auto" />
      <Button onClick={togglePlayPause} variant="ghost" size="icon" aria-label={isPlaying ? "Pause music" : "Play music"}>
        {isPlaying ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary" />}
      </Button>
      <Button onClick={toggleMute} variant="ghost" size="icon" aria-label={isMuted ? "Unmute music" : "Mute music"}>
        {isMuted ? <VolumeX className="h-5 w-5 text-primary" /> : <Volume2 className="h-5 w-5 text-primary" />}
      </Button>
    </div>
  );
};

export default MusicPlayer;
