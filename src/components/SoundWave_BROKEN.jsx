import '../style/SoundWave.css';

const SoundWave = () => {
  // ...original or placeholder content...
  return <div>SoundWave_BROKEN placeholder</div>;
};

export default SoundWave;
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
    
    // Add smoothing for previous values to create more fluid animation
    let previousHeights = Array(bars).fill(8);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let barHeights;
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
        // ALWAYS use the frequency data when playing - no fake fallback
        const maxFreqValue = Math.max(...frequencyData);
        const totalEnergy = frequencyData.reduce((sum, val) => sum + val, 0);
        
        // ALWAYS log to see what we're getting
        if (Math.random() < 0.1) {
          console.log('🎵 Raw Audio Data - max:', maxFreqValue, 'total energy:', totalEnergy, 'data:', frequencyData.map(v => Math.round(v)));
        }
        
        // FORCE real audio processing - no threshold check
        barHeights = frequencyData.map((value, index) => {
          // Convert from 0-255 to bar height with aggressive scaling
          let height = (value / 255) * maxBarHeight;
          
          // Use power scaling to make differences more visible
          height = Math.pow(height / maxBarHeight, 0.7) * maxBarHeight;
          
          // Apply frequency-specific boosts
          if (index < 2) { // Bass
            height *= 2.0;
          } else if (index < 4) { // Low-mid
            height *= 1.5;
          } else if (index < 6) { // Mid
            height *= 1.3;
          } else { // Treble
            height *= 1.1;
          }
          
          // Ensure visible minimum but preserve zero values
          return value > 0 ? Math.max(2, Math.min(maxBarHeight, height)) : 2;
        });
        
        // Debug what we're actually showing
        if (Math.random() < 0.05) {
          console.log('🎵 FORCED REAL AUDIO - input:', frequencyData.map(v => Math.round(v)), '→ output:', barHeights.map(v => Math.round(v)));
        }
      } else if (isPlaying) {
        // Fallback: create EXTREME reactive bars if no frequency data
        console.log('Using EXTREME fallback animation - no frequency data');
        const time = Date.now() / 100; // Faster animation
        barHeights = Array(bars).fill().map((_, index) => {
          const variation = Math.sin(time + index * 2) * 0.8 + Math.random() * 0.6;
          return 8 + variation * (maxBarHeight - 8);
        });
      } else {
        // Static bars when not playing - but still visible
        barHeights = Array(bars).fill(6);
      }
        // Debug what we're actually showing
        if (Math.random() < 0.05) {
          console.log('🎵 FORCED REAL AUDIO - input:', frequencyData.map(v => Math.round(v)), '→ output:', barHeights.map(v => Math.round(v)));
        }
      } else if (isPlaying) {
        // Fallback: create EXTREME reactive bars if no frequency data
        console.log('Using EXTREME fallback animation - no frequency data');
        const time = Date.now() / 100; // Faster animation
        barHeights = Array(bars).fill().map((_, index) => {
          const variation = Math.sin(time + index * 2) * 0.8 + Math.random() * 0.6;
          return 8 + variation * (maxBarHeight - 8);
        });
      } else {
        // Static bars when not playing - but still visible
        barHeights = Array(bars).fill(6);
      }
      
      // EXTREME visual effects
      barHeights.forEach((height, index) => {
        const x = index * barWidth + 1;
        const y = canvas.height - height;
        
        // Much more dramatic brightness scaling
        const heightRatio = height / maxBarHeight;
        const baseAlpha = isPlaying ? 0.8 + (heightRatio * 0.2) : 0.4;
        
        // More extreme color variations
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
        
        // Draw main bar with rounded top
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 2, height);
        
        // EXTREME glow effects when playing
        if (isPlaying) {
          const glowIntensity = 4 + heightRatio * 8; // Much stronger glow
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = glowIntensity;
          
          // Draw multiple glow layers for intensity
          ctx.fillRect(x, y, barWidth - 2, height);
          ctx.shadowBlur = glowIntensity * 0.5;
          ctx.fillRect(x, y, barWidth - 2, height);
          ctx.shadowBlur = 0;
          
          // Bright top highlight for taller bars
          if (heightRatio > 0.4) {
            ctx.fillStyle = `rgba(255, 255, 255, ${heightRatio * 0.7})`;
            ctx.fillRect(x, y, barWidth - 2, 3);
          }
          
          // Add peak indicator for maximum heights
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
