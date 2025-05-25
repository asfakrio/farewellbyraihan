
'use client';

import React, { useRef, useEffect } from 'react';

interface MusicPlayerProps {
  src: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && src) {
      audioElement.src = src; // Ensure src is set if it changes
      audioElement.loop = true; // Set audio to loop

      // Attempt to play the audio
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            console.log("Audio playback started automatically.");
          })
          .catch((error) => {
            // Autoplay was prevented by the browser.
            // This usually happens if the user hasn't interacted with the page/domain yet.
            // Clicking the "Let's Go!" button on the previous page should count as an interaction.
            console.warn("Audio autoplay was prevented:", error);
          });
      }
    }

    // Cleanup function to pause audio if the component unmounts or src changes
    return () => {
      if (audioElement) {
        audioElement.pause();
        // Note: We don't reset audioElement.src = "" here,
        // as the effect might re-run due to src prop change,
        // and we want the new src to be loaded.
      }
    };
  }, [src]); // Re-run effect if src changes or on initial mount

  // The audio element is hidden using className="hidden"
  // and has no default browser controls.
  return <audio ref={audioRef} preload="auto" className="hidden" />;
};

export default MusicPlayer;
