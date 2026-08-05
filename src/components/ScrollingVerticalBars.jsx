import React, { useEffect, useRef } from "react";

const ScrollingVerticalBars = ({ isDarkMode = true }) => {
  const canvasRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pattern1 = [];
    let pattern2 = [];

    const createPattern = (offset, width, height) => {
      const pattern = [];
      const numLines = 60;
      for (let i = 0; i < numLines; i += 1) {
        const bars = [];
        const numBars = 10 + Math.sin(i * 0.3 + offset) * 5;
        for (let j = 0; j < numBars; j += 1) {
          bars.push({
            y: (j / numBars) * height + Math.sin(i * 0.5 + j * 0.3 + offset) * Math.min(28, height * 0.08),
            height: 4 + Math.sin(i * 0.2 + j * 0.4) * 2.2,
            width: 2 + Math.cos(i * 0.3) * 1.4,
          });
        }
        pattern.push(bars);
      }
      return pattern;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 550;
      const height = rect.height || 550;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pattern1 = createPattern(0, width, height);
      pattern2 = createPattern(Math.PI, width, height);
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 550;
      const height = rect.height || 550;
      const numLines = 60;
      const lineSpacing = width / numLines;
      const lineColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(10, 44, 43, 0.2)";
      const barColor = isDarkMode ? "rgba(255, 255, 255, 0.24)" : "rgba(10, 44, 43, 0.24)";

      scrollPositionRef.current += 0.0025;
      const scrollFactor = (Math.sin(scrollPositionRef.current) + 1) / 2;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < numLines; i += 1) {
        const x = i * lineSpacing + lineSpacing / 2;

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        const bars1 = pattern1[i] || [];
        const bars2 = pattern2[i] || [];
        const maxBars = Math.max(bars1.length, bars2.length);

        for (let j = 0; j < maxBars; j += 1) {
          const bar1 = bars1[j] || bars2[j];
          const bar2 = bars2[j] || bars1[j];

          const y = bar1.y + (bar2.y - bar1.y) * scrollFactor;
          const drawHeight = bar1.height + (bar2.height - bar1.height) * scrollFactor;
          const drawWidth = bar1.width + (bar2.width - bar1.width) * scrollFactor;

          ctx.fillStyle = barColor;
          ctx.fillRect(x - drawWidth / 2, y - drawHeight / 2, drawWidth, drawHeight);
        }
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="bento-ambient-canvas" aria-hidden="true" />;
};

export default ScrollingVerticalBars;
