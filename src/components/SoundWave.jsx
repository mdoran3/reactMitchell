import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWave = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size - MUCH BIGGER for extreme effect
    canvas.width = 80;
    canvas.height = 60;
    
    const bars = 8;
    const barWidth = canvas.width / bars;
    const maxBarHeight = canvas.height - 8;
    
    // Track previous values for momentum
    let previousHeights = Array(bars).fill(8);
    let peakValues = Array(bars).fill(0);
    
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
        
        // SELECTIVE PROMINENCE - only show the most dominant frequencies
        barHeights = frequencyData.map((value, index) => {
          // Find the maximum value across all frequencies
          const maxValue = Math.max(...frequencyData);
          const avgValue = frequencyData.reduce((sum, v) => sum + v, 0) / frequencyData.length;
          
          // Only show bars that are significantly above average AND above threshold
          const threshold = Math.max(20, avgValue * 1.5); // Dynamic threshold
          const isProminent = value > threshold && value > maxValue * 0.3;
          
          if (!isProminent) {
            // Non-prominent frequencies get minimal height
            previousHeights[index] = 3;
            return 3;
          }
          
          // For prominent frequencies, use extreme scaling
          let height = (value / 255) * maxBarHeight;
          
          // Prominence boost - the more prominent, the more dramatic
          const prominenceRatio = value / maxValue;
          height *= (1 + prominenceRatio * 3); // Up to 4x boost for most prominent
          
          // Frequency-specific selective boosts only for prominent sounds
          if (index < 2 && isProminent) { // Bass prominence
            height *= 2.0;
          } else if (index >= 6 && isProminent) { // Treble prominence  
            height *= 1.8;
          } else if (isProminent) { // Mid prominence
            height *= 1.5;
          }
          
          // Dramatic spike detection for sudden prominence
          const prevHeight = previousHeights[index] || 3;
          if (height > prevHeight * 2) {
            height *= 2.0; // Double boost for sudden spikes
          }
          
          // Ensure dramatic visibility for prominent sounds
          const finalHeight = Math.max(8, Math.min(maxBarHeight, height));
          previousHeights[index] = finalHeight;
          
          return finalHeight;
        });
        
        // Debug prominent frequencies
        if (Math.random() < 0.05) {
          const maxValue = Math.max(...frequencyData);
          const avgValue = frequencyData.reduce((sum, v) => sum + v, 0) / frequencyData.length;
          const threshold = Math.max(20, avgValue * 1.5);
          const prominentBars = frequencyData.map((v, i) => v > threshold && v > maxValue * 0.3 ? i : -1).filter(i => i >= 0);
          console.log('🎯 SELECTIVE PROMINENCE - max:', Math.round(maxValue), 'avg:', Math.round(avgValue), 'threshold:', Math.round(threshold), 'prominent bars:', prominentBars, 'heights:', barHeights.map(v => Math.round(v)));
        }
      } else if (isPlaying) {
        // EXTREME fallback animation when no frequency data
        console.log('No frequency data - using EXTREME fallback');
        const time = Date.now() / 50; // Much faster
        barHeights = Array(bars).fill().map((_, index) => {
          const variation = Math.sin(time + index * 3) * 0.9 + Math.cos(time * 1.5 + index) * 0.7 + Math.random() * 0.8;
          return 10 + variation * (maxBarHeight - 10);
        });
      } else {
        // Larger static bars when not playing
        barHeights = Array(bars).fill(8);
      }
      
      // Draw the bars with EXTREME visual effects
      barHeights.forEach((height, index) => {
        const x = index * barWidth + 1;
        const y = canvas.height - height;
        
        // EXTREME dynamic brightness
        const heightRatio = height / maxBarHeight;
        const baseAlpha = isPlaying ? 0.9 + (heightRatio * 0.1) : 0.5;
        
        // EXTREME color variations with more dramatic differences
        let color, glowColor;
        if (index < 2) { // Deep bass - INTENSE red/magenta
          color = `rgba(255, ${Math.floor(20 + heightRatio * 80)}, ${Math.floor(100 + heightRatio * 155)}, ${baseAlpha})`;
          glowColor = '#ff0040';
        } else if (index < 4) { // Bass - HOT magenta
          color = `rgba(255, ${Math.floor(40 + heightRatio * 120)}, 255, ${baseAlpha})`;
          glowColor = '#ff0080';
        } else if (index < 6) { // Mid - BRIGHT cyan
          color = `rgba(0, 255, 255, ${baseAlpha})`;
          glowColor = '#00ffff';
        } else { // Treble - BRILLIANT blue/white
          color = `rgba(${Math.floor(100 + heightRatio * 155)}, 255, 255, ${baseAlpha})`;
          glowColor = '#40ffff';
        }
        
        // Draw main bar - make it thicker
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 1, height);
        
        // EXTREME glow effects when playing
        if (isPlaying) {
          const glowIntensity = 6 + heightRatio * 12; // MUCH stronger glow
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = glowIntensity;
          
          // Multiple glow layers for EXTREME intensity
          ctx.fillRect(x, y, barWidth - 1, height);
          ctx.shadowBlur = glowIntensity * 0.7;
          ctx.fillRect(x, y, barWidth - 1, height);
          ctx.shadowBlur = glowIntensity * 0.4;
          ctx.fillRect(x, y, barWidth - 1, height);
          ctx.shadowBlur = 0;
          
          // EXTREME highlights for taller bars
          if (heightRatio > 0.3) {
            ctx.fillStyle = `rgba(255, 255, 255, ${heightRatio * 0.9})`;
            ctx.fillRect(x, y, barWidth - 1, 4);
          }
          
          // EXTREME peak indicators for maximum heights
          if (heightRatio > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, 1.0)`;
            ctx.fillRect(x - 1, y - 3, barWidth + 1, 3);
            
            // Add sparkle effect for extreme peaks
            if (heightRatio > 0.9) {
              ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
              ctx.fillRect(x - 2, y - 5, barWidth + 3, 2);
            }
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
