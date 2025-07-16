import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWave = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size - make it taller for more dramatic effect
    canvas.width = 60;
    canvas.height = 40;
    
    const bars = 8;
    const barWidth = canvas.width / bars;
    const maxBarHeight = canvas.height - 6;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let barHeights;
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
        // ALWAYS use the frequency data when playing - force real audio
        const maxFreqValue = Math.max(...frequencyData);
        const totalEnergy = frequencyData.reduce((sum, val) => sum + val, 0);
        
        // Debug frequently to see what we're getting
        if (Math.random() < 0.1) {
          console.log('🎵 Audio Input - max:', maxFreqValue, 'total:', totalEnergy, 'data:', frequencyData.map(v => Math.round(v)));
        }
        
        // DIRECT audio mapping - force use of real data
        barHeights = frequencyData.map((value, index) => {
          // Convert from 0-255 to bar height with aggressive scaling
          let height = (value / 255) * maxBarHeight;
          
          // Use power scaling to make differences more visible
          height = Math.pow(height / maxBarHeight, 0.5) * maxBarHeight;
          
          // Apply frequency-specific boosts for better visibility
          if (index < 2) { // Bass
            height *= 2.5;
          } else if (index < 4) { // Low-mid
            height *= 2.0;
          } else if (index < 6) { // Mid
            height *= 1.5;
          } else { // Treble
            height *= 1.2;
          }
          
          // Ensure visible minimum but preserve zero values
          return value > 0 ? Math.max(3, Math.min(maxBarHeight, height)) : 3;
        });
        
        // Debug output frequently
        if (Math.random() < 0.05) {
          console.log('🎵 REAL AUDIO OUTPUT - input:', frequencyData.map(v => Math.round(v)), '→ bars:', barHeights.map(v => Math.round(v)));
        }
      } else if (isPlaying) {
        // Fallback animation when no frequency data
        console.log('No frequency data - using fallback');
        const time = Date.now() / 100;
        barHeights = Array(bars).fill().map((_, index) => {
          const variation = Math.sin(time + index * 2) * 0.8 + Math.random() * 0.6;
          return 8 + variation * (maxBarHeight - 8);
        });
      } else {
        // Static bars when not playing
        barHeights = Array(bars).fill(6);
      }
      
      // Draw the bars with extreme visual effects
      barHeights.forEach((height, index) => {
        const x = index * barWidth + 1;
        const y = canvas.height - height;
        
        // Dynamic brightness based on bar height
        const heightRatio = height / maxBarHeight;
        const baseAlpha = isPlaying ? 0.8 + (heightRatio * 0.2) : 0.4;
        
        // Extreme color variations
        let color, glowColor;
        if (index < 2) { // Deep bass - intense magenta/red
          color = `rgba(255, ${Math.floor(50 + heightRatio * 100)}, ${Math.floor(150 + heightRatio * 105)}, ${baseAlpha})`;
          glowColor = '#ff0080';
        } else if (index < 4) { // Bass - magenta
          color = `rgba(255, ${Math.floor(80 + heightRatio * 100)}, 255, ${baseAlpha})`;
          glowColor = '#ff00ff';
        } else if (index < 6) { // Mid - cyan
          color = `rgba(0, 255, 255, ${baseAlpha})`;
          glowColor = '#00ffff';
        } else { // Treble - bright blue/white
          color = `rgba(${Math.floor(150 + heightRatio * 105)}, 255, 255, ${baseAlpha})`;
          glowColor = '#80ffff';
        }
        
        // Draw main bar
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 2, height);
        
        // Extreme glow effects when playing
        if (isPlaying) {
          const glowIntensity = 4 + heightRatio * 8;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = glowIntensity;
          
          // Multiple glow layers
          ctx.fillRect(x, y, barWidth - 2, height);
          ctx.shadowBlur = glowIntensity * 0.5;
          ctx.fillRect(x, y, barWidth - 2, height);
          ctx.shadowBlur = 0;
          
          // Bright highlights for taller bars
          if (heightRatio > 0.4) {
            ctx.fillStyle = `rgba(255, 255, 255, ${heightRatio * 0.7})`;
            ctx.fillRect(x, y, barWidth - 2, 3);
          }
          
          // Peak indicators for maximum heights
          if (heightRatio > 0.8) {
            ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
            ctx.fillRect(x - 1, y - 2, barWidth, 2);
          }
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

export default SoundWave;
