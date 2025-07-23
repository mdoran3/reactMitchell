import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWave = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for circular design - smaller to match social buttons
    canvas.width = 30; // Reduced to match social button size
    canvas.height = 30; // Reduced to match social button size
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 10; // Reduced proportionally
    const textRadius = 14; // Increased radius for better text visibility
    
    // Beat detection variables
    let bassHistory = [];
    let lastBeatTime = 0;
    let beatIntensity = 0;
    
    // Function to draw circular text
    const drawCircularText = (text, radius, startAngle, fontSize = 6) => {
      if (!text) return;
      
      // Add spaces at the end for clean separation
      const paddedText = text.toUpperCase() + "   ";
      
      ctx.font = `${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate angle per character to fit exactly once around the circle
      const totalChars = paddedText.length;
      const anglePerChar = (Math.PI * 2) / totalChars;
      
      for (let i = 0; i < totalChars; i++) {
        const char = paddedText[i];
        const angle = startAngle + (i * anglePerChar);
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2); // Rotate character to follow circle
        
        // Clear, readable text styling
        ctx.fillStyle = 'rgba(9, 111, 109, 1)'; // Full opacity for better readability
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Light outline for contrast
        ctx.lineWidth = 0.5;
        ctx.strokeText(char, 0, 0); // Outline first
        ctx.fillText(char, 0, 0); // Fill text
        
        ctx.restore();
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
        // Enhanced beat detection using bass frequencies
        const kickFreq = frequencyData[0] || 0; // Sub-bass (20-60Hz) - kick drum
        const bassFreq = frequencyData[1] || 0; // Bass (60-200Hz) - bass guitar/synth
        const combinedBass = (kickFreq + bassFreq) / 2;
        
        // Track bass history for beat detection
        bassHistory.push(combinedBass);
        if (bassHistory.length > 10) bassHistory.shift();
        
        // Detect beats (sudden increases in bass)
        const currentTime = Date.now();
        const avgBass = bassHistory.reduce((sum, val) => sum + val, 0) / bassHistory.length;
        const bassThreshold = avgBass * 1.3; // Threshold for beat detection
        
        if (combinedBass > bassThreshold && currentTime - lastBeatTime > 200) {
          // Beat detected! Create intense pulse
          beatIntensity = Math.min(1, combinedBass / 255 * 2);
          lastBeatTime = currentTime;
        }
        
        // Decay beat intensity over time
        const timeSinceBeat = currentTime - lastBeatTime;
        const beatDecay = Math.max(0, 1 - (timeSinceBeat / 800)); // Decay over 800ms
        beatIntensity *= beatDecay;
        
        // Use real audio data for concentric circles with beat enhancement
        const rings = 5;
        
        frequencyData.slice(0, rings).forEach((value, index) => {
          let intensity = value / 255;
          
          // Enhance bass frequencies (first 2 rings) with beat detection
          if (index < 2) {
            intensity = Math.min(1, intensity + beatIntensity * 0.8);
          }
          
          const baseRadius = (maxRadius / rings) * (index + 1);
          
          // Add beat-responsive radius expansion
          const beatExpansion = index < 2 ? beatIntensity * 8 : beatIntensity * 3;
          const radius = baseRadius + beatExpansion;
          
          // Enhanced pulsing with beat response
          const pulseMultiplier = 0.7 + intensity * 0.5 + (beatIntensity * 0.3);
          const finalRadius = radius * pulseMultiplier;
          
          const alpha = 0.2 + intensity * 0.7 + (beatIntensity * 0.2);
          
          // Main circle with beat-enhanced thickness
          ctx.beginPath();
          ctx.arc(centerX, centerY, finalRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(9, 111, 109, ${alpha})`;
          ctx.lineWidth = 1.5 + intensity * 2 + (beatIntensity * 3);
          ctx.stroke();
          
          // Beat flash effect for bass frequencies
          if (index < 2 && beatIntensity > 0.3) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, finalRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${beatIntensity * 0.6})`;
            ctx.lineWidth = beatIntensity * 4;
            ctx.stroke();
          }
          
          // Inner glow enhancement
          if (intensity > 0.2 || beatIntensity > 0.2) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, finalRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(intensity + beatIntensity) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
        
        // Enhanced central dot that really thumps with the beat
        const totalEnergy = frequencyData.reduce((sum, val) => sum + val, 0) / (frequencyData.length * 255);
        const centerRadius = 2 + totalEnergy * 4 + beatIntensity * 6;
        const centerAlpha = 0.6 + totalEnergy * 0.3 + beatIntensity * 0.4;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9, 111, 109, ${centerAlpha})`;
        ctx.fill();
        
        // Beat flash for center dot
        if (beatIntensity > 0.4) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerRadius + beatIntensity * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${beatIntensity * 0.8})`;
          ctx.fill();
        }
        
        // Draw rotating song name around the visualization
        const currentSong = window.currentSongName || "♪ MUSIC ♪";
        const time = Date.now() / 1000;
        const consistentRotationSpeed = 0.01; // Consistent speed regardless of audio data
        const rotationAngle = time * consistentRotationSpeed;
        
        drawCircularText(currentSong.toUpperCase(), textRadius, rotationAngle, 9);
        
      } else if (isPlaying) {
        // Enhanced fallback animation with simulated beat
        const time = Date.now() / 1000;
        const beatTime = time * 2; // 120 BPM simulation
        const beatPhase = beatTime % 1;
        
        // Simulate kick drum on beats 1 and 3
        const kickBeat = (Math.floor(beatTime) % 2 === 0) ? 1 : 0;
        const kickIntensity = kickBeat * Math.max(0, 1 - beatPhase * 4) * 0.8;
        
        for (let i = 0; i < 3; i++) {
          const baseRadius = 8 + i * 6;
          const pulseVariation = Math.sin(time * 2 + i) * 0.3;
          const beatPulse = i < 2 ? kickIntensity * 6 : kickIntensity * 2;
          const alpha = 0.3 + pulseVariation * 0.2 + kickIntensity * 0.4;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, baseRadius + beatPulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(9, 111, 109, ${alpha})`;
          ctx.lineWidth = 2 + kickIntensity * 3;
          ctx.stroke();
          
          // Beat flash
          if (kickIntensity > 0.3 && i < 2) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius + beatPulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${kickIntensity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Enhanced central dot with beat
        const centerRadius = 3 + kickIntensity * 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9, 111, 109, ${0.7 + kickIntensity * 0.3})`;
        ctx.fill();
        
        // Beat flash for center
        if (kickIntensity > 0.4) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerRadius + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${kickIntensity * 0.6})`;
          ctx.fill();
        }
        
        // Draw rotating song name
        const currentSong = window.currentSongName || "♪ MUSIC ♪";
        const rotationAngle = time * 0.01; // Same consistent speed as real audio mode
        drawCircularText(currentSong.toUpperCase(), textRadius, rotationAngle, 9);
        
      } else {
        // Static state - just the center dot and slow rotating text
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(9, 111, 109, 0.4)';
        ctx.fill();
        
        // Slow rotating text when static
        const currentSong = window.currentSongName || "♪ MUSIC ♪";
        const time = Date.now() / 1000;
        const rotationAngle = time * 0.01; // Same consistent speed when paused
        drawCircularText(currentSong.toUpperCase(), textRadius, rotationAngle, 9);
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

export default SoundWave;
