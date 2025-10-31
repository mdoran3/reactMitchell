import '../style/SoundWave.css';

const SoundWaveModern = () => {
  // ...original or placeholder content...
  return <div>SoundWaveModern placeholder</div>;
};

export default SoundWaveModern;
import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWaveModern = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Sleek horizontal design
    canvas.width = 80;
    canvas.height = 30;
    
    const bars = 6;
    const barWidth = 3;
    const barSpacing = 4;
    const maxBarHeight = canvas.height - 4;
    const startX = (canvas.width - (bars * barWidth + (bars - 1) * barSpacing)) / 2;
    
    let previousHeights = Array(bars).fill(4);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      let barHeights;
      
      if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
        // Use real audio data with smooth interpolation
        barHeights = frequencyData.slice(0, bars).map((value, index) => {
          let height = (value / 255) * maxBarHeight;
          
          // Smooth the transition
          const targetHeight = Math.max(4, height);
          previousHeights[index] = previousHeights[index] * 0.8 + targetHeight * 0.2;
          
          return previousHeights[index];
        });
        
      } else if (isPlaying) {
        // Gentle fallback animation
        const time = Date.now() / 800;
        barHeights = Array(bars).fill().map((_, index) => {
          const wave = Math.sin(time + index * 0.8) * 0.4 + 0.6;
          const targetHeight = 4 + wave * (maxBarHeight - 4) * 0.3;
          previousHeights[index] = previousHeights[index] * 0.9 + targetHeight * 0.1;
          return previousHeights[index];
        });
        
      } else {
        // Static minimal bars
        barHeights = Array(bars).fill(4);
        previousHeights = Array(bars).fill(4);
      }
      
      // Draw sleek bars
      barHeights.forEach((height, index) => {
        const x = startX + index * (barWidth + barSpacing);
        const y = (canvas.height - height) / 2;
        
        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, y + height);
        if (isPlaying) {
          gradient.addColorStop(0, 'rgba(9, 111, 109, 0.9)');
          gradient.addColorStop(0.5, 'rgba(9, 111, 109, 0.7)');
          gradient.addColorStop(1, 'rgba(9, 111, 109, 0.4)');
        } else {
          gradient.addColorStop(0, 'rgba(9, 111, 109, 0.3)');
          gradient.addColorStop(1, 'rgba(9, 111, 109, 0.1)');
        }
        
        // Draw rounded bars
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, barWidth / 2);
        ctx.fill();
        
        // Add subtle glow when playing
        if (isPlaying && height > 8) {
          ctx.shadowColor = 'rgba(9, 111, 109, 0.5)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
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

export default SoundWaveModern;
