import { useEffect, useRef } from "react";
import "../style/PerlinNoiseBackground.css";

export default function PerlinNoiseBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animationId;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();
    window.addEventListener("resize", resize);

    // Perlin noise implementation (simple)
    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(a, b, t) {
      return a + t * (b - a);
    }
    function grad(hash, x, y) {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    const p = new Uint8Array(512);
    for (let i = 0; i < 256; i++) p[256 + i] = p[i] = Math.floor(Math.random() * 256);
    function noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const A = p[X] + Y;
      const B = p[X + 1] + Y;
      return lerp(
        lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
        lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u),
        v
      );
    }

    function draw() {
      frame += 0.01;
      const imgData = ctx.createImageData(width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const value = noise(x / 120, y / 120 + frame) * 0.5 + 0.5;
          const cell = (x + y * width) * 4;
            // Use a darker, more neutral gray for subtlety
            const base = 30; // much lower base value
            const range = 40; // smaller range for less contrast
            const shade = Math.floor(base + value * range); // range: 30-70
            imgData.data[cell] = shade; // R
            imgData.data[cell + 1] = shade; // G
            imgData.data[cell + 2] = shade; // B
            imgData.data[cell + 3] = 40 + value * 40; // Lower alpha for subtlety
        }
      }
      ctx.putImageData(imgData, 0, 0);
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="perlin-bg-canvas" />;
}
