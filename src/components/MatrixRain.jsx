import React, { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MatrixRain = () => {
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);

  useEffect(() => {
    const setupCanvas = (canvas, isLeftSide) => {
      const ctx = canvas.getContext('2d');

      // Set canvas size to match container
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resizeCanvas();

      // Matrix characters - binary 0s and 1s
      const chars = '01';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const centerGap = 0; // No gap needed since we're positioning separately
      const trailLength = 15; // Length of the trail

      // Array to store drop data for each column
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          y: Math.floor(Math.random() * -100), // Start position
          speed: 1,
          chars: [] // Store characters in the trail
        };
      }

      // Animation function
      const draw = () => {
        // Clear to solid black - no transparency
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw each column's trail
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          
          // Draw trail characters with fading effect
          for (let j = 0; j < trailLength; j++) {
            const y = drop.y - j;
            if (y >= 0 && y * fontSize < canvas.height) {
              // Calculate opacity based on position in trail (head is brightest)
              const trailOpacity = 1 - (j / trailLength);
              
              // Random character for this position
              const char = chars[Math.floor(Math.random() * chars.length)];
              
              // Varying shades of red based on trail position
              if (j === 0) {
                // Head of trail - brightest
                ctx.fillStyle = `rgba(255, 85, 68, ${trailOpacity})`;
                ctx.shadowColor = '#ff5544';
                ctx.shadowBlur = 8;
              } else if (j < 5) {
                // Near head - bright
                ctx.fillStyle = `rgba(231, 76, 60, ${trailOpacity})`;
                ctx.shadowBlur = 4;
              } else {
                // Tail - darker
                ctx.fillStyle = `rgba(179, 0, 0, ${trailOpacity})`;
                ctx.shadowBlur = 0;
              }

              // Draw the character
              ctx.font = fontSize + 'px monospace';
              ctx.fillText(char, i * fontSize, y * fontSize);
            }
          }

          // Reset shadow
          ctx.shadowBlur = 0;

          // Move drop down
          drop.y += drop.speed;

          // Reset drop to top randomly after it falls off screen
          if (drop.y * fontSize > canvas.height + (trailLength * fontSize) && Math.random() > 0.95) {
            drop.y = 0;
          }
        }
      };

      // Animate at ~10fps for slow, cinematic falling effect
      const interval = setInterval(draw, 100);

      return { interval, resizeCanvas };
    };

    const leftSetup = setupCanvas(leftCanvasRef.current, true);
    const rightSetup = setupCanvas(rightCanvasRef.current, false);

    const handleResize = () => {
      leftSetup.resizeCanvas();
      rightSetup.resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(leftSetup.interval);
      clearInterval(rightSetup.interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={leftCanvasRef} className="matrix-rain matrix-rain-left"></canvas>
      <canvas ref={rightCanvasRef} className="matrix-rain matrix-rain-right"></canvas>
    </>
  );
};

export default MatrixRain;
