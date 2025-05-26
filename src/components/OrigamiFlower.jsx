import React, { useEffect, useRef } from 'react';

const OrigamiFlower = ({ width = 250, height = 250 }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const ctxRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const internalWidth = 250;
    const internalHeight = 250;
    canvas.width = internalWidth;
    canvas.height = internalHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const canvasWidth = internalWidth;
    const canvasHeight = internalHeight;
    
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const PARTICLE_COUNT = 1000;  // Fewer for cleaner geometric look
    const FORM_SCALE = 2.2;

    const particles = [];
    particlesRef.current = particles;

    // Create origami-style geometric segments
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * FORM_SCALE * 0.6 * 130;
      const height = (Math.random() * 2 - 1) * FORM_SCALE * 0.4;
      
      // Create angular, stepped movements instead of smooth curves
      const segmentAngle = Math.floor(theta / (Math.PI / 6)) * (Math.PI / 6); // 12 segments
      const angle = segmentAngle;
      const dist = r / 130;

      // Sharp, geometric flow patterns
      const flow = Math.sign(Math.sin(angle * 3 + height * 1.5)) * 0.08;
      const counterFlow = Math.sign(Math.cos(angle * 3 - height * 1.5)) * 0.08;
      const blend = Math.round((Math.sin(height * Math.PI) + 1) * 0.5);
      const combinedFlow = flow * blend + counterFlow * (1 - blend);

      const dx = r * Math.cos(theta);
      const dy = r * Math.sin(theta);

      const containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.9)), 3);
      const pull = containment * 0.15;

      particles.push({
        x: centerX + dx + (dx * combinedFlow) - (dx * pull),
        y: centerY + dy + (dy * combinedFlow) - (dy * pull),
        z: height,
        initialR: r,
        initialTheta: theta,
        initialHeight: height,
        segment: Math.floor(theta / (Math.PI / 6)), // Track which segment
        foldPhase: Math.random() * Math.PI * 2, // Individual folding phase
        brightness: 0.7 + Math.random() * 0.3 // Paper brightness variation
      });
    }

    let lastFrameTime = 0;
    const targetFPS = 12;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime) {
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        timeRef.current += 0.008; // Slightly faster for more dynamic folding

        // Transparent background - let the header background show through
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        particles.forEach(particle => {
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) / 130;
          const angle = Math.atan2(dy, dx);
          const height = particle.z / (FORM_SCALE * 0.5);

          // Origami-style angular movements with sharp folds
          const foldTime = timeRef.current + particle.foldPhase;
          const fold = Math.sign(Math.sin(angle * 4 - foldTime * 0.3 + height * 3)) * 0.025;
          const crease = Math.sign(Math.cos(angle * 4 + foldTime * 0.3 - height * 3)) * 0.025;
          
          // Sharp transitions for paper-folding effect
          const foldBlend = Math.round((Math.sin(height * Math.PI * 2) + 1) * 0.5);
          const combinedFold = fold * foldBlend + crease * (1 - foldBlend);

          const containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.9)), 3);
          const pull = containment * 0.12;

          // More angular movement for origami effect
          const stepX = Math.sign(dx * combinedFold) * Math.abs(dx * combinedFold);
          const stepY = Math.sign(dy * combinedFold) * Math.abs(dy * combinedFold);

          particle.x = particle.x + stepX - (dx * pull);
          particle.y = particle.y + stepY - (dy * pull);
          
          // Z-movement creates paper folding depth
          particle.z = particle.z + Math.sign(Math.sin(foldTime * 0.2 + dist * 3)) * 0.02;

          // Paper-like shading with sharp light/shadow transitions
          const depthFactor = 1 + particle.z * 0.8;
          const lightAngle = Math.atan2(particle.y - centerY, particle.x - centerX) + timeRef.current * 0.1;
          const lightFactor = (Math.sin(lightAngle) + 1) * 0.5;
          const paperShade = particle.brightness * lightFactor;
          
          const opacity = Math.max(0.15, Math.min(0.9, 0.6 * depthFactor * paperShade));
          const size = Math.max(0.8, 1.2 * depthFactor);

          // Draw geometric shapes instead of circles for paper effect
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(angle + timeRef.current * 0.05);
          
          // Pure white particles
          const red = 9;
          const green = 111;
          const blue = 109;
          
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
          
          // Draw diamond/rhombus shapes for origami aesthetic
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.7, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          
          // Add subtle crease lines in white
          if (Math.random() < 0.02) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(-size * 0.7, 0);
            ctx.lineTo(size * 0.7, 0);
            ctx.stroke();
          }
          
          ctx.restore();
        });

        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
      if (particlesRef.current) {
        particlesRef.current.length = 0;
        particlesRef.current = null;
      }
      timeRef.current = 0;
      ctxRef.current = null;
    };
  }, []);

  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      margin: 'auto',
      backgroundColor: 'transparent', // Transparent to inherit header background
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    </div>
  );
};

export default OrigamiFlower;