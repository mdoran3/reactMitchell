import React, { useEffect, useRef } from 'react';
import '../style/SoundWave.css';

const SoundWaveParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 100;
    canvas.height = 40;
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.8 + 0.2,
          baseY: canvas.height / 2,
          frequency: Math.random() * 0.1 + 0.05
        });
      }
    };
    
    initParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isPlaying = window.audioIsPlaying || false;
      const frequencyData = window.audioFrequencyData;
      
      let energy = 0;
      if (isPlaying && frequencyData && Array.isArray(frequencyData)) {
        energy = frequencyData.reduce((sum, val) => sum + val, 0) / (frequencyData.length * 255);
      } else if (isPlaying) {
        energy = 0.3 + Math.sin(Date.now() / 1000) * 0.2;
      }
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        if (isPlaying) {
          // Move particles based on energy
          particle.x += particle.vx * (1 + energy);
          particle.y = particle.baseY + Math.sin(Date.now() / 1000 + index * particle.frequency) * (energy * 15);
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -1;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -1;
          }
          
          // Update alpha based on energy
          particle.alpha = 0.3 + energy * 0.7;
          
        } else {
          // Gentle drift when not playing
          particle.y = particle.baseY + Math.sin(Date.now() / 2000 + index * 0.1) * 2;
          particle.alpha = 0.2;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9, 111, 109, ${particle.alpha})`;
        ctx.fill();
        
        // Draw connections to nearby particles
        if (isPlaying) {
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (otherIndex > index) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 40) {
                const alpha = (1 - distance / 40) * energy * 0.3;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(9, 111, 109, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
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

export default SoundWaveParticles;
