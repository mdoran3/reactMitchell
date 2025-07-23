import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWaveFlow = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 120;
    canvas.height = 35;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      const centerY = canvas.height / 2;
      const time = Date.now() / 1000;
      
      // Create multiple flowing sine waves
      const waves = 3;
      
      for (let wave = 0; wave < waves; wave++) {
        ctx.beginPath();
        
        let amplitude, frequency, speed, alpha;
        
        if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
          // Use real audio data to modify wave properties
          const dataIndex = Math.floor((wave / waves) * frequencyData.length);
          const intensity = frequencyData[dataIndex] / 255;
          
          amplitude = 5 + intensity * 10;
          frequency = 0.02 + intensity * 0.03;
          speed = 2 + intensity * 3;
          alpha = 0.4 + intensity * 0.6;
          
        } else if (isPlaying) {
          // Gentle fallback animation
          amplitude = 5 + Math.sin(time + wave) * 3;
          frequency = 0.02 + wave * 0.01;
          speed = 2;
          alpha = 0.4 + wave * 0.1;
          
        } else {
          // Minimal static wave
          amplitude = 2;
          frequency = 0.02;
          speed = 0.5;
          alpha = 0.2;
        }
        
        // Draw smooth sine wave
        for (let x = 0; x <= canvas.width; x++) {
          const y = centerY + Math.sin(x * frequency + time * speed + wave * 2) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Style the wave
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(9, 111, 109, 0)`);
        gradient.addColorStop(0.2, `rgba(9, 111, 109, ${alpha})`);
        gradient.addColorStop(0.8, `rgba(9, 111, 109, ${alpha})`);
        gradient.addColorStop(1, `rgba(9, 111, 109, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 - wave * 0.3;
        ctx.stroke();
        
        // Add glow effect when playing
        if (isPlaying) {
          ctx.shadowColor = 'rgba(9, 111, 109, 0.5)';
          ctx.shadowBlur = 3;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="sound-wave-container">
      <canvas ref={canvasRef} className="sound-wave-canvas" />
    </div>
  );
};

export default SoundWaveFlow;
