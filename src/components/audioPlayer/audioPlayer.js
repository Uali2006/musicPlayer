import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

import './audioPlayer.css'; // Create this file for styling

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-wrapper">
      {isMobile ? (
        <div>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <audio ref={audioRef} src={src} />
        </div>
      ) : (
        <audio controls ref={audioRef}>
          <source src={src} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;