import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useAnimationFrame = (callback, isRunning = true) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      previousTimeRef.current = null;
    };
  }, [animate, isRunning]);
};

const WaterAscii = ({ isDarkMode, speedMultiplier = 1 }) => {
  const [frame, setFrame] = useState(0);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const characters = "~≈≋⋿⊰⊱◟◝";
  const targetSpeedRef = useRef(speedMultiplier);
  const currentSpeedRef = useRef(speedMultiplier);

  const centerPos = { x: 0.5, y: 0.5 };
  const charactersLength = characters.length;
  const charLengthDivide4 = charactersLength / 4;
  const piTimes2 = Math.PI * 2;

  const lastUpdateRef = useRef(0);

  const rows = useMemo(() => {
    if (!size.height) return 10;
    return Math.max(8, Math.floor(size.height / 8));
  }, [size.height]);

  const cols = useMemo(() => {
    if (!size.width) return 48;
    return Math.max(28, Math.floor(size.width / 6));
  }, [size.width]);

  useEffect(() => {
    targetSpeedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const updateAnimation = useCallback((deltaTime) => {
    const targetSpeed = Math.max(0.25, targetSpeedRef.current);
    const currentSpeed = currentSpeedRef.current;
    const lerpFactor = Math.min(1, deltaTime / 150);
    currentSpeedRef.current = currentSpeed + (targetSpeed - currentSpeed) * lerpFactor;

    lastUpdateRef.current += deltaTime;
    const frameThreshold = 166 / Math.max(0.25, currentSpeedRef.current);
    if (lastUpdateRef.current > frameThreshold) {
      setFrame((f) => f + 1);
      lastUpdateRef.current = 0;
    }
  }, []);

  useAnimationFrame(updateAnimation);

  useEffect(() => {
    return () => {
      lastUpdateRef.current = 0;
    };
  }, []);

  const generateAscii = useCallback(() => {
    const rowsArray = [];
    const frameDiv4 = frame / 6.7;
    const frameDiv5 = frame / 8.3;
    const frameDiv8 = frame / 13.3;

    for (let y = 0; y < rows; y += 1) {
      const yDivRows = y / rows;
      const yDiv5 = y / 5;
      const yDiv3 = y / 3;
      let rowString = "";
      let rowOpacity = 1;

      for (let x = 0; x < cols; x += 1) {
        const xDivCols = x / cols;
        const xDiv3 = x / 3;
        const xDiv4 = x / 4;

        const dx = xDivCols - centerPos.x;
        const dy = yDivRows - centerPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distTimes10 = dist * 10;
        const distTimes5 = dist * 5;

        const wave = Math.sin(xDiv3 + yDiv5 + frameDiv4 + distTimes10)
          + Math.cos(xDiv4 - yDiv3 - frameDiv5)
          + Math.sin(frameDiv8 + xDivCols * piTimes2);

        const charValue = (wave + 2) * charLengthDivide4 + distTimes5;
        const charIndex = Math.floor(Math.abs(charValue)) % charactersLength;

        const opacity = Math.max(0.2, Math.min(0.8, 1 - dist + Math.sin(wave) / 3));

        if (x === 0) rowOpacity = opacity;
        else rowOpacity = (rowOpacity + opacity) / 2;

        rowString += characters[charIndex];
      }

      rowsArray.push({ text: rowString, opacity: rowOpacity });
    }

    return rowsArray;
  }, [frame, rows, cols, characters, charactersLength, charLengthDivide4, piTimes2]);

  const ascii = useMemo(() => generateAscii(), [generateAscii]);

  return (
    <div ref={containerRef} className={`water-ascii ${isDarkMode ? "dark" : "light"}`} aria-hidden="true">
      <pre className="water-ascii-pre">
        {ascii.map((row, i) => (
          <div
            key={i}
            className="water-ascii-row"
            style={{ opacity: row.opacity }}
          >
            {row.text}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default WaterAscii;
